import { useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useProjects } from "../hooks/useProjects";
import type { ProjectSearchParams, PaginatedProjectsResponse } from "../types";
import ProjectsList from "../components/ProjectsList/ProjectsList";
import ProjectFilters from "../components/ProjectFilters/ProjectFilters";
import ResultsHeader from "../components/ResultsHeader/ResultsHeader";
import ProjectsPagination from "../components/ProjectsPagination/ProjectsPagination";
import EmptyResults from "../components/EmptyResults/EmptyResults";
import LoadingState from "../components/LoadingState/LoadingState";
import ErrorState from "../components/ErrorState/ErrorState";

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48, 64, 100];

const Projects = () => {
  const { t } = useTranslation();

  // Filter states
  const [filters, setFilters] = useState<ProjectSearchParams>({
    title: "",
    teamLeader: { name: "", email: "" },
    supervisor: "",
    major: "",
    course: "",
    teamMembers: [{ name: "", email: "" }],
  });

  // Pagination states
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Build filter params (only include non-empty filters, excluding page and limit)
  const filterParams = useMemo<
    Omit<ProjectSearchParams, "page" | "limit"> | undefined
  >(() => {
    const params: Omit<ProjectSearchParams, "page" | "limit"> = {};
    let hasFilters = false;

    if (filters.title?.trim()) {
      params.title = filters.title.trim();
      hasFilters = true;
    }
    if (filters.teamLeader?.name?.trim()) {
      params.teamLeader = { name: filters.teamLeader.name.trim(), email: filters.teamLeader.email };
      hasFilters = true;
    }
    if (filters.supervisor?.trim()) {
      params.supervisor = filters.supervisor.trim();
      hasFilters = true;
    }
    if (filters.major?.trim()) {
      params.major = filters.major.trim();
      hasFilters = true;
    }
    if (filters.course?.trim()) {
      params.course = filters.course.trim();
      hasFilters = true;
    }
    if (filters.teamMembers && filters.teamMembers.length > 0) {
      params.teamMembers = filters.teamMembers;
      hasFilters = true;
    }

    return hasFilters ? params : undefined;
  }, [filters]);

  // Fetch projects with pagination and filters
  const {
    data: projectsData,
    isLoading,
    isError,
    error,
  } = useProjects(page, itemsPerPage, filterParams);

  // Extract projects and pagination info from response
  const projects =
    (projectsData as PaginatedProjectsResponse | undefined)?.projects ?? [];
  const pagination = (projectsData as PaginatedProjectsResponse | undefined)
    ?.pagination;

  // Reset to page 1 when filters change
  const handleFilterChange = (
    field: keyof ProjectSearchParams,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      title: "",
      teamLeader: { name: "", email: "" },
      supervisor: "",
      major: "",
      course: "",
      teamMembers: [{ name: "", email: "" }],
    });
    setPage(1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFF0",
        minHeight: "100vh",
        py: 4,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        {/* Page Title */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 3,
            fontWeight: "bold",
            fontFamily: "System-ui, BlinkMacSystemFont, Times New Roman",
            color: "#333",
          }}
        >
          {t("projects.title")}
        </Typography>

        {/* Filters Section */}
        <ProjectFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Results Section */}
        {isLoading && <LoadingState />}

        {isError && <ErrorState error={error} />}

        {!isLoading && !isError && (
          <>
            {/* Results Count and Items Per Page */}
            <ResultsHeader
              pagination={pagination}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
            />

            {/* Projects List */}
            {projects.length > 0 ? (
              <ProjectsList
                projects={projects}
                title=" "
                isViewModeChangeable={true}
              />
            ) : (
              <EmptyResults />
            )}

            {/* Pagination */}
            {pagination && (
              <ProjectsPagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Projects;
