import { Box, Typography, Select, MenuItem, FormControl, ToggleButton, ToggleButtonGroup } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useTranslation } from "react-i18next";
import type { PaginationInfo } from "../../types";
import { useState } from "react";

interface ResultsHeaderProps {
  pagination: PaginationInfo | undefined;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  itemsPerPageOptions?: number[];
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
}

const ResultsHeader = ({
  pagination,
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [12, 24, 48, 64, 128],
  viewMode = "grid",
  onViewModeChange,
}: ResultsHeaderProps) => {
  const { t } = useTranslation();
  const [internalViewMode, setInternalViewMode] = useState<"grid" | "list">("grid");
  
  const currentViewMode = viewMode ?? internalViewMode;

  const handleViewChange = (
    _: React.MouseEvent<HTMLElement>,
    newView: "grid" | "list" | null
  ) => {
    if (newView !== null) {
      if (onViewModeChange) {
        onViewModeChange(newView);
      } else {
        setInternalViewMode(newView);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {/* Left: Results Count */}
      <Typography
        variant="body1"
        sx={{
          color: "#7A86A0",
          fontFamily: "Inter, Poppins, system-ui, sans-serif",
          fontSize: "0.95rem",
        }}
      >
        {pagination && pagination.total > 0
          ? `${t("projects.pagination.showing")} ${(pagination.page - 1) * pagination.limit + 1} ${t("projects.pagination.to")} ${Math.min(pagination.page * pagination.limit, pagination.total)} ${t("projects.pagination.of")} ${pagination.total} ${t("projects.pagination.results")}`
          : t("projects.noResults")}
      </Typography>

      {/* Right: Per Page Selector and Grid/List Toggle */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Per Page Selector */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#7A86A0",
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              fontSize: "0.9rem",
            }}
          >
            {t("projects.pagination.perPage")}
          </Typography>
          <FormControl
            size="small"
            sx={{
              minWidth: 80,
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(89, 134, 217, 0.2)",
                "&:hover": {
                  border: "1px solid rgba(89, 134, 217, 0.4)",
                },
                "&.Mui-focused": {
                  border: "1px solid var(--accent)",
                },
                "& fieldset": {
                  border: "none",
                },
              },
              "& .MuiSelect-select": {
                py: 1,
                px: 2,
                color: "var(--text-primary)",
                fontFamily: "Inter, Poppins, system-ui, sans-serif",
                fontSize: "0.9rem",
              },
            }}
          >
            <Select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              sx={{
                "& .MuiSelect-icon": {
                  color: "var(--text-primary)",
                },
              }}
            >
              {itemsPerPageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Grid/List Toggle */}
        {onViewModeChange && (
          <ToggleButtonGroup
            value={currentViewMode}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
            sx={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: "20px",
              border: "1px solid rgba(89, 134, 217, 0.2)",
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06)",
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: "20px",
                color: "var(--text-primary)",
                px: 2,
                py: 1,
                "&.Mui-selected": {
                  background: "var(--primary)",
                  color: "#fff",
                  "&:hover": {
                    background: "var(--accent)",
                  },
                },
                "&:hover": {
                  background: "rgba(25, 118, 210, 0.1)",
                },
              },
            }}
          >
            <ToggleButton value="grid" aria-label="grid view">
              <GridViewIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>
    </Box>
  );
};

export default ResultsHeader;

