import { Box, Typography } from "@mui/material";
import { t } from "i18next";

interface Props {
  technologies?: string[];
  tags?: string[];
}

const ProjectFilesSection = ({ technologies = [], tags = [] }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--background-lighter)",
        mt: 8,
        py: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "40vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          color: "var(--text-primary)",
          fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {t("viewProject.technologies")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1.5,
          mb: 6,
          maxWidth: "800px",
        }}
      >
        {technologies.length > 0 ? (
          technologies.map((tech, i) => (
            <Box
              key={i}
              sx={{
                px: 2.5,
                py: 1,
                borderRadius: "20px",
                backgroundColor: "var(--background-light)",
                color: "var(--text-primary)",
                fontWeight: 300,
                fontSize: "0.95rem",
                fontFamily: "'Poppins'",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.07)",
              }}
            >
              {tech}
            </Box>
          ))
        ) : (
          <Typography
            sx={{ color: "var(--text-primary)", fontFamily: "'Poppins', sans-serif" }}
          >
            {t("viewProject.notechnology")}
          </Typography>
        )}
      </Box>

      <Typography
        variant="h5"
        sx={{
          mb: 2,
          color: "var(--text-primary)",
          fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {t("viewProject.tags")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1.5,
          maxWidth: "800px",
        }}
      >
        {tags.length > 0 ? (
          tags.map((tag, i) => (
            <Box
              key={i}
              sx={{
                px: 2,
                py: 1,
                borderRadius: "20px",
                backgroundColor: "var(--background-light)",
                color: "var(--text-primary)",
                fontWeight: 300,
                fontSize: "0.9rem",
                fontFamily: "'Poppins'",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              {tag}
            </Box>
          ))
        ) : (
          <Typography
            sx={{ color: "var(--text-primary)", fontFamily: "'Poppins', sans-serif" }}
          >
            {t("viewProject.notags")}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProjectFilesSection;
