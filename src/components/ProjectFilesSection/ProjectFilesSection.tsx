import { Box, Typography, Paper, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { t } from "i18next";
interface ProjectFile {
  name: string;
  url: string;
}

interface ProjectFilesSectionProps {
  projectFiles: ProjectFile[];
}

const ProjectFilesSection = ({ projectFiles }: ProjectFilesSectionProps) => {
  return (
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
        sx={{ mb: 4, color: "#8b3f7f", fontWeight: "bold" }}>
        {t("viewProject.projectFiles")}
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
                {t("viewProject.download")}
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
  );
};

export default ProjectFilesSection;
