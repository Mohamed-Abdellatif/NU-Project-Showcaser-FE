import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Project } from "../../types";
import { useTranslation } from "react-i18next";
interface ProfileProjectCardProps {
  project: Project;
}

const ProfileProjectCard = ({ project }: ProfileProjectCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const getImageSrc = () => {
    if (project.images?.[0]) {
      return project.images[0];
    }
    return `https://placehold.co/400x250/6C3BFF/FFF?text=${encodeURIComponent(project.title)}`;
  };

  return (
    <Card
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0px 2px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 8px 24px rgba(108, 59, 255, 0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={getImageSrc()}
        alt={project.title}
        sx={{
          height: 200,
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: "#1a1a1a",
            fontSize: "1.1rem",
          }}
        >
          {project.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          {project.technologies?.slice(0, 3).map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                backgroundColor: "rgba(108, 59, 255, 0.1)",
                color: "#6C3BFF",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
          ))}
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate(`/projects/${project._id}`)}
          sx={{
            mt: "auto",
            backgroundColor: "#6C3BFF",
            color: "#ffffff",
            borderRadius: "12px",
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0px 4px 12px rgba(108, 59, 255, 0.3)",
            "&:hover": {
              backgroundColor: "#5A2FE6",
              boxShadow: "0px 6px 16px rgba(108, 59, 255, 0.4)",
            },
          }}
        >
          {t("profile.viewProjectDetails")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileProjectCard;



