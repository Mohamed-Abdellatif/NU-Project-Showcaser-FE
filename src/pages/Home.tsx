import { useTranslation } from "react-i18next"; 
import ProjectsList from "../components/ProjectsList/ProjectsList";
import { Box, Button, Typography } from "@mui/material";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Box
      className="home-page"
      sx={{
        backgroundColor: "#FFFFF0", 
        minHeight: "100vh",
      }}
    >
      <Box sx={{ width: "98%", p: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          {t("home.title")}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
          {t("home.subtitle")}
        </Typography>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: "#AE86C9", 
            "&:hover": { bgcolor: "#AE86C7" },
            mb: 3
          }}
        >
          {t("home.submitProject")}
        </Button>
      </Box>
      <section>
        <ProjectsList />
      </section>
    </Box>
  );
};

export default HomePage;
