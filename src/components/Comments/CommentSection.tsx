import { useState } from "react";
import {
  Box,
  Avatar,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/authAtom";
import type { User } from "../../types";
import { useTranslation } from "react-i18next";
import "@fontsource/poppins/700.css";
import { useComments, useDeleteComment, useCreateComment } from "../../hooks/useComments";
import LoadingState from "../LoadingState/LoadingState";
import { useToastContext } from "../../contexts/ToastContext";

export default function CommentSection({ projectId }: { projectId: string }) {
  const { t } = useTranslation();
  const [user] = useAtom<User | null>(userAtom);
  const { showSuccess } = useToastContext();
  const [commentText, setCommentText] = useState("");
  const { data: comments, isLoading } = useComments(projectId);
  const commentsData = comments ?? [];
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const getInitials = (firstName?: string, lastName?: string) => {
    const firstInitial = firstName?.[0]?.toUpperCase() || "";
    const lastInitial = lastName?.[0]?.toUpperCase() || "";
    return `${firstInitial}.${lastInitial}` || "U";
  };

  const handleAddComment = () => {
    if (!user || commentText.trim() === "") return;

    createComment.mutate({
      content: commentText,
      projectId,
      userId: user._id || "",
      authorFirstName: user.firstName || "",
      authorLastName: user.lastName || "",
      authorEmail: user.email,
    });
    setCommentText("");
    showSuccess(t("viewProject.commentAdded"));
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setSelectedCommentId(id);
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setSelectedCommentId(null);
  };

  const handleDelete = () => {
    if (!selectedCommentId) return;

    deleteComment.mutate({ id: selectedCommentId, projectId });
    closeMenu();
    showSuccess(t("viewProject.commentDeleted"));
  };

  if (isLoading) return <LoadingState />;

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 2, px: { xs: 1, sm: 2 } }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        {t("viewProject.comments")}
      </Typography>

      {user ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            placeholder={t("viewProject.addComment")}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            multiline
            minRows={1}
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          />
          <Button
            variant="contained"
            onClick={handleAddComment}
            disabled={commentText.trim() === ""}
            sx={{
              mt: { xs: 1, sm: 0 },
              bgcolor: commentText.trim() === "" ? "var(--text-secondary)" : "var(--accent)",
              color: "white",
              width: { xs: "100%", sm: 80 },
              height: 40,
              flexShrink: 0,
            }}
          >
            {t("viewProject.Post")}
          </Button>
        </Box>
      ) : (
        <Typography
          color="text.secondary"
          sx={{ mb: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
        >
          {t("viewProject.loginToComment")}
        </Typography>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {commentsData.map((comment) => (
          <Card key={comment._id} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ display: "flex", gap: 1, py: 1 }}>
              <Avatar
                sx={{
                  bgcolor: "var(--accent)",
                  fontWeight: 700,
                  fontFamily: "Poppins",
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                  fontSize: { xs: "0.75rem", sm: "1rem" },
                }}
              >
                {getInitials(comment.authorFirstName, comment.authorLastName)}
              </Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                  {comment.authorFirstName} {comment.authorLastName}
                </Typography>
                <Typography
                  sx={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  }}
                >
                  {comment.content}
                </Typography>
              </Box>

              {user?._id === comment.userId && (
                <IconButton onClick={(e) => openMenu(e, comment._id)} sx={{ p: 0, ml: 1 }}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
        <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
          {t("viewProject.delete")}
        </MenuItem>
      </Menu>
    </Box>
  );
}
