import React from "react";
import {
  Box,
  Button,
  Typography,
  type ButtonProps,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import type { TFunction } from "i18next";

type ScreenshotSectionProps = {
  screenshot: string | null;
  isCapturing: boolean;
  isAnnotating: boolean;
  onCapture: ButtonProps["onClick"];
  onUploadClick: () => void;
  onAnnotate: ButtonProps["onClick"];
  onRemove: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  imageRef: React.MutableRefObject<HTMLImageElement | null>;
  t: TFunction;
};

export const ScreenshotSection: React.FC<ScreenshotSectionProps> = ({
  screenshot,
  isCapturing,
  isAnnotating,
  onCapture,
  onUploadClick,
  onAnnotate,
  onRemove,
  onFileChange,
  fileInputRef,
  imageRef,
  t,
}) => (
  <Box>
    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
      {t("bugReport.screenshotLabel")}
    </Typography>
    <Box sx={{ display: "flex", gap: 1, mb: screenshot ? 2 : 0 }}>
      <Button
        variant="outlined"
        startIcon={<CameraAltIcon />}
        onClick={onCapture}
        fullWidth
        disabled={isCapturing}
      >
        {isCapturing
          ? t("bugReport.capturing")
          : t("bugReport.captureButton")}
      </Button>
      <Button variant="outlined" onClick={onUploadClick} fullWidth>
        {t("bugReport.uploadButton")}
      </Button>
    </Box>
    {screenshot && (
      <Box sx={{ position: "relative" }}>
        <img
          ref={imageRef}
          data-markerjs="image"
          src={screenshot}
          alt={t("bugReport.altText")}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        />
        <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={onAnnotate}
            disabled={isAnnotating}
          >
            {isAnnotating
              ? t("bugReport.annotating")
              : t("bugReport.annotateButton")}
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={onRemove}
          >
            {t("bugReport.removeButton")}
          </Button>
        </Box>
      </Box>
    )}
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      onChange={onFileChange}
    />
  </Box>
);

