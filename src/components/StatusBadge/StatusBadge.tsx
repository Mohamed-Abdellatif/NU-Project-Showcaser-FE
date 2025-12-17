import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

export type StatusType = "approved" | "accepted" | "pending" | "pending-ta" | "rejected" | "admin" | "student" | "supervisor" | "active" | "inactive";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const { t } = useTranslation();

  const getStatusConfig = (status: StatusType) => {
    const configs: Record<StatusType, { label: string; backgroundColor: string; color: string }> = {
      approved: {
        label: label || t("admin.status.approved"),
        backgroundColor: "#E8F5E9",
        color: "#2E7D32",
      },
      accepted: {
        label: label || t("admin.status.accepted"),
        backgroundColor: "#E8F5E9",
        color: "#2E7D32",
      },
      pending: {
        label: label || t("admin.status.pending"),
        backgroundColor: "#FFF9C4",
        color: "#F57F17",
      },
      "pending-ta": {
        label: label || t("admin.status.pending-ta"),
        backgroundColor: "#FFF9C4",
        color: "#F57F17",
      },
      rejected: {
        label: label || t("admin.status.rejected"),
        backgroundColor: "#FFEBEE",
        color: "#C62828",
      },
      admin: {
        label: label || t("admin.status.admin"),
        backgroundColor: "var(--background-light)",
        color: "var(--primary)",
      },
      student: {
        label: label || t("admin.status.student"),
        backgroundColor: "#F5F5F5",
        color: "#616161",
      },
      supervisor: {
        label: label || t("admin.status.supervisor"),
        backgroundColor: "#E3F2FD",
        color: "#1565C0",
      },
      active: {
        label: label || t("admin.status.active"),
        backgroundColor: "#E8F5E9",
        color: "#2E7D32",
      },
      inactive: {
        label: label || t("admin.status.inactive"),
        backgroundColor: "#F5F5F5",
        color: "#9E9E9E",
      },
    };

    return configs[status] || configs.pending; // Default to pending if status is not found
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        backgroundColor: config.backgroundColor,
        color: config.color,
        fontWeight: 600,
        fontSize: "0.75rem",
        height: 28,
        borderRadius: "8px",
        "& .MuiChip-label": {
          px: 2,
        },
      }}
    />
  );
};

export default StatusBadge;
