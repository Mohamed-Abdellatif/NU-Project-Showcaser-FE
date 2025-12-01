import { useTranslation } from "react-i18next";
import ProjectsList from "../components/ProjectsList/ProjectsList";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFeaturedProjects } from "../hooks/useProjects";
import LoadingState from "../components/LoadingState/LoadingState";
import ErrorState from "../components/ErrorState/ErrorState";
import "@fontsource/inter/500.css";
import "@fontsource/poppins/500.css";

const HomePage = () => {
  const textStyle = {
    fontFamily: "Inter,poppins,sans-serif",
    fontWeight: 500,
    fontSize: "1rem",
    textTransform: "none",
    minWidth: "auto",
    opacity: 0.95,
  };

  const { data: projects, isLoading, isError, error } = useFeaturedProjects();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box
      className="home-page"
      sx={{
        backgroundColor: "#F8F9FA",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          p: 2,
          mt: 3,
          mb: 4,
          
          ml: 3,
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
              ...textStyle,
              bgcolor: "var(--accent)",
              "&:hover": { bgcolor: "var(--accent)" },
              mb: 1,
            }}
          >
            {t("home.submitProject")}
          </Button>
        </Box>
      </Box>


      <section style={{ padding: '10px', margin: '20px' }}>
        {isLoading && <LoadingState />}
        {isError && <ErrorState error={error} />}
        {!isLoading && !isError && (
          <ProjectsList projects={projects} />
        )}
      </section>

    </Box >
  );
};

export default HomePage;
