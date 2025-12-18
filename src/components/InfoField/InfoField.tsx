import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import GlassCard from "../GlassCard/GlassCard";
import { useToastContext } from "../../contexts/ToastContext";
import { useTranslation } from "react-i18next";

export interface InfoFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isLink?: boolean;
  linkLabel?: string; // Display text for the link
}

const InfoField = ({
  label,
  value,
  icon,
  onClick,
  isLink = false,
  linkLabel
}: InfoFieldProps) => {
  const { showSuccess } = useToastContext();
  const { t } = useTranslation();

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    showSuccess(t("common.linkCopied") || "Link copied to clipboard!");
  };

  const handleLinkClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const displayValue = isLink && value !== "N/A"
    ? (linkLabel || value)
    : value;

  return (
    <GlassCard
      elevation="light"
      sx={{
        p: 2.5,
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(89, 134, 217, 0.2)",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06)",
        transition: "all 0.25s ease",
        "&:hover": isLink && value !== "N/A"
          ? {
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-2px)",
            border: "1px solid rgba(89, 134, 217, 0.4)",
          }
          : {},
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#7A86A0",
              fontSize: "0.75rem",
              fontWeight: 500,
              mb: 0.5,
              display: "block",
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="body2"
            onClick={handleLinkClick}
            sx={{
              fontWeight: 600,
              color: "var(--text-primary)",
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              textDecoration: isLink && value !== "N/A" ? "underline" : "none",
              textDecorationColor: "var(--accent)",
              cursor: isLink && value !== "N/A" ? "pointer" : "default",
              "&:hover": isLink && value !== "N/A" ? {
                color: "var(--accent)",
              } : {},
              transition: "color 0.2s ease",
            }}
          >
            {displayValue}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          {isLink && value !== "N/A" && icon && (
            <Tooltip title={t("common.copyLink") || "Copy link"}>
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  color: "var(--accent)",
                  "&:hover": {
                    backgroundColor: "var(--background-light)",
                  },
                }}
              >
                {icon}
              </IconButton>
            </Tooltip>
          )}
          {!isLink && icon && (
            <IconButton
              size="small"
              sx={{
                color: "var(--accent)",
                "&:hover": {
                  backgroundColor: "var(--background-light)",
                },
              }}
            >
              {icon}
            </IconButton>
          )}
        </Box>
      </Box>
    </GlassCard>
  );
};

export default InfoField;
