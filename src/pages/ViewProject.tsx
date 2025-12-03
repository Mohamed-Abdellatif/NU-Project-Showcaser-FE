import { useMemo } from "react";
import {
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetProjectById, useRelatedProjects } from "../hooks/useProjects";
import ProjectsList from "../components/ProjectsList/ProjectsList";
import ProjectHeader from "../components/ProjectHeader/ProjectHeader";
import { ProjectInfoCard } from "../components/ProjectInfoCard/ProjectInfoCard";
import CommentSection from "../components/Comments/CommentSection";
import LoadingState from "../components/LoadingState/LoadingState";
import ErrorState from "../components/ErrorState/ErrorState";
import EmptyResults from "../components/EmptyResults/EmptyResults";


const ViewProject = () => {
  const { projectId } = useParams();
  const { data: project, isLoading, isError, error } = useGetProjectById(projectId!);
  const { data: relatedProjects } = useRelatedProjects(projectId);

  const media = useMemo(() => {
    if (!project) return [];
    const imgs = (project.images || []).map((src) => ({
      type: "image" as const,
      src,
    }));
    const vids = (project.videos || []).map((src) => ({
      type: "video" as const,
      src,
    }));
    return [...imgs, ...vids];
  }, [project]);

  

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }

  if (!project) {
    return <EmptyResults message="viewProject.projectNotFound" />;
  }


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--background-light)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: 8,
      }}
    >
      <ProjectHeader title={project.title} media={media} />

      <ProjectInfoCard
        course={project.course}
        supervisor={project.supervisor}
        teamLeader={project.teamLeader}
        teamMembers={project.teamMembers}
        repoUrl={project.repoUrl}
        stars={project.stars}
        projectId={project._id}
        description={project.description}
        technologies={project.technologies}
        tags={project.tags}
        createdAt={project.createdAt}
        isLoading={isLoading}
      />

      <Box
        sx={{
          width: "85%",
          maxWidth: "900px",
          mt: 8,
          p: 3,
          borderRadius: 4,
          backgroundColor: "#ffffffaa",
          backdropFilter: "blur(6px)",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        }}
      >

        <CommentSection projectId={project._id} />
      </Box>


      {relatedProjects && relatedProjects.length > 0 && (
        <Box
          sx={{
            width: "85%",
            maxWidth: "1200px",
            mt: 10,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <ProjectsList
            projects={relatedProjects}
            title="viewProject.recommendedProjects"
            isViewModeChangeable={false}
          />
        </Box>
      )}
    </Box>
  );
};

export default ViewProject;
