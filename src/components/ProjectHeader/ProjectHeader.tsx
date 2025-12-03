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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextMedia = () => {
    if (isTransitioning) return; 
    setIsTransitioning(true);
    
    setCurrentIndex((prev) => {
      const next = prev === media.length - 1 ? 0 : prev + 1;
      return next;
    });
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevMedia = () => {
    if (isTransitioning) return; 
    setIsTransitioning(true);
    
    setCurrentIndex((prev) => {
      const next = prev === 0 ? media.length - 1 : prev - 1;
      return next;
    });
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  if (!media || media.length === 0) {
    return (
      <>
        <Typography
          variant="h3"
          sx={{ mt: 5, mb: 1, fontWeight: "bold", color: "var(--text-primary)", textAlign: "center", textTransform: "uppercase" }}
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
        sx={{ mt: 5, mb: 1, fontWeight: "bold", color: "var(--text-primary)", textAlign: "center", textTransform: "uppercase" }}
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
              sx={{
                flex: "0 0 100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: idx === currentIndex ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  height: { xs: 240, sm: 400, md: 480 },
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                  position: "relative",
                  opacity: isTransitioning && idx === currentIndex ? 0.7 : 1,
                  transition: "opacity 0.6s ease-in-out",
                }}
              >
                {/* Blurred background */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${item.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(20px)",
                    zIndex: 1,
                  }}
                />

                {/* Blue overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    zIndex: 2,
                  }}
                />

                {/* Foreground media */}
                {item.type === "image" ? (
                  <CardMedia
                    component="img"
                    image={item.src}
                    alt={`media-${idx}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      position: "relative",
                      zIndex: 3,
                    }}
                  />
                ) : (
                  <CardMedia
                    component="video"
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "relative",
                      zIndex: 3,
                    }}
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
            color: "#1f2937",
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
            color: "#1f2937",
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