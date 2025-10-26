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
import { generatePlaceholderProjects } from "../../utils/helperfunctions";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useTranslation } from "react-i18next";

interface ProjectsListProps {
  projects?: Project[];
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const displayProjects = projects || generatePlaceholderProjects();

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
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          {t("home.projects")}
        </Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          {theme.direction === 'rtl' ? (
            <div>
              <ToggleButton value="list" aria-label="list view">
                <ViewListIcon sx={{ transform: 'scaleX(-1)' }} />
              </ToggleButton>
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewIcon />
              </ToggleButton>
            </div>
          ) : (
            <div>
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ViewListIcon />
              </ToggleButton>
            </div>
          )}
        </ToggleButtonGroup>
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
        {displayProjects.map((project) => (
          <Box key={project.id}>
            <ProjectCard project={project} viewMode={effectiveViewMode} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectsList;
