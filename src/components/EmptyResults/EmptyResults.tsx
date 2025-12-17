import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { type ReactNode } from "react";

interface EmptyResultsProps {
  message?: string;
  icon?: ReactNode;
  subtitle?: string;
}

const EmptyResults = ({ message = "projects.noResults", icon, subtitle }: EmptyResultsProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      {icon && (
        <Box sx={{ mb: 2 }}>
          {icon}
        </Box>
      )}
      <Typography variant="h6" color="text.secondary">
        {t(message)}
      </Typography>
      {subtitle && (
        <Typography variant="body2" sx={{ color: "var(--secondary)", mt: 1 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default EmptyResults;

