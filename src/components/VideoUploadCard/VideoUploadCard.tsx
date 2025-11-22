import {
  Card,
  CardContent,
  Box,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import {
  VideoLibrary,
  CloudUpload,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface VideoUploadCardProps {
  video: File | null;
  onVideoUpload: (files: File[]) => void;
  onVideoRemove: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const VideoUploadCard = ({
    video,
    onVideoUpload,
    onVideoRemove,
    onDragOver,
    onDrop,
}: VideoUploadCardProps) => {
    const { t, i18n } = useTranslation();
    const currentDir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        onVideoUpload(Array.from(target.files));
      }
    };
    input.click();
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <VideoLibrary sx={{ color: "#6a1b9a", mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {t("submissionPage.Videos (optional)")}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t("submissionPage.videoSubtitle")}
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            borderStyle: "dashed",
            borderColor: "#B39DDB",
            borderRadius: 2,
            textAlign: "center",
            p: 3,
            mb: 2,
            cursor: "pointer",
            "&:hover": {
              borderColor: "#6a1b9a",
              bgcolor: "#f3e5f5",
            },
          }}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onClick={handleFileSelect}
        >
                    <CloudUpload sx={{ fontSize: 40, color: "#6a1b9a", mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" dir={currentDir}>
                        {t("submissionPage.Drag and drop video here, or click to browse")}
                    </Typography>
        </Paper>

        {/* Video Thumbnail */}
        {video && (
          <Box
            sx={{
              position: "relative",
              mb: 2,
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <video
              src={URL.createObjectURL(video)}
              style={{
                width: "100%",
                maxHeight: 200,
                objectFit: "cover",
              }}
              controls
            />
            <IconButton
              size="small"
              onClick={onVideoRemove}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoUploadCard;
