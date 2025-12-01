import { useNavigate } from "react-router-dom";
import type { Project } from "../../types";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";

const RecommendedProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  return (
    <Card
      key={project._id}
      onClick={() => navigate(`/projects/${project._id}`)}
      sx={{
        cursor: "pointer",
        width: "96%",
        height: "97%",
        flex: "1 1 30%",
        minWidth: "280px",
        borderRadius: "16px",
        background: `linear-gradient(135deg, var(--background-lighter) 0%, var(--background-light) 100%)`,
         color: "var(--text-primary)",
        boxShadow: 2,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": { boxShadow: 5 },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={
          project.images[0] ||
          `https://placehold.co/600x400/8E44AD/FFF?text=${project.title}`
        }
        alt={project.title}
      />

      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {project.title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
          {project.course}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {project.description?.slice(0, 80) || ""}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecommendedProjectCard;
