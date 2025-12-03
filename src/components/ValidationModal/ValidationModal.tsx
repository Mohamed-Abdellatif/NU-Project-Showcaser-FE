import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useTranslation } from "react-i18next";

export interface ValidationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success";
  loading?: boolean;
}

const ValidationModal: React.FC<ValidationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  confirmColor = "error",
  loading = false,
}) => {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="validation-dialog-title"
      aria-describedby="validation-dialog-description"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          fontFamily: "'Poppins', sans-serif",
        },
      }}
    >
      <DialogTitle
        id="validation-dialog-title"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          pb: 1,
          fontWeight: 600,
        }}
      >
        <WarningAmberIcon color="warning" />
        {title || t("validationModal.title", "Are you sure?")}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <DialogContentText
            id="validation-dialog-description"
            sx={{
              fontSize: "1rem",
              color: "text.primary",
              lineHeight: 1.6,
            }}
          >
            {message}
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          variant="outlined"
          color="inherit"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            minWidth: 100,
          }}
        >
          {cancelText || t("validationModal.cancel", "Cancel")}
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={loading}
          variant="contained"
          color={confirmColor}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            minWidth: 100,
          }}
        >
          {confirmText || t("validationModal.confirm", "Confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ValidationModal;
