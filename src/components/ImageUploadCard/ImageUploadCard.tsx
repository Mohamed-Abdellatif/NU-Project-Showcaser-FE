import {
  Card,
  CardContent,
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import {
  CameraAlt,
  CloudUpload,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface ImageUploadCardProps {
  images: File[];
  onImageUpload: (files: File[]) => void;
  onImageRemove: (index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const ImageUploadCard = ({
  images,
  onImageUpload,
  onImageRemove,
  onDragOver,
  onDrop,
}: ImageUploadCardProps) => {
  const { t, i18n } = useTranslation();
  const currentDir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        onImageUpload(Array.from(target.files));
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
        <Box sx={{ display: "flex", alignItems: "center",  }}>
          <CameraAlt sx={{ color: "#6a1b9a", mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {t("submissionPage.Images")} ({images.length}/10)
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t("submissionPage.thumbnail")}
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
            {t("submissionPage.Drag and drop images here, or click to browse")}
          </Typography>
        </Paper>

        {/* Image Thumbnails */}
        {images.length > 0 && (
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {images.map((img, idx) => (
              <Grid key={idx}>
                <Box
                  sx={{
                    position: "relative",
                    width: 100,
                    height: 100,
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={img.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => onImageRemove(idx)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploadCard;
