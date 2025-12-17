import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import StatCard from "../StatCard/StatCard";
import RecentProjectsTable from "../RecentProjectsTable/RecentProjectsTable";
import UserManagementSection from "../UserManagementSection/UserManagementSection";
import SchoolsSection from "../SchoolsSection/SchoolsSection";
import CommentsSection from "../CommentsSection/CommentsSection";
import SuggestionsSection from "../SuggestionsSection/SuggestionsSection";
import AdminProjectsSection from "../AdminProjectsSection/AdminProjectsSection";
import { useAdminDashboardStats } from "../../hooks/useAdmin";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatIcon from "@mui/icons-material/Chat";

interface AdminPanelContentProps {
  activeMenuItem: string;
}

const AdminPanelContent = ({
  activeMenuItem,
}: AdminPanelContentProps) => {
  const { t } = useTranslation();
  const { data: stats, isLoading: statsLoading } = useAdminDashboardStats();

  switch (activeMenuItem) {
    case "dashboard":
      return (
        <>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                title={t("admin.stats.totalProjects")}
                value={statsLoading ? "..." : stats?.projects.total.toLocaleString() || "0"}
                icon={<BarChartIcon />}
                badge={{
                  label: `${t("admin.stats.pending")}: ${statsLoading ? "..." : stats?.projects.pending || 0}`,
                  color: "warning",
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                title={t("admin.stats.newUsers")}
                value={statsLoading ? "..." : stats?.users.total.toLocaleString() || "0"}
                icon={<PersonAddIcon />}
                subtitle={`+${statsLoading ? "..." : stats?.users.newThisWeek || 0} ${t("admin.stats.lastWeek")}`}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                title={t("admin.stats.comments")}
                value={statsLoading ? "..." : stats?.comments.total.toLocaleString() || "0"}
                icon={<ChatIcon />}
                subtitle={`+${statsLoading ? "..." : stats?.comments.newThisWeek || 0} ${t("admin.stats.lastWeek")}`}
              />
            </Grid>
          </Grid>

          {/* Recent Projects Table */}
          <Box sx={{ mb: 4 }}>
            <RecentProjectsTable />
          </Box>
        </>
      );

    case "projects":
      return <AdminProjectsSection />;

    case "users":
      return (
        <Box>
          <UserManagementSection />
        </Box>
      );

    case "schools":
      return <SchoolsSection />;

    case "comments":
      return <CommentsSection />;

    case "suggestions":
      return <SuggestionsSection />;
    default:
      return null;
  }
};

export default AdminPanelContent;
