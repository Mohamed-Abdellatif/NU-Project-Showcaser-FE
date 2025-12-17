import { Box, Typography, Chip, LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import GlassCard from "../GlassCard/GlassCard";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  badge?: {
    label: string;
    color?: "success" | "warning" | "error" | "info";
  };
  subtitle?: string;
  progress?: number; // 0-100 for progress bar
}

const StatCard = ({ title, value, icon, badge, subtitle, progress }: StatCardProps) => {
  const { t } = useTranslation();

  return (
    <GlassCard
      elevation="light"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: 160,
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      {/* Icon and Title */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: "var(--text-Secondary)",
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "12px",
            background: "var(--background-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--primary)",
          }}
        >
          {icon}
        </Box>
      </Box>

      {/* Value */}
      <Typography
        variant="h3"
        sx={{
          color: "var(--text-primary)",
          fontWeight: 700,
          fontSize: "2.5rem",
        }}
      >
        {value}
      </Typography>

      {/* Badge or Subtitle */}
      {badge && (
        <Chip
          label={badge.label}
          size="small"
          color={badge.color || "default"}
          sx={{
            alignSelf: "flex-start",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      )}

      {subtitle && (
        <Typography
          variant="body2"
          sx={{
            color: "var(--text-Secondary)",
            fontSize: "0.875rem",
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Progress Bar */}
      {progress !== undefined && (
        <Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "var(--background-light)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "var(--primary)",
                borderRadius: 4,
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: "var(--text-Secondary)",
              fontSize: "0.75rem",
              mt: 0.5,
              display: "block",
            }}
          >
            {progress}% {t("admin.stats.used")}
          </Typography>
        </Box>
      )}
    </GlassCard>
  );
};

export default StatCard;
