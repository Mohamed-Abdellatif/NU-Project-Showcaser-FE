import React from "react";
import { Button, DialogActions } from "@mui/material";
import type { TFunction } from "i18next";

type BugReportActionsProps = {
  onCancel: () => void;
  onSubmit: () => void;
  disableCancel: boolean;
  disableSubmit: boolean;
  isSubmitting: boolean;
  t: TFunction;
};

export const BugReportActions: React.FC<BugReportActionsProps> = ({
  onCancel,
  onSubmit,
  disableCancel,
  disableSubmit,
  isSubmitting,
  t,
}) => (
  <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
    <Button
      onClick={onCancel}
      disabled={disableCancel}
      variant="outlined"
      color="inherit"
      sx={{
        textTransform: "none",
        fontWeight: 500,
        minWidth: 100,
      }}
    >
      {t("bugReport.cancelButton")}
    </Button>
    <Button
      onClick={onSubmit}
      disabled={disableSubmit}
      variant="contained"
      color="error"
      sx={{
        textTransform: "none",
        fontWeight: 500,
        minWidth: 100,
      }}
    >
      {isSubmitting ? t("bugReport.submitting") : t("bugReport.submitButton")}
    </Button>
  </DialogActions>
);

