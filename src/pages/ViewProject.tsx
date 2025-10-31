import { Box, IconButton, Typography } from "@mui/material";
import { generatePlaceholderProjects } from "../utils/helperfunctions";
import { useParams } from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";



const ViewProject = () => {
  const { projectId } = useParams();
  const [isFavourite, setIsFavourite] = useState(false);

  const projects = generatePlaceholderProjects();
  const project = projects.find(p => p.id === Number(projectId));


  if (!project) {
    return (
      <Box sx={{ width: "98%", p: 2 }}>
        <Typography variant="h5" color="error">
          Project not found.
        </Typography>
      </Box>
    );


  }
  return (
    <Box sx={{ width: "95%", p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
        <Box
          sx={{
            ml: 3,
            mt: 3,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.25)",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.35)",
            },
          }}
        >
          <img
            src={project.image}
            alt="Project"
            style={{
              display: "block",
              width: "375px",
              height: "375px",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box sx={{ flex: 1, mt: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
              {project.title || "Project Title"}
            </Typography>
            <IconButton
              onClick={() => setIsFavourite(!isFavourite)}
              sx={{
                color: isFavourite ? "#FFD700" : "rgba(0, 0, 0, 0.4)",
                transition: "color 0.3s ease",
              }}
            >
              {isFavourite ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Box>

          <Typography variant="h6" sx={{ mt: 1, mb: 1, opacity: 0.6 }}>
            {project.course || "Course Name"}
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.6, mb: 3 }}>
            {"Project Description"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 5, ml: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Details
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Title
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {"Blah blah blah proper name place name backstory stuff "}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Project Description
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {"Blah blah blah proper name place name backstory stuff "}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Team Members
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {"Blah blah blah proper name place name backstory stuff"}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Github Repo
        </Typography>
        <Typography>
          {"Blah blah blah proper name place name backstory stuff"}
        </Typography>
      </Box>
    </Box>
  );
};





export default ViewProject;