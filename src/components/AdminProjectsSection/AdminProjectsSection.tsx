import { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import { useAdminProjects, useAdminDeleteProject, useAdminEditProject } from "../../hooks/useAdmin";
import type { ProjectFilters } from "../../api/adminApi";
import LoadingState from "../LoadingState/LoadingState";
import ErrorState from "../ErrorState/ErrorState";
import EmptyResults from "../EmptyResults/EmptyResults";
import FolderIcon from "@mui/icons-material/Folder";
import type { Project } from "../../types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AdminTable, { type Column } from "../AdminTable/AdminTable";
import SelectMenu, { type SelectOption } from "../SelectMenu/SelectMenu";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

const AdminProjectsSection = () => {
  const { t } = useTranslation();
  
  // Filters state
  const [filters, setFilters] = useState<ProjectFilters>({
    page: 1,
    limit: 10,
    title: "",
    status: "",
    course: "",
    supervisor: "",
    teamLeader: "",
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const { data: projectsData, isLoading, isError } = useAdminProjects(filters);
  const deleteProjectMutation = useAdminDeleteProject();
  const editProjectMutation = useAdminEditProject();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const handleApplyFilters = () => {
    setFilters({ ...tempFilters, page: 1 });
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      page: 1,
      limit: filters.limit,
      title: "",
      status: "",
      course: "",
      supervisor: "",
      teamLeader: "",
    };
    setTempFilters(clearedFilters);
    setFilters(clearedFilters);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    setDeletingId(projectToDelete);
    try {
      await deleteProjectMutation.mutateAsync(projectToDelete);
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeletingId(null);
      setProjectToDelete(null);
    }
  };

  const handleOpenStatusMenu = (event: React.MouseEvent<HTMLElement>, project: Project) => {
    setStatusAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleCloseStatusMenu = () => {
    setStatusAnchorEl(null);
    setSelectedProject(null);
  };

  const handleChangeStatus = async (newStatus: string) => {
    if (!selectedProject) return;

    setUpdatingStatusId(selectedProject._id);

    try {
      await editProjectMutation.mutateAsync({
        projectId: selectedProject._id,
        updates: { status: newStatus },
      });
    } catch (error) {
      console.error("Error updating project status:", error);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const statusOptions: SelectOption[] = [
    {
      value: "pending-ta",
      labelKey: "admin.status.pending-ta",
      chipBackgroundColor: "#FFF9C4",
      chipColor: "#F57F17",
    },
    {
      value: "accepted",
      labelKey: "admin.status.accepted",
      chipBackgroundColor: "#E8F5E9",
      chipColor: "#2E7D32",
    },
    {
      value: "rejected",
      labelKey: "admin.status.rejected",
      chipBackgroundColor: "#FFEBEE",
      chipColor: "#C62828",
    },
  ];

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "success";
      case "pending-ta":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "warning";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
    });
  };

  const projects = projectsData?.data || [];
  const pagination = projectsData?.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 };

  const columns = useMemo<Column<Project>[]>(
    () => [
      {
        id: "title",
        label: t("admin.projects.tableHeaders.title"),
        width: "30%",
        render: (project) => (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
              maxWidth: "100%",
            }}
            title={project.title}
          >
            {project.title}
          </Typography>
        ),
      },
      {
        id: "teamLeader",
        label: t("admin.projects.tableHeaders.teamLeader"),
        width: "15%",
        render: (project) => {
          const name = project.teamLeader?.name || "N/A";
          const formattedName = name !== "N/A" 
            ? name.split(" ").map(part => part?.toUpperCase()).join(" ")
            : "N/A";
          return (
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
              }}
              title={formattedName}
            >
              {formattedName}
            </Typography>
          );
        },
      },
      {
        id: "supervisor",
        label: t("admin.projects.tableHeaders.supervisor", "Supervisor"),
        width: "15%",
        render: (project) => (
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
            }}
            title={project.supervisor || "N/A"}
          >
            {project.supervisor || "N/A"}
          </Typography>
        ),
      },
      {
        id: "status",
        label: t("admin.projects.tableHeaders.status"),
        width: "15%",
        render: (project) =>
          updatingStatusId === project._id ? (
            <CircularProgress size={20} />
          ) : (
            <Chip
              label={t(`admin.status.${(project as any).status || "pending-ta"}`)}
              color={getStatusColor((project as any).status)}
              size="small"
              onClick={(e) => handleOpenStatusMenu(e, project)}
              sx={{ cursor: "pointer" }}
            />
          ),
      },
      {
        id: "date",
        label: t("admin.projects.tableHeaders.date"),
        width: "13%",
        render: (project) => (
          <Typography variant="body2" sx={{ color: "var(--secondary)" }}>
            {formatDate(project.createdAt)}
          </Typography>
        ),
      },
      {
        id: "actions",
        label: t("admin.projects.tableHeaders.actions"),
        width: "12%",
        align: "center" as const,
        render: (project) => (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => window.open(`/projects/${project._id}`, "_blank")}
              sx={{
                color: "primary.main",
                "&:hover": { backgroundColor: "primary.lighter" },
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleDeleteProject(project._id)}
              disabled={deletingId === project._id}
              sx={{
                color: "error.main",
                "&:hover": { backgroundColor: "error.lighter" },
              }}
            >
              {deletingId === project._id ? (
                <CircularProgress size={20} />
              ) : (
                <DeleteIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        ),
      },
    ],
    [t, updatingStatusId, deletingId]
  );

  if (isLoading) {
    return <LoadingState message="Loading projects..." />;
  }

  if (isError) {
    return <ErrorState error={new Error("Failed to load projects. Please try again later.")} />;
  }

  if (projects.length === 0 && !filters.title && !filters.status && !filters.course && !filters.supervisor && !filters.teamLeader) {
    return (
      <EmptyResults
        message="admin.projects.noProjects"
        icon={<FolderIcon sx={{ fontSize: 80, color: "var(--secondary)", opacity: 0.3 }} />}
        subtitle="No projects have been submitted yet"
      />
    );
  }

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "var(--text)" }}>
          {t("admin.sidebar.projects")}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "var(--secondary)" }}>
            {pagination.total} {t("admin.projects.totalProjects", "Total Projects")}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(!showFilters)}
            sx={{ textTransform: "none" }}
          >
            {t("admin.projects.filters", "Filters")}
          </Button>
        </Box>
      </Box>

      {/* Filters Section */}
      {showFilters && (
        <Paper sx={{ p: 3, mb: 3, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label={t("admin.projects.tableHeaders.title")}
                value={tempFilters.title}
                onChange={(e) => setTempFilters({ ...tempFilters, title: e.target.value })}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>{t("admin.projects.tableHeaders.status")}</InputLabel>
                <Select
                  value={tempFilters.status}
                  label={t("admin.projects.tableHeaders.status")}
                  onChange={(e) => setTempFilters({ ...tempFilters, status: e.target.value })}
                >
                  <SelectMenuItem value="">{t("admin.projects.allStatuses", "All")}</SelectMenuItem>
                  <SelectMenuItem value="pending-ta">{t("admin.status.pending-ta")}</SelectMenuItem>
                  <SelectMenuItem value="accepted">{t("admin.status.accepted")}</SelectMenuItem>
                  <SelectMenuItem value="rejected">{t("admin.status.rejected")}</SelectMenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label={t("admin.projects.course", "Course")}
                value={tempFilters.course}
                onChange={(e) => setTempFilters({ ...tempFilters, course: e.target.value })}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label={t("admin.projects.tableHeaders.supervisor")}
                value={tempFilters.supervisor}
                onChange={(e) => setTempFilters({ ...tempFilters, supervisor: e.target.value })}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label={t("admin.projects.tableHeaders.teamLeader")}
                value={tempFilters.teamLeader}
                onChange={(e) => setTempFilters({ ...tempFilters, teamLeader: e.target.value })}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button
                variant="contained"
                onClick={handleApplyFilters}
                fullWidth
                sx={{
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                  textTransform: "none",
                }}
              >
                {t("admin.projects.applyFilters", "Apply")}
              </Button>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
                startIcon={<ClearIcon />}
                fullWidth
                sx={{ textTransform: "none" }}
              >
                {t("admin.projects.clearFilters", "Clear")}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Paper
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      overflow: "hidden",
        }}
      >
        <AdminTable
          columns={columns}
          data={projects}
          keyExtractor={(project) => project._id}
          isLoading={false}
          emptyMessage={t("admin.projects.noResults")}
          showPagination={true}
          page={pagination.page - 1}
          rowsPerPage={pagination.limit}
          totalCount={pagination.total}
          onPageChange={(newPage) => setFilters((prev) => ({ ...prev, page: newPage + 1 }))}
          onRowsPerPageChange={(newLimit) => {
            setFilters((prev) => ({
              ...prev,
              limit: newLimit,
              page: 1,
            }));
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>

      {/* Status Change Menu */}
      <SelectMenu
        anchorEl={statusAnchorEl}
        open={Boolean(statusAnchorEl)}
        onClose={handleCloseStatusMenu}
        options={statusOptions}
        onSelect={handleChangeStatus}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={confirmDeleteProject}
        title={t("admin.projects.deleteTitle", "Delete Project")}
        message={t("admin.projects.deleteMessage", "Are you sure you want to delete this project? This action cannot be undone.")}
        type="confirm"
        confirmColor="error"
        confirmText={t("common.delete", "Delete")}
      />
    </Box>
  );
};

export default AdminProjectsSection;
