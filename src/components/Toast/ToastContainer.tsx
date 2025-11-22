import { Box } from "@mui/material";
import Toast, { type Toast as ToastType } from "./Toast";

interface ToastContainerProps {
    toasts: ToastType[];
    onClose: (id: string) => void;
}

const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
    if (toasts.length === 0) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}
        >
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={onClose} />
            ))}
        </Box>
    );
};

export default ToastContainer;

