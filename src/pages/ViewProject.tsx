import {  useMemo} from "react";
import {
  Box,
  Typography,

} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetProjectById, useProjects } from "../hooks/useProjects";
import ProjectsList from "../components/ProjectsList/ProjectsList";
import ProjectHeader from "../components/ProjectHeader/ProjectHeader";
import { ProjectInfoCard } from "../components/ProjectInfoCard/ProjectInfoCard";
import ProjectFilesSection from "../components/ProjectFilesSection/ProjectFilesSection";



const ViewProject = () => {
  const { projectId } = useParams();
  const { data: project } = useGetProjectById(projectId!);
  // Fetch more projects for recommendations (limit 50 to get a good pool)
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

  const projectFiles = useMemo(() => {
    if (!project) return [];
    return (project.images || []).map((src) => ({
      name: src.split("/").pop() || src,
      url: src,
    }));
  }, [project]);

  const recommendedProjects = useMemo(() => {
    if (!project || !projectsData?.projects) return [];
    const others = projectsData.projects.filter((p) => p._id !== project._id);
    return others.sort(() => 0.5 - Math.random()).slice(0, 6);
  }, [project, projectsData]);

  if (!project) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography color="error" variant="h5">
          Project not found.
        </Typography>
      </Box>
    );
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
      <ProjectHeader title={project.title} description={project.description} media={media} />

      <ProjectInfoCard
        course={project.course}
        teamMembers={project.teamMembers}
        description={project.description}
        repoUrl={project.repoUrl}
        stars={project.stars}
        projectId={project._id}
      />

      <ProjectFilesSection projectFiles={projectFiles} />
      {/* RECOMMENDED PROJECTS */}

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
