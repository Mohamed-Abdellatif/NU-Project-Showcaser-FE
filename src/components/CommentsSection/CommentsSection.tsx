import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useAdminComments, useAdminDeleteComment } from "../../hooks/useAdmin";
import EmptyResults from "../EmptyResults/EmptyResults";
import LoadingState from "../LoadingState/LoadingState";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

const CommentsSection = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch comments with pagination and filters
  const { data, isLoading, error } = useAdminComments({
    page: page + 1, // API is 1-indexed
    limit,
    content: searchTerm || undefined,
  });

  // Delete comment mutation
  const deleteCommentMutation = useAdminDeleteComment();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (commentId: string) => {
    setCommentToDelete(commentId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteComment = async () => {
    if (!commentToDelete) return;

    try {
      await deleteCommentMutation.mutateAsync(commentToDelete);
      
      // If we just deleted the last item on the current page (and we're not on the first page),
      // navigate to the previous page
      if (comments.length === 1 && page > 0) {
        setPage(page - 1);
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      setCommentToDelete(null);
    }
  };

  const comments = useMemo(() => data?.data || [], [data]);
  const totalComments = data?.pagination?.total || 0;

  // Only show loading state on initial load (no data yet)
  if (isLoading && !data) {
    return <LoadingState />;
  }

  if (error && !data) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{t("admin.comments.errorLoading")}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "var(--text)" }}>
          {t("admin.sidebar.comments")}
        </Typography>
        <TextField
          placeholder={t("admin.comments.search")}
          size="small"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ width: 300 }}
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
      </Box>

      {comments.length === 0 ? (
        <EmptyResults message={t("admin.comments.noComments")} />
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {comments.map((comment) => (
              <Paper
                key={comment._id}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                    <Avatar
                      sx={{
                        background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                        mr: 2,
                      }}
                    >
                      {comment.authorFirstName?.[0].toUpperCase() || "?"}
                      {comment.authorLastName?.[0].toUpperCase() || ""}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {comment.authorFirstName?.toUpperCase()} {comment.authorLastName?.toUpperCase()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "var(--secondary)" }}>
                          • {new Date(comment.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: "var(--secondary)", mb: 1 }}>
                        {t("admin.comments.on")} <strong>{t("admin.comments.project")}</strong>
                      </Typography>
                      <Typography variant="body1" sx={{ color: "var(--text)" }}>
                        {comment.content}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(comment._id)}
                      disabled={deleteCommentMutation.isPending}
                      sx={{
                        color: "error.main",
                        "&:hover": { backgroundColor: "error.lighter" },
                      }}
                    >
                      {deleteCommentMutation.isPending ? <CircularProgress size={20} /> : <DeleteIcon />}
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <TablePagination
              component="div"
              count={totalComments}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              labelRowsPerPage={t("admin.pagination.rowsPerPage")}
              dir="ltr"
            />
          </Box>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setCommentToDelete(null);
        }}
        onConfirm={confirmDeleteComment}
        title={t("admin.comments.deleteTitle", "Delete Comment")}
        message={t("admin.comments.deleteMessage", "Are you sure you want to delete this comment? This action cannot be undone.")}
        type="confirm"
        confirmColor="error"
        confirmText={t("common.delete", "Delete")}
      />
    </Box>
  );
};

export default CommentsSection;
