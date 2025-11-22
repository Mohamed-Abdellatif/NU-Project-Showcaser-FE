import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const EmptyResults = ({ message= "projects.noResults" }: { message?: string }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h6" color="text.secondary">
        {t(message)}
      </Typography>
    </Box>
  );
};

export default EmptyResults;

