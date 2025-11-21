import { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import type { Project } from "../../types";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useTranslation } from "react-i18next";
import RecommendedProjectCard from "../RecommendedProjectCard/RecommendedProjectCard";

interface ProjectsListProps {
  projects?: Project[];
  title?: string;
  isViewModeChangeable?: boolean;
}

const ProjectsList = ({
  projects,
  title = "home.featuredProjects",
  isViewModeChangeable = true,
}: ProjectsListProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const displayProjects = projects || [];

  const { t } = useTranslation();
  // Use MUI's useMediaQuery for mobile detection
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const effectiveViewMode = isMobile ? "grid" : viewMode;

  const handleViewChange = (
    _: React.MouseEvent<HTMLElement>,
    newView: "grid" | "list" | null
  ) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  return (
    <Box sx={{ width: "98%", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        {title && (
          <Typography variant="h3" component="h1" sx={{
            width: "100%",
            mb: 2.5,
            color: title === "viewProject.recommendedProjects" ? "#6A2C68" : "#333",
            fontWeight: "bold",
            fontFamily: 'System-ui, BlinkMacSystemFont,Times New Roman',

          }}>
            {t(title)}
          </Typography>
        )}
        {isViewModeChangeable && (
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            {theme.direction === "rtl" ? (
              <Box sx={{ display: "flex" }}>
                <ToggleButton value="list" aria-label="list view">
                  <ViewListIcon sx={{ transform: "scaleX(-1)" }} />
                </ToggleButton>
                <ToggleButton value="grid" aria-label="grid view">
                  <GridViewIcon />
                </ToggleButton>
              </Box>
            ) : (
              <Box sx={{ display: "flex" }}>
                <ToggleButton value="grid" aria-label="grid view">
                  <GridViewIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="list view">
                  <ViewListIcon />
                </ToggleButton>
              </Box>
            )}

          </ToggleButtonGroup>
        )}
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          ...(effectiveViewMode === "grid"
            ? {
              gridTemplateColumns: {
                xs: "1fr", // 1 column on mobile
                sm: "repeat(2, 1fr)", // 2 columns on tablet
                md: "repeat(3, 1fr)", // 3 columns on desktop
              },
            }
            : {
              gridTemplateColumns: "1fr", // Always 1 column in list view
            }),
        }}
      >
        {displayProjects &&
          displayProjects.map((project: Project) => (
            <Box key={project._id}>
              {title === "viewProject.recommendedProjects" ? (
                <RecommendedProjectCard project={project} />
              ) : (
                <ProjectCard project={project} viewMode={effectiveViewMode} />
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default ProjectsList;
