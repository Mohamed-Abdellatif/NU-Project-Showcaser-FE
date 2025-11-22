import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ProjectRequestActionProps {
    selectedAction: "accept" | "decline" | null;
    handleActionClick: (action: "accept" | "decline") => void;
}

const ProjectRequestAction = ({ selectedAction, handleActionClick }: ProjectRequestActionProps) => {
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
                    backgroundColor: selectedAction === "accept" ? "#7B1FA2" : "#D5C7E8",
                    color: selectedAction === "accept" ? "#fff" : "#4A2A72",
                    "&:hover": {
                        backgroundColor: selectedAction === "accept" ? "#6A1B9A" : "#C7B6E0",
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
                    backgroundColor: selectedAction === "decline" ? "#7B1FA2" : "#D5C7E8",
                    color: selectedAction === "decline" ? "#fff" : "#4A2A72",
                    "&:hover": {
                        backgroundColor: selectedAction === "decline" ? "#6A1B9A" : "#C7B6E0",
                    },
                }}
            >
                {t("ProjectRequest.decline")}
            </Button>
        </Box>
    );
};

export default ProjectRequestAction;
