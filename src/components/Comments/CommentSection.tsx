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
    CardContent
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/authAtom";
import type { User } from "../../types";
import { useTranslation } from "react-i18next";
import "@fontsource/poppins/700.css";

interface Comment {
    id: string;
    text: string;
    userFirstName?: string;
    userLastName?: string;
    color?: string;
}

export default function CommentSection() {
    const { t } = useTranslation();
    const [user] = useAtom<User | null>(userAtom);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);


    const getInitials = (firstName?: string, lastName?: string) => {
        const firstInitial = firstName?.[0]?.toUpperCase() || "";
        const lastInitial = lastName?.[0]?.toUpperCase() || "";
        return `${firstInitial}.${lastInitial}` || "U";
    };

    const handleAddComment = () => {
        if (!commentText.trim() || !user) return;


        setComments((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                userFirstName: user.firstName,
                userLastName: user.lastName,
                text: commentText,
                color: "#7B5EAA",
            }
        ]);

        setCommentText("");
    };

    const openMenu = (
        event: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        setSelectedCommentId(id);
        setMenuAnchor(event.currentTarget);
    };

    const closeMenu = () => {
        setMenuAnchor(null);
        setSelectedCommentId(null);
    };

    const handleDelete = () => {
        setComments((prev) => prev.filter((c) => c.id !== selectedCommentId));
        closeMenu();
    };

    return (
        <Box sx={{ width: "85%", maxWidth: "900px", mt: 1, padding: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                {t("viewProject.comments")}
            </Typography>

            {user ? (
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <TextField
                        fullWidth
                        placeholder={t("viewProject.addComment")}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        multiline
                        minRows={1}
                        sx={{ overflow: "auto" }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddComment}
                        sx={{
                            bgcolor: "#8E44AD",
                            width: 80,
                            height: 60,
                            flexShrink: 0,
                        }}
                    >
                        {t("viewProject.Post")}
                    </Button>
                </Box>
            ) : (
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {t("viewProject.loginToComment")}
                </Typography>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {comments.map((comment) => (
                    <Card key={comment.id} sx={{ borderRadius: 3 }}>
                        <CardContent sx={{ display: "flex", gap: 2, py: 1, paddingTop: 2 }}>
                            {/* Only show avatar if comment exists */}
                            <Avatar sx={{ bgcolor: comment.color, fontWeight: 700, fontFamily: 'Poppins' }}>
                                {getInitials(comment.userFirstName, comment.userLastName)}
                            </Avatar>

                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {comment.userFirstName} {comment.userLastName}
                                </Typography>
                                <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                                    {comment.text}
                                </Typography>
                            </Box>
                            {user?.firstName === comment.userFirstName && (
                                <IconButton
                                    onClick={(e) => openMenu(e, comment.id)}
                                    sx={{ height: "fit-content" }}
                                >
                                    <MoreVertIcon />
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
