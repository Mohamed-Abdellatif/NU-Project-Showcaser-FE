import EmptyResults from "../components/EmptyResults/EmptyResults";
import ErrorState from "../components/ErrorState/ErrorState";
import LoadingState from "../components/LoadingState/LoadingState";
import ProjectsList from "../components/ProjectsList/ProjectsList"
import {  useStarredProjects } from "../hooks/useProjects";
import { Box } from "@mui/material";


const StarredProjectsPage = () => {
  const { data: projectsData, isLoading, isError, error } = useStarredProjects();
  const projects = projectsData ?? [];
  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;
  if (projects.length === 0) return <EmptyResults message="starredProjects.noStarredProjects" />;
  return (
    <Box>
      <ProjectsList projects={projects} title="starredProjects.title" />
    </Box>
  )
}

export default StarredProjectsPage