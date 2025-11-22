import { Alert, IconButton, Slide } from "@mui/material";
import {
  Close as CloseIcon,
  CheckCircle,
  Error as ErrorIcon,
  Warning,
  Info,
} from "@mui/icons-material";
import { useEffect } from "react";

export type ToastType = "success" | "danger" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const Toast = ({ toast, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const getSeverity = (
    type: ToastType
  ): "success" | "error" | "warning" | "info" => {
    switch (type) {
      case "success":
        return "success";
      case "danger":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "info";
    }
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle />;
      case "danger":
        return <ErrorIcon />;
      case "warning":
        return <Warning />;
      case "info":
        return <Info />;
      default:
        return <Info />;
    }
  };

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Alert
        dir="ltr"
        severity={getSeverity(toast.type)}
        icon={getIcon(toast.type)}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => onClose(toast.id)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{
          mb: 2,
          minWidth: 300,
          maxWidth: 500,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          "& .MuiAlert-icon": {
            color: toast.type === "info" ? "#616161" : undefined,
          },
          ...(toast.type === "info" && {
            bgcolor: "#f5f5f5",
            color: "#616161",
            "& .MuiAlert-icon": {
              color: "#616161",
            },
          }),
        }}
      >
        {toast.message}
      </Alert>
    </Slide>
  );
};

export default Toast;
