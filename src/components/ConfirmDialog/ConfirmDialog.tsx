import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export type DialogType = "confirm" | "alert" | "error";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: DialogType;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "error" | "warning" | "success";
}

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  type = "confirm",
  confirmText,
  cancelText,
  confirmColor = "primary",
}: ConfirmDialogProps) => {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case "confirm":
        return <WarningAmberIcon sx={{ fontSize: 48, color: "warning.main" }} />;
      case "alert":
        return <InfoIcon sx={{ fontSize: 48, color: "info.main" }} />;
      case "error":
        return <ErrorOutlineIcon sx={{ fontSize: 48, color: "error.main" }} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          pt: 4,
          pb: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          {getIcon()}
          <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--text-primary)" }}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", px: 4, pb: 2 }}>
        <Typography variant="body1" sx={{ color: "var(--text-Secondary)" }}>
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
          px: 4,
          pb: 4,
        }}
      >
        {type !== "alert" && (
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              textTransform: "none",
              minWidth: 100,
              borderRadius: "12px",
            }}
          >
            {cancelText || t("common.cancel", "Cancel")}
          </Button>
        )}
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={confirmColor}
          sx={{
            textTransform: "none",
            minWidth: 100,
            borderRadius: "12px",
          }}
        >
          {confirmText || (type === "alert" ? t("common.ok", "OK") : t("common.confirm", "Confirm"))}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
