import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Box, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import CloseIcon from "@mui/icons-material/Close";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";
import { useCreateSuggestion } from "../../hooks/useSuggestions";
import { useToastContext } from "../../contexts/ToastContext";
import { MarkerArea } from "markerjs3";
import { BugReportFab } from "./components/BugReportFab";
import { BugReportFields } from "./components/BugReportFields";
import { ScreenshotSection } from "./components/ScreenshotSection";
import { BugReportActions } from "./components/BugReportActions";
import { useUploadSuggestionImage } from "../../hooks/useMedia";

const BugReportButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const markerAreaRef = useRef<MarkerArea | null>(null);
  const markerHandlersRef = useRef<{
    render?: (event: any) => void;
    close?: () => void;
  }>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadSuggestionImage = useUploadSuggestionImage();
  const createSuggestion = useCreateSuggestion();
  const { showSuccess, showError } = useToastContext();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Cleanup MarkerArea on unmount or when dialog closes
  useEffect(() => {
    return () => {
      cleanupMarkerArea();
    };
  }, []);

  const detachMarkerListeners = () => {
    const markerArea = markerAreaRef.current;
    if (!markerArea) return;

    if (markerHandlersRef.current.render) {
      markerArea.removeEventListener(
        "render",
        markerHandlersRef.current.render
      );
    }
    if (markerHandlersRef.current.close) {
      markerArea.removeEventListener("close", markerHandlersRef.current.close);
    }

    markerHandlersRef.current = {};
  };

  const cleanupMarkerArea = () => {
    const markerArea = markerAreaRef.current;
    if (!markerArea) return;

    detachMarkerListeners();
    try {
      markerArea.close();
    } catch {
      // Ignore errors from closing already disposed instances
    }
    markerAreaRef.current = null;
    setIsAnnotating(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setScreenshot(null);
    setIsAnnotating(false);
    setIsCapturing(false);
    cleanupMarkerArea();
  };

  const handleScreenshotClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveScreenshot = () => {
    setScreenshot(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setScreenshot(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptureScreenshot = async () => {
    if (isCapturing) return;

    try {
      setIsCapturing(true);
      await new Promise((resolve) =>
        requestAnimationFrame(() => resolve(null))
      );
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        logging: false,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });
      const dataUrl = canvas.toDataURL("image/png");
      setScreenshot(dataUrl);
    } catch (error) {
      showError(t("bugReport.captureError"));
    } finally {
      setIsCapturing(false);
    }
  };

  const handleAnnotate = () => {
    if (!screenshot || !imageRef.current) return;

    // Wait for image to be fully loaded
    if (!imageRef.current.complete) {
      imageRef.current.onload = () => {
        imageRef.current && (imageRef.current.onload = null);
        initializeMarkerArea();
      };
      return;
    }

    initializeMarkerArea();
  };

  const initializeMarkerArea = () => {
    const imgElement = imageRef.current;
    if (!imgElement) {
      setIsAnnotating(false);
      return;
    }

    setIsAnnotating(true);

    cleanupMarkerArea();

    // Ensure image is loaded and in DOM
    const startAnnotation = () => {
      if (!imgElement || !imgElement.complete) {
        setIsAnnotating(false);
        showError(t("bugReport.annotationNotReady"));
        return;
      }

      try {
        // Create MarkerArea instance
        const markerArea = new MarkerArea(imgElement);
        // Fix blurry annotation output & default annotation settings
        type ExtendedMarkerArea = MarkerArea & { renderImageSize?: "original" };
        (markerArea as ExtendedMarkerArea).renderImageSize = "original";
        markerArea.targetRoot = document.body;
        markerArea.settings.defaultStrokeWidth = 4;
        const settings = markerArea.settings as typeof markerArea.settings & {
          defaultColorSet:
          | typeof markerArea.settings.defaultColorSet
          | "default";
        };
        settings.defaultColorSet = "default" as typeof settings.defaultColorSet;
        markerArea.uiStyleSettings.zIndex = "1600";
        markerArea.settings.displayMode = "popup";
        markerAreaRef.current = markerArea;

        // Handle render event - get the annotated image
        const handleRender = (event: any) => {
          const dataUrl = event?.dataUrl || event?.detail?.dataUrl;
          if (dataUrl) {
            setScreenshot(dataUrl);
          }
          markerArea.close();
        };

        // Handle close event
        const handleClose = () => {
          setIsAnnotating(false);
          detachMarkerListeners();
          markerAreaRef.current = null;
        };

        markerHandlersRef.current = {
          render: handleRender,
          close: handleClose,
        };

        markerArea.addEventListener("render", handleRender);
        markerArea.addEventListener("close", handleClose);

        requestAnimationFrame(() => markerArea.show());
      } catch (error) {
        showError(t("bugReport.annotationInitError"));
        setIsAnnotating(false);
        markerAreaRef.current = null;
      }
    };

    // Small delay to ensure DOM is ready
    if (imgElement.complete) {
      setTimeout(startAnnotation, 100);
    } else {
      imgElement.onload = () => {
        imgElement.onload = null;
        setTimeout(startAnnotation, 100);
      };
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      showError(t("bugReport.requiredFieldsError"));
      return;
    }

    try {
      let imageUrls: string[] = [];

      // Upload screenshot if available
      if (screenshot) {
        // Convert data URL to blob
        const response = await fetch(screenshot);
        const blob = await response.blob();
        const file = new File([blob], "bug-screenshot.png", {
          type: "image/png",
        });

        setIsUploading(true);
        const uploadResponse = await uploadSuggestionImage.mutateAsync(file);
        setIsUploading(false);
        imageUrls = [uploadResponse.url];
      }

      // Create suggestion
      await createSuggestion.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        images: imageUrls.length > 0 ? imageUrls : undefined,
      });

      showSuccess(t("bugReport.submitSuccess"));
      handleClose();
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : t("bugReport.submitError")
      );
    }
  };

  const isSubmitDisabled =
    createSuggestion.isPending || isUploading || !title.trim() || !description.trim();

  return (
    <>
      <BugReportFab
        aria-label={t("bugReport.fabLabel")}
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: "10%",
          left: 24,
          transform: "translateY(50%)",
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        sx={{
          "& .MuiDialog-paper": {
            transform: "none !important",
            visibility: isCapturing ? "hidden" : "visible",
          },
          ...(isCapturing && {
            "& .MuiBackdrop-root": {
              backgroundColor: "transparent",
            },
          }),
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            fontFamily: "'Poppins', sans-serif",
          },
        }}
        slotProps={{
          backdrop: isCapturing
            ? {
              sx: {
                backgroundColor: "transparent",
              },
            }
            : undefined,
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BugReportIcon color="error" />
            <Typography variant="h6" fontWeight={600}>
              {t("bugReport.dialogTitle")}
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <BugReportFields
              title={title}
              description={description}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              t={t}
            />

            <ScreenshotSection
              screenshot={screenshot}
              isCapturing={isCapturing}
              isAnnotating={isAnnotating}
              onCapture={handleCaptureScreenshot}
              onUploadClick={handleScreenshotClick}
              onAnnotate={handleAnnotate}
              onRemove={handleRemoveScreenshot}
              onFileChange={handleFileChange}
              fileInputRef={fileInputRef}
              imageRef={imageRef}
              t={t}
            />
          </Box>
        </DialogContent>

        <BugReportActions
          onCancel={handleClose}
          onSubmit={handleSubmit}
          disableCancel={createSuggestion.isPending}
          disableSubmit={isSubmitDisabled}
          isSubmitting={createSuggestion.isPending}
          isImageUploading={isUploading}
          t={t}
        />
      </Dialog>
    </>
  );
};

export default BugReportButton;
