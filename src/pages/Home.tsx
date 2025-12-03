import { useTranslation } from "react-i18next";
import ProjectsList from "../components/ProjectsList/ProjectsList";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFeaturedProjects } from "../hooks/useProjects";
import LoadingState from "../components/LoadingState/LoadingState";
import ErrorState from "../components/ErrorState/ErrorState";
import "@fontsource/inter/500.css";
import "@fontsource/poppins/500.css";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
const HomePage = () => {
  const textStyle = {
    fontFamily: "Inter",
    fontWeight: 550,
    fontSize: ".9rem",
    textTransform: "none",
    letterSpacing: ".3px",
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
        backgroundColor: "var(--Off-White)",
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
        <Box
          sx={{
            width: "100%",
            p: { xs: 3, md: 6 },
            mt: 2,
            mb: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg, var(--primary) 0%, var(--background-light) 100%)",
            color: "white",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Box sx={{ maxWidth: { md: "60%" }, textAlign: { xs: "center", md: "left" }, zIndex: 1 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                lineHeight: 1.2,
                fontWeight: "800",
                fontFamily: 'System-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                mb: 2,
                textShadow: "0px 2px 4px rgba(0,0,0,0.3)"
              }}
            >
              {t("home.title") || "Have a Winning Project?"}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                textStyle,
                fontSize: "1.1rem"
              }}
            >
              {t("home.subtitle") || "Submit your project and we'll check it out!"}
            </Typography>

            <Button
              onClick={() => navigate("/submit")}
              variant="contained"
              sx={{
                bgcolor: "#ffde00ff",
                color: "#000",
                ...textStyle,
                px: 3,
                py: 1.2,
                fontSize: ".95rem",
                borderRadius: 2,
                boxShadow: "0 4px 14px 0 rgba(0,0,0,0.3)",
                "&:hover": {
                  bgcolor: "#FFC107",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px 0 rgba(0,0,0,0.4)"
                },
                transition: "all 0.3s ease"
              }}
            >
              {t("home.submitProject")}
            </Button>
          </Box>

          {/* Right Side: Visual Icon (Trophy) */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              opacity: 0.8,
              transform: "rotate(15deg)",
              mr: 4
            }}
          >
            {/* You can replace this Icon with an <img /> tag if you have a 3D illustration file */}
            <EmojiEventsIcon sx={{ fontSize: "180px", color: "rgba(255, 222, 0, 1)" }} />
          </Box>
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
