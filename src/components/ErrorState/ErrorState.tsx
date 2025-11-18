import { Box, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ErrorStateProps {
  error?: Error | null;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 2, mb: 3 }}>
      <Alert severity="error">
        {error?.message || t("projects.error")}
      </Alert>
    </Box>
  );
};

export default ErrorState;

