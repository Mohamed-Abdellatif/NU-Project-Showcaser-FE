import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Project, User } from "../../types";
import { useTranslation } from "react-i18next";
import ProjectCard from "../ProjectCard/ProjectCard";
interface ProjectShowcaseProps {
  projects: Project[];
  user: User | null;
  isMyProfile: boolean;
}

const ProjectShowcase = ({ projects, user, isMyProfile }: ProjectShowcaseProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: { xs: "wrap", sm: "nowrap" },
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.75rem", md: "2rem" },
            fontFamily: "Inter, Poppins, system-ui, sans-serif",
            color: "var(--text-primary)",
          }}
        >
          
        </Typography>
          {user && isMyProfile && (
            <Button
            variant="contained"
            onClick={() => navigate("/submit")}
            sx={{
              backgroundColor: "var(--primary)",
              color: "#ffffff",
              borderRadius: "20px",
              px: 3,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              boxShadow: "0px 4px 16px rgba(25, 118, 210, 0.3)",
              "&:hover": {
                backgroundColor: "var(--accent)",
                boxShadow: "0px 6px 20px rgba(25, 118, 210, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.25s ease",
            }}
          >
            {t("profile.submitNewProject")}
          </Button>)}
      </Box>

      {projects.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(89, 134, 217, 0.1)",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--accent)",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "var(--primary)",
              },
            },
          }}
        >
          {projects.map((project) => (
            <Box
              key={project._id}
              sx={{
                minWidth: { xs: "280px", sm: "320px" },
                maxWidth: { xs: "280px", sm: "320px" },
                flexShrink: 0,
              }}
            >
              <ProjectCard project={project} viewMode="grid" />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "28px",
            border: "1px solid rgba(89, 134, 217, 0.2)",
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: "#7A86A0",
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
            }}
          >
            {t("profile.noProjectsSubmitted")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProjectShowcase;



