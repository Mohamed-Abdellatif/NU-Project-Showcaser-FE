import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
  TablePagination,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import { useAdminSuggestions, useAdminDeleteSuggestion } from "../../hooks/useAdmin";
import { useState } from "react";
import LoadingState from "../LoadingState/LoadingState";
import ErrorState from "../ErrorState/ErrorState";
import EmptyResults from "../EmptyResults/EmptyResults";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import type { SuggestionFilters } from "../../api/adminApi";

const SuggestionsSection = () => {
  const { t } = useTranslation();

  // Filters state
  const [filters, setFilters] = useState<SuggestionFilters>({
    page: 1,
    limit: 5,
    title: "",
    description: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const { data: suggestionsData, isLoading, isError } = useAdminSuggestions(filters);
  const deleteSuggestionMutation = useAdminDeleteSuggestion();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [suggestionToDelete, setSuggestionToDelete] = useState<string | null>(null);

  // Image modal state
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      page: 1,
    }));
  };

  const handleApplyFilters = () => {
    setFilters({ ...tempFilters, page: 1 });
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      page: 1,
      limit: filters.limit,
      title: "",
      description: "",
    };
    setTempFilters(clearedFilters);
    setFilters(clearedFilters);
  };

  const handleDeleteSuggestion = (suggestionId: string) => {
    setSuggestionToDelete(suggestionId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteSuggestion = async () => {
    if (!suggestionToDelete) return;

    setDeletingId(suggestionToDelete);
    try {
      await deleteSuggestionMutation.mutateAsync(suggestionToDelete);

      // If we just deleted the last item on the current page (and we're not on the first page),
      // navigate to the previous page
      if (suggestions.length === 1 && filters.page && filters.page > 1) {
        setFilters((prev) => ({ ...prev, page: (prev.page || 2) - 1 }));
      }
    } catch (error) {
      console.error("Error deleting suggestion:", error);
    } finally {
      setSuggestionToDelete(null);
      setDeletingId(null);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage("");
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil((diffTime - 2 * 60 * 60 * 1000) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (isLoading) {
    return <LoadingState message="Loading suggestions..." />;
  }

  if (isError) {
    return <ErrorState error={new Error("Failed to load suggestions. Please try again later.")} />;
  }

  const suggestions = suggestionsData?.data || [];
  const pagination = suggestionsData?.pagination || { page: 1, limit: 5, total: 0, totalPages: 0 };

  if (suggestions.length === 0 && !filters.title && !filters.description) {
    return (
      <EmptyResults
        message="admin.suggestions.noSuggestions"
        icon={<LightbulbIcon sx={{ fontSize: 80, color: "var(--secondary)", opacity: 0.3 }} />}
        subtitle="User suggestions and feedback will appear here"
      />
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "var(--text)" }}>
          {t("admin.sidebar.suggestions")}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "var(--secondary)" }}>
            {pagination.total} {t("admin.suggestions.total", "Total Suggestions")}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(!showFilters)}
            sx={{ textTransform: "none" }}
          >
            {t("admin.suggestions.filters", "Filters")}
          </Button>
        </Box>
      </Box>

      {/* Filters Section */}
      {showFilters && (
        <Paper sx={{ p: 3, mb: 3, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                fullWidth
                label={t("admin.suggestions.filterTitle", "Title")}
                value={tempFilters.title}
                onChange={(e) => setTempFilters({ ...tempFilters, title: e.target.value })}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                fullWidth
                label={t("admin.suggestions.filterDescription", "Description")}
                value={tempFilters.description}
                onChange={(e) => setTempFilters({ ...tempFilters, description: e.target.value })}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button
                variant="contained"
                onClick={handleApplyFilters}
                fullWidth
                sx={{
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                  textTransform: "none",
                }}
              >
                {t("admin.suggestions.applyFilters", "Apply")}
              </Button>
              <IconButton onClick={handleClearFilters} size="small" sx={{ flexShrink: 0 }}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      )}

      {suggestions.length === 0 ? (
        <EmptyResults
          message="admin.suggestions.noResults"
          subtitle="Try adjusting your filters"
        />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {suggestions.map((suggestion) => (
            <Paper
              key={suggestion._id}
              sx={{
                p: 3,
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                {/* Suggestion Image */}
                {suggestion.images && suggestion.images.length > 0 && (
                  <Box
                    onClick={() => handleImageClick(suggestion?.images?.[0] || "")}
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "12px",
                      overflow: "hidden",
                      flexShrink: 0,
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <img
                      src={suggestion.images[0]}
                      alt={suggestion.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </Box>
                )}

                {/* Suggestion Content */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
                      <LightbulbIcon sx={{ color: "var(--primary)", fontSize: 24 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {suggestion.title}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteSuggestion(suggestion._id)}
                      disabled={deletingId === suggestion._id}
                      sx={{
                        color: "error.main",
                        "&:hover": { backgroundColor: "error.lighter" },
                      }}
                    >
                      {deletingId === suggestion._id ? (
                        <CircularProgress size={20} />
                      ) : (
                        <DeleteIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Box>

                  <Typography variant="body1" sx={{ color: "var(--text)", mb: 2 }}>
                    {suggestion.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                    <Typography variant="caption" sx={{ color: "var(--secondary)" }}>
                      {formatDate(suggestion.createdAt)}
                    </Typography>
                    {suggestion.updatedAt && suggestion.updatedAt !== suggestion.createdAt && (
                      <Chip
                        label="Updated"
                        size="small"
                        sx={{ height: 20, fontSize: "0.7rem" }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* Pagination */}
      {suggestions.length > 0 && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Paper sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={pagination.total}
              rowsPerPage={pagination.limit}
              page={pagination.page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={t("admin.suggestions.rowsPerPage", "Rows per page:")}
            />
          </Paper>
        </Box>
      )}

      {/* Image Modal */}
      <Dialog
        open={imageModalOpen}
        onClose={handleCloseImageModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {t("admin.suggestions.imagePreview", "Image Preview")}
          <IconButton onClick={handleCloseImageModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Suggestion"
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSuggestionToDelete(null);
        }}
        onConfirm={confirmDeleteSuggestion}
        title={t("admin.suggestions.deleteTitle", "Delete Suggestion")}
        message={t("admin.suggestions.deleteMessage", "Are you sure you want to delete this suggestion? This action cannot be undone.")}
        type="confirm"
        confirmColor="error"
        confirmText={t("common.delete", "Delete")}
      />
    </Box>
  );
};

export default SuggestionsSection;
