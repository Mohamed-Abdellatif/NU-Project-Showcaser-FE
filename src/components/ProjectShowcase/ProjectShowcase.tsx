import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Project, User } from "../../types";
import ProfileProjectCard from "../ProfileProjectCard/ProfileProjectCard";
import { useTranslation } from "react-i18next";
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
            color: "#1a1a1a",
          }}
        >
          
        </Typography>
          {user && isMyProfile && (
            <Button
            variant="contained"
            onClick={() => navigate("/submit")}
            sx={{
              backgroundColor: "var(--accent)",
              color: "#ffffff",
              borderRadius: "16px",
              px: 3,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0px 4px 16px rgba(77, 106, 255, 0.3)",
              "&:hover": {
                backgroundColor: "var(--primary)",
                boxShadow: "0px 6px 20px rgba(77, 106, 255, 0.4)",
              },
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
              backgroundColor: "rgba(0,0,0,0.05)",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--accent)",
              borderRadius: 4,
            },
          }}
        >
          {projects.map((project) => (
            <Box
              key={project._id}
              sx={{
                minWidth: { xs: "280px", sm: "320px" },
                maxWidth: { xs: "280px", sm: "320px" },
              }}
            >
              <ProfileProjectCard project={project} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            backgroundColor: "#f8f9fa",
            borderRadius: "20px",
          }}
        >
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {t("profile.noProjectsSubmitted")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProjectShowcase;



