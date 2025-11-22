import { useState, useCallback } from "react";
import type { Toast, ToastType } from "../components/Toast/Toast";

let toastIdCounter = 0;

const generateToastId = (): string => {
    return `toast-${Date.now()}-${toastIdCounter++}`;
};

export const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        const newToast: Toast = {
            id: generateToastId(),
            message,
            type,
        };

        setToasts((prev) => [...prev, newToast]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showSuccess = useCallback((message: string) => {
        showToast(message, "success");
    }, [showToast]);

    const showError = useCallback((message: string) => {
        showToast(message, "danger");
    }, [showToast]);

    const showWarning = useCallback((message: string) => {
        showToast(message, "warning");
    }, [showToast]);

    const showInfo = useCallback((message: string) => {
        showToast(message, "info");
    }, [showToast]);

    return {
        toasts,
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeToast,
    };
};

