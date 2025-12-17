import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import {
  useAdminSchools,
  useAdminCreateSchool,
  useAdminEditSchool,
  useAdminDeleteSchool,
} from "../../hooks/useAdmin";
import LoadingState from "../LoadingState/LoadingState";
import EmptyResults from "../EmptyResults/EmptyResults";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import type { School } from "../../types";
import { useToastContext } from "../../contexts/ToastContext";


interface SchoolFormData {
  name: string;
  majors: string[];
}

const SchoolsSection = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(8);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<SchoolFormData>({
    name: "",
    majors: [],
  });
  const [majorInput, setMajorInput] = useState("");
  const { showError } = useToastContext();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch schools with pagination and filters
  const { data, isLoading, error } = useAdminSchools(
    {
      page: page + 1, // API is 1-indexed
      limit,
      name: searchTerm || undefined,
    }
  );

  // Mutations
  const createSchoolMutation = useAdminCreateSchool();
  const editSchoolMutation = useAdminEditSchool();
  const deleteSchoolMutation = useAdminDeleteSchool();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (school?: School) => {
    if (school) {
      setEditingSchool(school);
      setFormData({
        name: school.name,
        majors: school.majors || [],
      });
    } else {
      setEditingSchool(null);
      setFormData({
        name: "",
        majors: [],
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingSchool(null);
    setFormData({ name: "", majors: [] });
    setMajorInput("");
  };

  const handleAddMajor = () => {
    if (majorInput.trim() && !formData.majors.includes(majorInput.trim())) {
      setFormData({
        ...formData,
        majors: [...formData.majors, majorInput.trim()],
      });
      setMajorInput("");
    }
  };

  const handleRemoveMajor = (major: string) => {
    setFormData({
      ...formData,
      majors: formData.majors.filter((m) => m !== major),
    });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      showError(t("admin.schools.nameRequired"));
      return;
    }

    try {
      if (editingSchool) {
        await editSchoolMutation.mutateAsync({
          schoolId: editingSchool._id || "",
          updates: formData,
        });
      } else {
        await createSchoolMutation.mutateAsync(formData);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save school:", error);
    }
  };

  const handleDelete = (schoolId: string) => {
    setSchoolToDelete(schoolId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteSchool = async () => {
    if (!schoolToDelete) return;

    try {
      await deleteSchoolMutation.mutateAsync(schoolToDelete);
    } catch (error) {
      console.error("Failed to delete school:", error);
    } finally {
      setSchoolToDelete(null);
    }
  };

  const schools = useMemo(() => data?.data || [], [data]);
  const totalSchools = data?.pagination?.total || 0;

  const schoolColors = [
    "#667eea",
    "#f093fb",
    "#4facfe",
    "#43e97b",
    "#fa709a",
    "#fee140",
    "#30cfd0",
    "#a8edea",
  ];

  // Only show loading state on initial load (no data yet)
  if (isLoading && !data) {
    return <LoadingState />;
  }

  if (error && !data) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{t("admin.schools.errorLoading")}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "var(--text)" }}>
          {t("admin.sidebar.schools")}
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            placeholder={t("admin.schools.search")}
            size="small"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            sx={{ width: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: isLoading && data && (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              textTransform: "none",
              px: 3,
            }}
          >
            {t("admin.schools.addSchool")}
          </Button>
        </Box>
      </Box>

      {schools.length === 0 ? (
        <EmptyResults message={t("admin.schools.noSchools")} />
      ) : (
        <>
          <Grid container spacing={3}>
            {schools.map((school, index) => {
              const color = schoolColors[index % schoolColors.length];
              return (
                <Grid size={{ xs: 12 }} key={school._id}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: color,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: "12px",
                            background: `${color}20`,
                            color: color,
                            mr: 2,
                          }}
                        >
                          <SchoolIcon />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {school.name}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          size="small"
                          sx={{ mr: 0.5 }}
                          onClick={() => handleOpenDialog(school)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(school._id || "")}
                          disabled={deleteSchoolMutation.isPending}
                        >
                          {deleteSchoolMutation.isPending ? (
                            <CircularProgress size={20} />
                          ) : (
                            <DeleteIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {school.majors && school.majors.length > 0 ? (
                        school.majors.map((major) => (
                          <Chip
                            key={major}
                            label={major}
                            size="small"
                            sx={{ backgroundColor: `${color}15`, color: color }}
                          />
                        ))
                      ) : (
                        <Typography variant="caption" sx={{ color: "var(--secondary)" }}>
                          {t("admin.schools.noMajors")}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <TablePagination
              component="div"
              count={totalSchools}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[4, 8, 12, 16]}
              labelRowsPerPage={t("admin.pagination.rowsPerPage")}
            />
          </Box>
        </>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingSchool ? t("admin.schools.editSchool") : t("admin.schools.addSchool")}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label={t("admin.schools.schoolName")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {t("admin.schools.majors")}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  size="small"
                  placeholder={t("admin.schools.addMajor")}
                  value={majorInput}
                  onChange={(e) => setMajorInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddMajor();
                    }
                  }}
                  fullWidth
                />
                <Button variant="outlined" onClick={handleAddMajor}>
                  {t("admin.schools.add")}
                </Button>
              </Box>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {formData.majors.map((major) => (
                  <Chip
                    key={major}
                    label={major}
                    onDelete={() => handleRemoveMajor(major)}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t("admin.schools.cancel")}</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={createSchoolMutation.isPending || editSchoolMutation.isPending}
          >
            {createSchoolMutation.isPending || editSchoolMutation.isPending ? (
              <CircularProgress size={20} />
            ) : editingSchool ? (
              t("admin.schools.update")
            ) : (
              t("admin.schools.create")
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSchoolToDelete(null);
        }}
        onConfirm={confirmDeleteSchool}
        title={t("admin.schools.deleteTitle", "Delete School")}
        message={t("admin.schools.deleteMessage", "Are you sure you want to delete this school? This action cannot be undone.")}
        type="confirm"
        confirmColor="error"
        confirmText={t("common.delete", "Delete")}
      />
    </Box>
  );
};

export default SchoolsSection;
