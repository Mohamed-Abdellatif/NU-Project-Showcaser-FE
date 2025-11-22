import { useMemo } from "react";
import {
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetProjectById, useProjects } from "../hooks/useProjects";
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
  const { data: projectsData } = useProjects(1, 50);

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

  const recommendedProjects = useMemo(() => {
    if (!project || !projectsData?.projects) return [];
    const others = projectsData.projects.filter((p) => p._id !== project._id);
    return others.sort(() => 0.5 - Math.random()).slice(0, 6);
  }, [project, projectsData]);

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
        background: "linear-gradient(180deg, #FAF2E6 0%, #ffeef5 100%)",
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

        <CommentSection />
      </Box>


      {recommendedProjects && recommendedProjects.length > 0 && (
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
            projects={recommendedProjects}
            title="viewProject.recommendedProjects"
            isViewModeChangeable={false}
          />
        </Box>
      )}
    </Box>
  );
};

export default ViewProject;
