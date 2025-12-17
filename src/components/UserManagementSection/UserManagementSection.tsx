import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import GlassCard from "../GlassCard/GlassCard";
import StatusBadge from "../StatusBadge/StatusBadge";
import type { StatusType } from "../StatusBadge/StatusBadge";
import { useAdminUsers, useAdminEditUser } from "../../hooks/useAdmin";
import LoadingState from "../LoadingState/LoadingState";
import AdminTable from "../AdminTable/AdminTable";
import SelectMenu, { type SelectOption } from "../SelectMenu/SelectMenu";
import type { User } from "../../types";

const UserManagementSection = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [roleAnchorEl, setRoleAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch users with pagination and filters
  const { data, isLoading, error } = useAdminUsers({
    page: page + 1, // API is 1-indexed
    limit,
    firstName: searchTerm || undefined,
    role: roleFilter || undefined,
  });

  // Edit user mutation
  const editUserMutation = useAdminEditUser();

  const handleOpenRoleMenu = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setRoleAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleCloseRoleMenu = () => {
    setRoleAnchorEl(null);
    setSelectedUser(null);
  };

  const handleChangeRole = async (newRole: string) => {
    if (!selectedUser) return;

    setUpdatingRoleId(selectedUser._id);

    try {
      await editUserMutation.mutateAsync({
        userId: selectedUser._id,
        updates: { role: newRole as "student" | "supervisor" | "admin" },
      });
    } catch (error) {
      console.error("Error updating user role:", error);
    } finally {
      setUpdatingRoleId(null);
    }
  };

  const roleOptions: SelectOption[] = [
    {
      value: "student",
      labelKey: "admin.status.student",
      chipBackgroundColor: "#F5F5F5",
      chipColor: "#616161",
    },
    {
      value: "supervisor",
      labelKey: "admin.status.supervisor",
      chipBackgroundColor: "#E3F2FD",
      chipColor: "#1565C0",
    },
    {
      value: "admin",
      labelKey: "admin.status.admin",
      chipBackgroundColor: "var(--background-light)",
      chipColor: "var(--primary)",
    },
  ];

  const users = useMemo(() => data?.data || [], [data]);
  const totalUsers = data?.pagination?.total || 0;

  // Only show loading state on initial load (no data yet)
  if (isLoading && !data) {
    return <LoadingState />;
  }

  if (error && !data) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{t("admin.users.errorLoading")}</Typography>
      </Box>
    );
  }

  return (
    <GlassCard elevation="light" sx={{ p: 0, overflow: "hidden" }}>
      {/* Header with Search and Filters */}
      <Box
        sx={{
          p: 3,
          pb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "var(--text-primary)",
            fontWeight: 700,
            fontSize: "1.25rem",
          }}
        >
          {t("admin.users.title")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1, maxWidth: 600 }}>
          <TextField
            placeholder={t("admin.users.searchPlaceholder")}
            size="small"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "var(--text-Secondary)" }} />
                </InputAdornment>
              ),
              endAdornment: isLoading && data && (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "12px",
                backgroundColor: "var(--background-lighter)",
                "&:hover": {
                  backgroundColor: "var(--background-light)",
                },
                "& fieldset": {
                  border: "none",
                },
              },
            }}
            sx={{
              flexGrow: 1,
              maxWidth: 300,
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>{t("admin.users.roleFilter")}</InputLabel>
            <Select
              value={roleFilter}
              label={t("admin.users.roleFilter")}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(0);
              }}
              sx={{
                borderRadius: "12px",
                backgroundColor: "var(--background-lighter)",
                "& fieldset": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="">{t("admin.users.allRoles")}</MenuItem>
              <MenuItem value="student">{t("admin.users.roles.student")}</MenuItem>
              <MenuItem value="supervisor">{t("admin.users.roles.supervisor")}</MenuItem>
              <MenuItem value="admin">{t("admin.users.roles.admin")}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Table */}
      <AdminTable
        columns={[
          {
            id: "name",
            label: t("admin.users.tableHeaders.name"),
            render: (user: User) => (
              <span 
                style={{ color: "var(--text-primary)", fontWeight: 500 , overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: "100%" }}
                title={`${user.firstName?.toUpperCase()} ${user.lastName?.toUpperCase()}`}
              >
                {user.firstName?.toUpperCase()} {user.lastName?.toUpperCase()}
              </span>
            ),
          },
          {
            id: "email",
            label: t("admin.users.tableHeaders.email"),
            render: (user: User) => (
              <span 
                style={{ color: "var(--text-Secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: "100%" }}
                title={user.email}
                >
                  {user.email}
              </span>
            ),
          },
          {
            id: "role",
            label: t("admin.users.tableHeaders.role"),
            render: (user: User) =>
              updatingRoleId === user._id ? (
                <CircularProgress size={20} />
              ) : (
                <Box
                  onClick={(e) => handleOpenRoleMenu(e, user)}
                  sx={{ cursor: "pointer", display: "inline-block" }}
                >
                  <StatusBadge status={user.role as StatusType} />
                </Box>
              ),
          },
          {
            id: "school",
            label: t("admin.users.tableHeaders.school"),
            render: (user: User) => (
              <span 
                style={{ color: "var(--text-Secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: "100%" }}
                title={user.school || "-"}
              >
                {user.school || "-"}
              </span>
            ),
          },
          {
            id: "major",
            label: t("admin.users.tableHeaders.major"),
            render: (user: User) => (
              <span 
                style={{ color: "var(--text-Secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: "100%" }}
                title={user.major || "-"}
              >
                {user.major || "-"}
              </span>
            ),
          },
        ]}
        data={users}
        keyExtractor={(user: User) => user._id}
        isLoading={false}
        emptyMessage={t("admin.users.noUsers")}
        showPagination={true}
        page={page}
        rowsPerPage={limit}
        totalCount={totalUsers}
        onPageChange={setPage}
        onRowsPerPageChange={(newLimit) => {
          setLimit(newLimit);
          setPage(0);
        }}
      />

      {/* Role Change Menu */}
      <SelectMenu
        anchorEl={roleAnchorEl}
        open={Boolean(roleAnchorEl)}
        onClose={handleCloseRoleMenu}
        options={roleOptions}
        onSelect={handleChangeRole}
      />
    </GlassCard>
  );
};

export default UserManagementSection;
