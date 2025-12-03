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

interface ProjectsListProps {
  projects?: Project[];
  title?: string;
  isViewModeChangeable?: boolean;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
}

const ProjectsList = ({
  projects,
  title = "home.featuredProjects",
  isViewModeChangeable = true,
  viewMode: externalViewMode,
  onViewModeChange: externalOnViewModeChange,
}: ProjectsListProps) => {
  const [internalViewMode, setInternalViewMode] = useState<"grid" | "list">(
    "grid"
  );

  const displayProjects = projects || [];
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const viewMode = externalViewMode ?? internalViewMode;
  const effectiveViewMode = isMobile ? "grid" : viewMode;

  const handleViewChange = (
    _: React.MouseEvent<HTMLElement>,
    newView: "grid" | "list" | null
  ) => {
    if (newView !== null) {
      if (externalOnViewModeChange) {
        externalOnViewModeChange(newView);
      } else {
        setInternalViewMode(newView);
      }
    }
  };

  return (
    <Box sx={{ width: "98%", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        {title && (
          <Typography
            variant="h3"
            component="h1"
            sx={{
              width: "100%",
              mb: 2.5,
              color: "var(--text-primary)",
              fontWeight: 800,
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            {t(title)}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            ml: "auto",
          }}
        >
          {isViewModeChangeable && (
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewChange}
              aria-label="view mode"
              sx={{
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06)",
                "& .MuiToggleButton-root": {
                  border: "none",
                  borderRadius: "20px",
                  color: "var(--text-primary)",
                  "&.Mui-selected": {
                    background: "var(--primary)",
                    color: "#fff",
                    "&:hover": {
                      background: "var(--accent)",
                    },
                  },
                  "&:hover": {
                    background: "rgba(25, 118, 210, 0.1)",
                  },
                },
              }}
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        </Box>
      </Box>

      {/* Project Grid/List */}
      <Box
        sx={{
          display: "grid",
          gap: { xs: 2.5, md: 3.5 },
          ...(effectiveViewMode === "grid"
            ? {
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
              }
            : {
                gridTemplateColumns: "1fr",
              }),
        }}
      >
        {displayProjects.map((project: Project) => (
          <Box key={project._id}>
            <ProjectCard project={project} viewMode={effectiveViewMode} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectsList;
