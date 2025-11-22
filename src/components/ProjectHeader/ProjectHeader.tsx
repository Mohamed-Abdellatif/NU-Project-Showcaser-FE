import { Box, Typography, IconButton, CardMedia, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

interface MediaItem {
  type: "image" | "video";
  src: string;
}

interface ProjectHeaderProps {
  title: string;
  media: MediaItem[];
}

export const ProjectHeader = ({ title, media }: ProjectHeaderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  const nextMedia = () =>
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  const prevMedia = () =>
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));

  if (!media || media.length === 0) {
    return (
      <>
        <Typography
          variant="h3"
          sx={{ mt: 5, mb: 1, fontWeight: "bold", color: "#6A2C68", textAlign: "center" }}
        >
          {title}
        </Typography>
      </>
    );
  }

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Title & Description */}
      <Typography
        variant="h3"
        sx={{ mt: 5, mb: 1, fontWeight: "bold", color: "#6A2C68", textAlign: "center" }}
      >
        {title}
      </Typography>

      {/* MEDIA CAROUSEL */}
      <Box
        sx={{
          position: "relative",
          width: "95%",
          maxWidth: "1000px",
          overflow: "hidden",
          mt: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* MEDIA SLIDES */}
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.6s cubic-bezier(0.45, 0, 0.55, 1)",
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${media.length * 100}%`,
          }}
        >
          {media.map((item, idx) => (
            <Box
              key={idx}
              sx={{ flex: "0 0 100%", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Box
                sx={{
                  width: "90%",
                  height: { xs: 240, sm: 400, md: 480 },
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                }}
              >
                {item.type === "image" ? (
                  <CardMedia
                    component="img"
                    image={item.src}
                    alt={`media-${idx}`}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <CardMedia
                    component="video"
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ARROWS */}
        <IconButton
          onClick={prevMedia}
          sx={{
            position: "absolute",
            ...(isRTL ? { right: 20 } : { left: 20 }),
            color: "#8b3f7f",
            background: "rgba(255,255,255,0.7)",
            "&:hover": { background: "rgba(255,255,255,0.9)" },
            zIndex: 5,
          }}
        >
          {isRTL ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </IconButton>
        <IconButton
          onClick={nextMedia}
          sx={{
            position: "absolute",
            ...(isRTL ? { left: 20 } : { right: 20 }),
            color: "#8b3f7f",
            background: "rgba(255,255,255,0.7)",
            "&:hover": { background: "rgba(255,255,255,0.9)" },
            zIndex: 5,
          }}
        >
          {isRTL ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};
export default ProjectHeader;