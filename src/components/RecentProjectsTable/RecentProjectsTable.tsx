import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import GlassCard from "../GlassCard/GlassCard";
import StatusBadge from "../StatusBadge/StatusBadge";
import type { StatusType } from "../StatusBadge/StatusBadge";
import { useAdminProjects } from "../../hooks/useAdmin";
import AdminTable, { type Column } from "../AdminTable/AdminTable";
import type { Project } from "../../types";

const RecentProjectsTable = () => {
  const { t } = useTranslation();
  const { data: projectsData, isLoading } = useAdminProjects({ page: 1, limit: 5 });
  const projects = projectsData?.data || [];

  const columns = useMemo<Column<Project>[]>(
    () => [
      {
        id: "title",
        label: t("admin.projects.tableHeaders.title"),
        render: (project) => (
          <span 
            style={{ color: "var(--text-primary)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: "100%" }}
            title={project.title}
          >
            {project.title}
          </span>
        ),
      },
      {
        id: "teamLeader",
        label: t("admin.projects.tableHeaders.teamLeader"),
        render: (project) => (
          <span 
            style={{ color: "var(--text-Secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: "100%" }}
            title={project.teamLeader?.name || "-"}
          >
            {project.teamLeader?.name || "-"}
          </span>
        ),
      },
      {
        id: "status",
        label: t("admin.projects.tableHeaders.status"),
        render: (project) => (
          <StatusBadge
            status={((project as any).status as StatusType) || "pending-ta"}
          />
        ),
      },
      {
        id: "date",
        label: t("admin.projects.tableHeaders.date"),
        render: (project) => (
          <span 
            style={{ color: "var(--text-Secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: "100%" }}
            title={new Date(project.createdAt).toLocaleDateString()}
          >
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        ),
      },
    ],
    [t]
  );

  return (
    <GlassCard elevation="light" sx={{ p: 0, overflow: "hidden" }}>
      {/* Header */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            color: "var(--text-primary)",
            fontWeight: 700,
            fontSize: "1.25rem",
          }}
        >
          {t("admin.projects.title")}
        </Typography>
      </Box>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={projects}
        keyExtractor={(project) => project._id}
        isLoading={isLoading}
        emptyMessage={t("admin.projects.noProjects")}
        showPagination={false}
      />
    </GlassCard>
  );
};

export default RecentProjectsTable;
