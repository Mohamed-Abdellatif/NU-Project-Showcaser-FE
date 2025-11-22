import { useTranslation } from "react-i18next";
import ProjectsList from "../components/ProjectsList/ProjectsList";
import { Box, Button, Typography, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFeaturedProjects} from "../hooks/useProjects";

const HomePage = () => {
  const { data: projects, isLoading, isError, error } = useFeaturedProjects();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box
      className="home-page"
      sx={{
        backgroundColor: "#FFFFF0",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          p: 2,
          mt: 4,
          mb: 4,
          minWidth: 200,
          minHeight: 100,
        }}

      >
        <Box sx={{ width: "100%", p: 2 }}>
          <Typography variant="h4" component="h1" sx={{
            fontSize: '2.5rem',
            lineHeight: 1.3,
            fontWeight: "bold",
            fontFamily: 'System-ui, BlinkMacSystemFont,Times New Roman'
          }}>
            {t("home.title")}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
            {t("home.subtitle")}
          </Typography>
          <Button
            onClick={() => navigate("/submit")}
            variant="contained"
            sx={{
              bgcolor: "#A55ABF",
              "&:hover": { bgcolor: "#8E44AD" },
              mb: 3,
            }}
          >
            {t("home.submitProject")}
          </Button>
        </Box>
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
    </Box >
  );
};

export default HomePage;
