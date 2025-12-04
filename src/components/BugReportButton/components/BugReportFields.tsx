import React from "react";
import { TextField } from "@mui/material";
import type { TFunction } from "i18next";

type BugReportFieldsProps = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  t: TFunction;
};

export const BugReportFields: React.FC<BugReportFieldsProps> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  t,
}) => (
  <>
    <TextField
      label={t("bugReport.titleLabel")}
      placeholder={t("bugReport.titlePlaceholder")}
      value={title}
      onChange={(e) => onTitleChange(e.target.value)}
      fullWidth
      required
      variant="outlined"
    />

    <TextField
      label={t("bugReport.descriptionLabel")}
      placeholder={t("bugReport.descriptionPlaceholder")}
      value={description}
      onChange={(e) => onDescriptionChange(e.target.value)}
      fullWidth
      required
      multiline
      rows={4}
      variant="outlined"
    />
  </>
);

