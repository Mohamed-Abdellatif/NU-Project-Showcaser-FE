import ProjectsList from "../components/ProjectsList/ProjectsList";
import { Box } from "@mui/material";
import { useFeaturedProjects } from "../hooks/useProjects";
import LoadingState from "../components/LoadingState/LoadingState";
import ErrorState from "../components/ErrorState/ErrorState";
import HeroCard from "../components/HeroCard/HeroCard";
import { useState } from "react";
import "@fontsource/inter/500.css";
import "@fontsource/poppins/500.css";

const HomePage = () => {
  const { data: projects, isLoading, isError, error } = useFeaturedProjects();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <Box
      className="home-page"
      sx={{
        background:
          "linear-gradient(135deg, var(--background-lighter) 0%, var(--Off-White) 100%)",
        minHeight: "100vh",
      }}
    >
      <HeroCard />

      <Box sx={{ padding: { xs: "8px", md: "10px" }, margin: { xs: "8px", md: "20px" } }}>
        {isLoading && <LoadingState />}
        {isError && <ErrorState error={error} />}

        {!isLoading && !isError && (
          <ProjectsList
            projects={projects}
            isViewModeChangeable={true}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
