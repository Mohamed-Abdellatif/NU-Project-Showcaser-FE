import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ width: "98%", p: 2 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
        {t("about.title")}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
        {t("about.subtitle")}
      </Typography>
    </Box>
  );
};

export default AboutUs;
