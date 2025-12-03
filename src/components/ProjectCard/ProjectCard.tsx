import React from "react";
import { Box, CardContent, CardMedia, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star } from "@mui/icons-material";
import { Settings as SettingsIcon } from "@mui/icons-material";
import GlassCard from "../GlassCard/GlassCard";
import type { Project } from "../../types";
interface ProjectCardProps {
  project: Project;
  viewMode: "grid" | "list";
}

const ProjectCard = ({ project, viewMode }: ProjectCardProps) => {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageError = () => {
    if (imageIndex === 0 && project.images?.[1]) {
      setImageIndex(1);
    }
  };

  const getImageSrc = () => {
    if (project.images?.[imageIndex]) {
      return project.images[imageIndex];
    }
    return `https://placehold.co/600x400/5986D9/FFF?text=${project.title}`;
  };

  const renderStars = (count: number) => {
    const stars = [];
    const fullStars = Math.floor(count);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          sx={{
            fontSize: "16px",
            color: i < fullStars ? "var(--golden-yellow)" : "#E0E0E0",
          }}
        />
      );
    }
    return stars;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on "View Project" link
    if ((e.target as HTMLElement).closest(".view-project-link")) {
      return;
    }
    navigate(`/projects/${project._id}`);
  };

  return (
    <GlassCard
      elevation="medium"
      onClick={handleCardClick}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: viewMode === "list" ? "row" : "column",
        transition: "all 0.25s ease",
        cursor: "pointer",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.8) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "28px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.12)",
        },
        ...(viewMode === "list" && {
          flexDirection: "row",
          alignItems: "stretch",
        }),
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: viewMode === "list" ? 300 : "100%",
          aspectRatio: viewMode === "list" ? "auto" : "16/9",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={getImageSrc()}
          alt={project.title}
          onError={handleImageError}
          sx={{
            width: "100%",
            height: viewMode === "list" ? "100%" : "100%",
            objectFit: "cover",
            borderTopLeftRadius: viewMode === "list" ? "28px" : "28px",
            borderTopRightRadius: viewMode === "list" ? 0 : "28px",
            borderBottomLeftRadius: viewMode === "list" ? "28px" : 0,
            background:
              "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
          }}
        />
        {/* Three-dot menu icon on top-right */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-primary)",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              background: "rgba(255, 255, 255, 1)",
              transform: "scale(1.05)",
            },
          }}
        >
          <SettingsIcon sx={{ fontSize: "20px" }} />
        </Box>
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          p: 3,
          ...(viewMode === "list" && {
            justifyContent: "center",
            paddingLeft: 4,
          }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              fontWeight: 700,
              color: "var(--text-primary)",
              fontSize: "1.1rem",
              flex: 1,
              textTransform: "capitalize",
            }}
          >
            {project.title}
          </Typography>
        </Box>

        {/* Course Code and Tags */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "center",
          }}
        >
          {project.course && (
            <Chip
              label={`Course: ${project.course}`}
              size="small"
              sx={{
                width: "fit-content",
                height: "28px",
                bgcolor: "transparent",
                color: "#7A86A0",
                fontSize: "0.75rem",
                fontWeight: 500,
                fontFamily: "Inter, Poppins, system-ui, sans-serif",
                border: "1px solid rgba(89, 134, 217, 0.2)",
                "& .MuiChip-label": {
                  px: 1.5,
                },
              }}
            />
          )}
          {project.createdAt && (
            <Chip
              label={`Year: ${new Date(project.createdAt).getFullYear()}`}
              size="small"
              sx={{
                width: "fit-content",
                height: "28px",
                bgcolor: "transparent",
                color: "#7A86A0",
                fontSize: "0.75rem",
                fontWeight: 500,
                fontFamily: "Inter, Poppins, system-ui, sans-serif",
                border: "1px solid rgba(89, 134, 217, 0.2)",
                "& .MuiChip-label": {
                  px: 1.5,
                },
              }}
            />
          )}
          {project.tags &&
            project.tags.length > 0 &&
            project.tags.slice(0, 2).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  width: "fit-content",
                  height: "28px",
                  bgcolor: "var(--tag-background)",
                  color: "var(--text-primary)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  fontFamily: "Inter, Poppins, system-ui, sans-serif",
                  borderRadius: "16px",
                  "& .MuiChip-label": {
                    px: 1.5,
                  },
                }}
              />
            ))}
        </Box>

        {/* Star Ratings */}
        {project.stars !== undefined && project.stars > 0 && (
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}
          >
            {renderStars(project.stars)}
          </Box>
        )}
      </CardContent>
    </GlassCard>
  );
};

export default ProjectCard;
