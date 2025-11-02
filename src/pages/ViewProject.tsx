import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DownloadIcon from "@mui/icons-material/Download";
import GitHubIcon from "@mui/icons-material/GitHub";
import { generatePlaceholderProjects } from "../utils/helperfunctions";

const ViewProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const projects = generatePlaceholderProjects();
  const [liked, setLiked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  //always start for the top when projectId changes
  useEffect(() => {
    setCurrentIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [projectId]);

  // Find the project based on the projectId from the URL
  const project = projects.find((p) => p.id === Number(projectId));

  if (!project) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography color="error" variant="h5">
          Project not found.
        </Typography>
      </Box>
    );
  }
  // Prepare media array combining images and videos
  const media = useMemo(() => {
    const imgs = (project.images || []).map((src) => ({
      type: "image" as const,
      src,
    }));
    const vids = (project.videos || []).map((src) => ({
      type: "video" as const,
      src,
    }));
    return [...imgs, ...vids];
  }, [project]);

  // Prepare project files array
  const projectFiles = (project.images || []).map((src) => ({
    name: src.split("/").pop() || src,
    url: src,
  }));

  // Get recommended projects excluding the current one
  const recommendedProjects = useMemo(() => {
    const others = projects.filter((p) => p.id !== project.id);
    return others.sort(() => 0.5 - Math.random()).slice(0, 6);
  }, [project.id]);

  const handleProjectClick = (id: number) => {
    navigate(`/projects/${id}`);
    window.scrollTo(0, 0);
    setTimeout(() => window.location.reload(), 100);
  };

  // Media navigation handlers
  const nextMedia = () =>
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  const prevMedia = () =>
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAF2E6 0%, #ffeef5 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: 8,
      }}
    >
      {/* Title & Description */}
      <Typography
        variant="h3"
        sx={{
          mt: 5,
          mb: 1,
          fontWeight: "bold",
          color: "#8b3f7f",
          textAlign: "center",
        }}
      >
        {project.title}
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ textAlign: "center", maxWidth: 600, mb: 4 }}
      >
        {project.description}
      </Typography>

      {/* MEDIA CAROUSEL */}
      {media.length > 0 && (
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

            {/* INDIVIDUAL MEDIA ITEM */}
            {media.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: "0 0 100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* MEDIA CONTENT */}
                <Box
                  sx={{
                    width: "90%",
                    height: { xs: 240, sm: 400, md: 480 },
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                  }}
                >
                  {/* IMAGE OR VIDEO */}
                  {item.type === "image" ? (
                    <CardMedia
                      component="img"
                      image={item.src}
                      alt={`media-${idx}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
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
              left: 20,
              color: "#8b3f7f",
              background: "rgba(255,255,255,0.7)",
              "&:hover": { background: "rgba(255,255,255,0.9)" },
              zIndex: 5,
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={nextMedia}
            sx={{
              position: "absolute",
              right: 20,
              color: "#8b3f7f",
              background: "rgba(255,255,255,0.7)",
              "&:hover": { background: "rgba(255,255,255,0.9)" },
              zIndex: 5,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}

      {/* PROJECT INFO */}
      <Card
        sx={{
          mt: 6,
          width: "90%",
          maxWidth: "900px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #ffcfe6 0%, #ffe4f2 100%)",
          color: "#6a2c68",
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" fontWeight="bold">
              Project Info
            </Typography>
            <IconButton onClick={() => setLiked((prev) => !prev)}>
              {liked ? <StarIcon sx={{ color: "#8b3f7f" }} /> : <StarBorderIcon />}
            </IconButton>
          </Box>

          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Course:</strong> {project.course || "—"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Team Members:</strong>{" "}
            {(project.teamMembers || []).join(", ") || "—"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Description:</strong> {project.description}
          </Typography>

          {project.githubRepo && (
            <Box
              display="flex"
              alignItems="center"
              mt={1}
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                gap: 1,
              }}
              onClick={() => window.open(project.githubRepo, "_blank")}
            >
              <GitHubIcon sx={{ fontSize: 23,mt:0.5 }} />
              <Typography sx={{fontSize: 15, mt:0.5}} variant="body2">Click to view GitHub Repo</Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* PROJECT FILES */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#ffd6e8",
          mt: 8,
          py: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 4, color: "#8b3f7f", fontWeight: "bold" }}
        >
          Project Files
        </Typography>

        <Paper
          elevation={3}
          sx={{
            width: "90%",
            maxWidth: "800px",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "rgba(255,255,255,0.6)",
          }}
        >
          {projectFiles.length > 0 ? (
            projectFiles.map((file, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={3}
                py={2}
                borderBottom={
                  i < projectFiles.length - 1 ? "1px solid #f2b6d0" : "none"
                }
              >
                <Typography color="text.primary">{file.name}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  sx={{
                    color: "#8b3f7f",
                    borderColor: "#e598b6",
                    "&:hover": { borderColor: "#8b3f7f" },
                  }}
                  href={file.url}
                  download
                >
                  Download
                </Button>
              </Box>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", p: 3, color: "#6a2c68" }}>
              No files available for download.
            </Typography>
          )}
        </Paper>
      </Box>

      {/* RECOMMENDED PROJECTS */}
      {recommendedProjects.length > 0 && (
        <Box
          sx={{
            width: "90%",
            maxWidth: "1200px",
            mt: 10,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              width: "100%",
              mb: 2,
              color: "#8b3f7f",
              fontWeight: "bold",
            }}
          >
            Recommended Projects
          </Typography>

          {recommendedProjects.map((proj) => (
            <Card
              key={proj.id}
              onClick={() => handleProjectClick(proj.id)}
              sx={{
                cursor: "pointer",
                flex: "1 1 30%",
                minWidth: "280px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #ffcfe6 0%, #ffe4f2 100%)",
                color: "#6a2c68",
                boxShadow: 2,
                overflow: "hidden",
                transition: "0.3s",
                "&:hover": { boxShadow: 5 },
              }}
            >
              {proj.images && proj.images[0] && (
                <CardMedia
                  component="img"
                  height="180"
                  image={proj.images[0]}
                  alt={proj.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {proj.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                  {proj.course}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {proj.description?.slice(0, 80) || ""}...
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ViewProject;
