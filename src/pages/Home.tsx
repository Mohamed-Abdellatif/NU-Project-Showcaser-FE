import { useTranslation } from "react-i18next";
import ProjectsList from "../components/ProjectsList/ProjectsList";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFeaturedProjects } from "../hooks/useProjects";
import LoadingState from "../components/LoadingState/LoadingState";
import ErrorState from "../components/ErrorState/ErrorState";
import HeroCard from "../components/HeroCard/HeroCard";
import FiltersRow from "../components/FiltersRow/FiltersRow";
import { useState } from "react";
import "@fontsource/inter/500.css";
import "@fontsource/poppins/500.css";

const HomePage = () => {
  const { data: projects, isLoading, isError, error } = useFeaturedProjects();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchValue, setSearchValue] = useState("");

  const handleCtaClick = () => {
    navigate("/submit");
  };

  const handleFiltersClick = () => {
    // Handle filters click - can navigate to projects page with filters or open modal
    navigate("/projects");
  };

  return (
    <Box
      className="home-page"
      sx={{
        background: "linear-gradient(135deg, var(--background-lighter) 0%, var(--Off-White) 100%)",
        minHeight: "100vh",
      }}
    >
      <HeroCard
        title={t("home.title") || "Have a Winning Project?"}
        subtitle={t("home.subtitle") || "Showcase your work to the community!"}
        ctaText={t("home.submitProject")}
        onCtaClick={handleCtaClick}
      />

      <FiltersRow
        onSearchChange={setSearchValue}
        onFiltersClick={handleFiltersClick}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchValue={searchValue}
      />

      <Box sx={{ padding: "10px", margin: "20px" }}>
        {isLoading && <LoadingState />}
        {isError && <ErrorState error={error} />}
        {!isLoading && !isError && (
          <ProjectsList
            projects={projects}
            isViewModeChangeable={false}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
