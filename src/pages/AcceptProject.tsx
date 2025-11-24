// src/pages/AcceptProject.tsx
import { useMemo, useState, useEffect } from "react";
import { Box } from "@mui/material";
import {
  useGetPendingProjectsByTA,
  useUpdateProject,
} from "../hooks/useProjects";
import ProjectHeader from "../components/ProjectHeader/ProjectHeader";
import { ProjectInfoCard } from "../components/ProjectInfoCard/ProjectInfoCard";
import ProjectRequestAction from "../components/ProjectRequestAction/ProjectRequestAction";
import ProjectSidebar from "../components/Sidebar/ProjectSidebar";
import type { Project } from "../types";
import LoadingState from "../components/LoadingState/LoadingState";
import ErrorState from "../components/ErrorState/ErrorState";
import EmptyResults from "../components/EmptyResults/EmptyResults";
import { userAtom } from "../atoms/authAtom";
import { useAtom } from "jotai";
import { useToastContext } from "../contexts/ToastContext";
import { useTranslation } from "react-i18next";

type MediaItem = {
  type: "image" | "video";
  src: string;
};

const AcceptProject = () => {
  const [user] = useAtom(userAtom);
  const { showSuccess } = useToastContext();
  const email = user?.email;
  const {
    data: projectsData,
    isLoading,
    isError,
    error,
  } = useGetPendingProjectsByTA(email);
  const { isPending: isUpdating, mutate: updateProjectMutation } =
    useUpdateProject();
  const { t } = useTranslation();

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const handleActionClick = (action: "accept" | "decline") => {
    if (!activeProject || !user?.email) {
      return;
    }

    const status = action === "accept" ? "accepted" : "rejected";
    const successMessage =
      action === "accept"
        ? t("ProjectRequest.projectAccepted")
        : t("ProjectRequest.projectRejected");

    updateProjectMutation(
      {
        id: activeProject._id,
        updates: { status, taMail: email },
      },
      {
        onSuccess: () => {
          showSuccess(successMessage);
        },
      }
    );
  };

  useEffect(() => {
    if (projectsData && projectsData.length > 0 && !isUpdating && !isLoading) {
      setActiveProject(projectsData[0]);
    } else {
      setActiveProject(null);
    }
  }, [projectsData]);

  const media: MediaItem[] = useMemo(() => {
    if (!activeProject) return [];
    const imgs: MediaItem[] = (activeProject.images || []).map(
      (src: string) => ({ type: "image", src })
    );
    const vids: MediaItem[] = (activeProject.videos || []).map(
      (src: string) => ({ type: "video", src })
    );
    return [...imgs, ...vids];
  }, [activeProject]);

  if (!email) {
    return <LoadingState />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }

  if (!activeProject && !isUpdating && !isLoading) {
    return <EmptyResults message="ProjectRequest.noProjects" />;
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
        px: 2,
      }}
    >
      <ProjectSidebar
        projectsData={{ projects: projectsData || [] }}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
      <ProjectHeader title={activeProject?.title || ""} media={media} />
      <ProjectInfoCard
        course={activeProject?.course}
        teamLeader={activeProject?.teamLeader}
        teamMembers={activeProject?.teamMembers}
        supervisor={activeProject?.supervisor}
        repoUrl={activeProject?.repoUrl}
        stars={activeProject?.stars || 0}
        projectId={activeProject?._id || ""}
        description={activeProject?.description}
        technologies={activeProject?.technologies}
        tags={activeProject?.tags}
        createdAt={activeProject?.createdAt}
      />
      <ProjectRequestAction handleActionClick={handleActionClick} />
    </Box>
  );
};
export default AcceptProject;
