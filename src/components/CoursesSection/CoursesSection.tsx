import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import CodeIcon from "@mui/icons-material/Code";
import TitleIcon from "@mui/icons-material/Title";
import {
  useAdminCourses,
  useAdminCreateCourse,
  useAdminEditCourse,
  useAdminDeleteCourse,
} from "../../hooks/useAdmin";
import LoadingState from "../LoadingState/LoadingState";
import EmptyResults from "../EmptyResults/EmptyResults";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import IconInputField from "../IconInputField/IconInputField";
import GradientButton from "../GradientButton/GradientButton";
import type { Course } from "../../types";
import { useToastContext } from "../../contexts/ToastContext";

interface CourseFormData {
  code: string;
  title: string;
}

const CoursesSection = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<CourseFormData>({
    code: "",
    title: "",
  });
  const { showError } = useToastContext();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch courses with pagination and filters
  const { data, isLoading, error } = useAdminCourses({
    page: page + 1, // API is 1-indexed
    limit,
    code: searchTerm || undefined,
    title: searchTerm || undefined,
  });

  // Mutations
  const createCourseMutation = useAdminCreateCourse();
  const editCourseMutation = useAdminEditCourse();
  const deleteCourseMutation = useAdminDeleteCourse();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        code: course.code,
        title: course.title,
      });
    } else {
      setEditingCourse(null);
      setFormData({
        code: "",
        title: "",
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingCourse(null);
    setFormData({ code: "", title: "" });
  };

  const handleSubmit = async () => {
    if (!formData.code.trim()) {
      showError(t("admin.courses.codeRequired"));
      return;
    }

    if (!formData.title.trim()) {
      showError(t("admin.courses.titleRequired"));
      return;
    }

    try {
      if (editingCourse) {
        await editCourseMutation.mutateAsync({
          courseId: editingCourse._id,
          updates: formData,
        });
      } else {
        await createCourseMutation.mutateAsync(formData);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save course:", error);
    }
  };

  const handleDelete = (courseId: string) => {
    setCourseToDelete(courseId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      await deleteCourseMutation.mutateAsync(courseToDelete);
      
      // If we just deleted the last item on the current page (and we're not on the first page),
      // navigate to the previous page
      if (courses.length === 1 && page > 0) {
        setPage(page - 1);
      }
    } catch (error) {
      console.error("Failed to delete course:", error);
    } finally {
      setCourseToDelete(null);
    }
  };

  const courses = useMemo(() => data?.data || [], [data]);
  const totalCourses = data?.pagination?.total || 0;

  // Function to get color based on course code pattern
  const getCourseColor = (courseCode: string): string => {
    const code = courseCode.toUpperCase();

    if (code.startsWith("CS") || code.startsWith("IT")) {
      return "#9c27b0"; // purple for CS/IT
    } else if (code.startsWith("MATH") || code.startsWith("STAT")) {
      return "#2196f3"; // blue for math/stats
    } else if (code.startsWith("ENG") || code.startsWith("PHYS")) {
      return "#8bc34a"; // light green for engineering/physics
    } else if (code.startsWith("BUS") || code.startsWith("ECON")) {
      return "#ff8c42"; // orange for business/economics
    } else if (code.startsWith("BIO") || code.startsWith("CHEM")) {
      return "#2d7a4f"; // dark green for biology/chemistry
    } else if (code.startsWith("ART") || code.startsWith("HUM")) {
      return "#e91e63"; // pink for arts/humanities
    } else {
      return "#1976d2"; // default blue
    }
  };

  // Only show loading state on initial load (no data yet)
  if (isLoading && !data) {
    return <LoadingState />;
  }

  if (error && !data) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{t("admin.courses.errorLoading")}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "var(--text)" }}>
          {t("admin.sidebar.courses")}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            placeholder={t("admin.courses.search")}
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

          <GradientButton
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              borderRadius: "12px",
              px: 3,
              py: 1.25,
            }}
          >
            {t("admin.courses.addCourse")}
          </GradientButton>
        </Box>
      </Box>

      {courses.length === 0 ? (
        <EmptyResults message={t("admin.courses.noCourses")} />
      ) : (
        <>
          <Grid container spacing={3}>
            {courses.map((course) => {
              const color = getCourseColor(course.code);
              return (
                <Grid size={{ xs: 12, md: 6 }} sx={{ height: "100%" }} key={course._id}>
                  <Paper
                    sx={{
                      p: 2.5,
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      position: "relative",
                      overflow: "hidden",
                      height: "100%",
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
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
                        <Box
                          sx={{
                            p: 1.25,
                            borderRadius: "10px",
                            background: `${color}20`,
                            color: color,
                            mr: 1.5,
                            flexShrink: 0,
                          }}
                        >
                          <MenuBookIcon sx={{ fontSize: "1.25rem" }} />
                        </Box>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 700,
                              color: color,
                              letterSpacing: "0.3px",
                              fontSize: "0.8rem",
                              mb: 0.25,
                            }}
                          >
                            {course.code}
                          </Typography>
                          <Tooltip title={course.title} placement="top" arrow>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                fontWeight: 600, 
                                fontSize: "0.95rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                cursor: "default",
                              }}
                            >
                              {course.title}
                            </Typography>
                          </Tooltip>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(course)}
                          sx={{ 
                            "&:hover": { 
                              color: "var(--primary)",
                              backgroundColor: "rgba(0, 0, 0, 0.04)",
                            }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(course._id)}
                          disabled={deleteCourseMutation.isPending}
                          sx={{ 
                            "&:hover": { 
                              color: "error.main",
                              backgroundColor: "rgba(211, 47, 47, 0.04)",
                            }
                          }}
                        >
                          {deleteCourseMutation.isPending ? (
                            <CircularProgress size={20} />
                          ) : (
                            <DeleteIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <TablePagination
              component="div"
              count={totalCourses}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 20, 30, 40]}
              labelRowsPerPage={t("admin.pagination.rowsPerPage")}
              dir="ltr"
            />
          </Box>
        </>
      )}

      {/* Add/Edit Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
          {editingCourse ? t("admin.courses.editCourse") : t("admin.courses.addCourse")}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 0 }}>
            <IconInputField
              icon={<CodeIcon />}
              label={t("admin.courses.courseCode")}
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
              placeholder="e.g., CS101"
              sx={{ mb: 3 }}
            />

            <IconInputField
              icon={<TitleIcon />}
              label={t("admin.courses.courseTitle")}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g., Introduction to Computer Science"
              sx={{ mb: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              minWidth: 100,
            }}
          >
            {t("admin.courses.cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={createCourseMutation.isPending || editCourseMutation.isPending}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              minWidth: 100,
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
            }}
          >
            {createCourseMutation.isPending || editCourseMutation.isPending ? (
              <CircularProgress size={20} />
            ) : editingCourse ? (
              t("admin.courses.update")
            ) : (
              t("admin.courses.create")
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setCourseToDelete(null);
        }}
        onConfirm={confirmDeleteCourse}
        title={t("admin.courses.deleteTitle")}
        message={t("admin.courses.deleteMessage")}
        type="confirm"
        confirmColor="error"
        confirmText={t("common.delete")}
      />
    </Box>
  );
};

export default CoursesSection;
