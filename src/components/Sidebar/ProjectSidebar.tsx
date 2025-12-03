import { useState } from "react";
import {
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Box,
} from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { useTranslation } from "react-i18next";
import type { Project } from "../../types";

// Import Poppins font
import "@fontsource/poppins/400.css"; // normal weight
import "@fontsource/poppins/700.css"; // bold weight

interface ProjectSidebarProps {
    projectsData?: { projects: Project[] } | null;
    activeProject: Project | null;
    setActiveProject: (project: Project | null) => void;
}

const ProjectSidebar = ({ projectsData, activeProject, setActiveProject }: ProjectSidebarProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { t } = useTranslation();

    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    top: "50%",
                    right: sidebarOpen ? 305 : 0,
                    transform: "translateY(-50%)",
                    zIndex: 2000,
                    cursor: "pointer",
                    transition: "right 0.25s ease",
                }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <ArrowDropDownCircleIcon
                    sx={{
                        fontSize: 48,
                        color: "var(--accent)",
                        transform: sidebarOpen ? "rotate(-90deg)" : "rotate(90deg)",
                        transition: "transform 0.25s ease",
                    }}
                />
            </Box>

            <Drawer
                anchor="right"
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{
                    sx: {
                        width: 300,
                        p: 2,
                        fontFamily: "'Poppins', sans-serif", // Apply Poppins
                    },
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    {t("ProjectRequest.ProjectRequests")}
                </Typography>

                <List>
                    {projectsData?.projects && projectsData.projects.length > 0 ? (
                        projectsData.projects.map((p) => (
                            <ListItem
                                key={p._id}
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingRight: 1,
                                    "&:hover": { background: "#f5f5f5" },
                                    backgroundColor:
                                        activeProject?._id === p._id ? "var(--background-light)" : "transparent",
                                }}
                            >
                                <ListItemText primary={p.title} />

                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        backgroundColor: "var(--accent)",
                                        "&:hover": { backgroundColor: "var(--primary)" },
                                    }}
                                    onClick={() => {
                                        setActiveProject(p);
                                        setSidebarOpen(false);
                                    }}
                                >
                                    {t("ProjectRequest.view")}
                                </Button>
                            </ListItem>
                        ))
                    ) : (
                        <Typography
                            variant="body2"
                            sx={{ mt: 2, textAlign: "center", color: "#888" }}
                        >
                            {t("ProjectRequest.noRequests")}
                        </Typography>
                    )}
                </List>
            </Drawer>
        </>
    );
};

export default ProjectSidebar;
