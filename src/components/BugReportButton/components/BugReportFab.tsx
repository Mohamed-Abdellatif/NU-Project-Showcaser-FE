import React from "react";
import { Fab, type FabProps } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";

type BugReportFabProps = Pick<FabProps, "aria-label" | "onClick" | "sx"> & {
  color?: FabProps["color"];
};

export const BugReportFab: React.FC<BugReportFabProps> = ({
  "aria-label": ariaLabel,
  onClick,
  sx,
  color = "error",
}) => (
  <Fab aria-label={ariaLabel} onClick={onClick} sx={sx} color={color}>
    <BugReportIcon />
  </Fab>
);

