// src/pages/AcceptProject.tsx
import { useMemo, useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useProjects } from "../hooks/useProjects";
import ProjectHeader from "../components/ProjectHeader/ProjectHeader";
import { ProjectInfoCard } from "../components/ProjectInfoCard/ProjectInfoCard";
import ProjectRequestAction from "../components/ProjectRequestAction/ProjectRequestAction";
import ProjectSidebar from "../components/Sidebar/ProjectSidebar";
import { useTranslation } from "react-i18next";
import type { Project } from "../types";

type MediaItem = {
    type: "image" | "video";
    src: string;
};

const AcceptProject = () => {
    const { data: projectsData, isLoading, isError, error } = useProjects(1, 6);
    const { t } = useTranslation();

    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [selectedAction, setSelectedAction] =
        useState<"accept" | "decline" | null>(null);

    const handleActionClick = (action: "accept" | "decline") => {
        setSelectedAction(action);
    };

    useEffect(() => {
        if (!activeProject && projectsData?.projects?.length) {
            setActiveProject(projectsData.projects[0]);
        }
    }, [projectsData, activeProject]);

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

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ textAlign: "center", mt: 6 }}>
                <Typography color="error" variant="h5">
                    {t("ProjectRequest.errorLoading")}
                </Typography>
                {error && (
                    <Typography color="error" variant="body1" sx={{ mt: 2 }}>
                        {error.message || t("common.error")}
                    </Typography>
                )}
            </Box>
        );
    }

    if (!activeProject) {
        return (
            <Box sx={{ textAlign: "center", mt: 6 }}>
                <Typography color="error" variant="h5">
                    {t("ProjectRequest.noProjects")}
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
                px: 2,
            }}
        >
            <ProjectSidebar
                projectsData={projectsData}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
            />
            <ProjectHeader
                title={activeProject?.title}
                media={media}
            />
            <ProjectInfoCard
                course={activeProject?.course}
                teamLeader={activeProject?.teamLeader}
                teamMembers={activeProject?.teamMembers}
                supervisor={activeProject?.supervisor}
                repoUrl={activeProject?.repoUrl}
                stars={activeProject?.stars}
                projectId={activeProject?._id}
                description={activeProject?.description}
                technologies={activeProject?.technologies}
                tags={activeProject?.tags}
                createdAt={activeProject?.createdAt}
            />
            <ProjectRequestAction
                selectedAction={selectedAction}
                handleActionClick={handleActionClick}
            />
        </Box>

    );
};
export default AcceptProject;
