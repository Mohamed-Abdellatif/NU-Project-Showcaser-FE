import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ProjectRequestActionProps {
  handleActionClick: (action: "accept" | "decline") => void;
}

const ProjectRequestAction = ({
  handleActionClick,
}: ProjectRequestActionProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
      <Button
        variant="contained"
        onClick={() => handleActionClick("accept")}
        sx={{
          px: 4,
          py: 1,
          borderRadius: "12px",
          fontWeight: 600,
          textTransform: "none",
          backgroundColor: "var(--accent)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "var(--primary)",
          },
        }}
      >
        {t("ProjectRequest.accept")}
      </Button>

      <Button
        variant="contained"
        onClick={() => handleActionClick("decline")}
        sx={{
          px: 4,
          py: 1,
          borderRadius: "12px",
          fontWeight: 600,
          textTransform: "none",
          backgroundColor: "#D5C7E8",
          color: "#4A2A72",
          "&:hover": {
            backgroundColor: "#C7B6E0",
          },
        }}
      >
        {t("ProjectRequest.decline")}
      </Button>
    </Box>
  );
};

export default ProjectRequestAction;
