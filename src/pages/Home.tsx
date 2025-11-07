import { useTranslation } from "react-i18next"; 
import ProjectsList from "../components/ProjectsList/ProjectsList";
import { Box, Button, Typography, CircularProgress, Alert } from "@mui/material";
import { useProjects } from "../hooks/useProjects";

const HomePage = () => {
  const { data: projects, isLoading, isError, error } = useProjects();
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
          onClick={() => navigate('/submit')}
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
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {isError && (
          <Box sx={{ p: 2 }}>
            <Alert severity="error">
              {error?.message || t("home.errorLoadingProjects")}
            </Alert>
          </Box>
        )}
        {!isLoading && !isError && (
          <ProjectsList projects={projects} />
        )}
      </section>
    </Box>
  );
};

export default HomePage;
