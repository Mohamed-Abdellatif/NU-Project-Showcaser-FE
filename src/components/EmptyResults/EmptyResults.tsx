import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const EmptyResults = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h6" color="text.secondary">
        {t("projects.noResults")}
      </Typography>
    </Box>
  );
};

export default EmptyResults;

