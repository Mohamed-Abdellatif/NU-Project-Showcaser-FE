import { Box, Button, ToggleButton, ToggleButtonGroup, Switch, FormControlLabel } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import FilterListIcon from "@mui/icons-material/FilterList";
import GlassInput from "../GlassInput/GlassInput";
import { Search as SearchIcon } from "@mui/icons-material";
import { useState } from "react";

interface FiltersRowProps {
  onSearchChange?: (value: string) => void;
  onFiltersClick?: () => void;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  showThemeToggle?: boolean;
  searchValue?: string;
}

const FiltersRow = ({
  onSearchChange,
  onFiltersClick,
  viewMode = "grid",
  onViewModeChange,
  showThemeToggle = false,
  searchValue = "",
}: FiltersRowProps) => {
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange?.(value);
  };

  const handleViewChange = (
    _: React.MouseEvent<HTMLElement>,
    newView: "grid" | "list" | null
  ) => {
    if (newView !== null && onViewModeChange) {
      onViewModeChange(newView);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 3,
        mb: 4,
        flexWrap: { xs: "wrap", md: "nowrap" },
      }}
    >
      {/* Left: Search Input */}
      <Box sx={{ flex: { xs: "1 1 100%", md: "0 1 auto" }, minWidth: { xs: "100%", md: "300px" } }}>
        <GlassInput
          placeholder="Search"
          value={localSearch}
          onChange={handleSearchChange}
          icon={<SearchIcon />}
          fullWidth
        />
      </Box>

      {/* Middle: Filters Button */}
      <Button
        onClick={onFiltersClick}
        startIcon={<FilterListIcon />}
        sx={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06)",
          color: "var(--text-primary)",
          textTransform: "none",
          px: 2.5,
          py: 1.5,
          fontFamily: "Inter, Poppins, system-ui, sans-serif",
          fontWeight: 500,
          "&:hover": {
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
          },
          transition: "all 0.25s ease",
        }}
      >
        Filters
      </Button>

      {/* Right: View Toggle & Theme Switch */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          ml: "auto",
        }}
      >
        {onViewModeChange && (
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
            sx={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06)",
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: "20px",
                color: "var(--text-primary)",
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

        {showThemeToggle && (
          <FormControlLabel
            control={
              <Switch
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "var(--primary)",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "var(--primary)",
                  },
                }}
              />
            }
            label="Theme"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontFamily: "Inter, Poppins, system-ui, sans-serif",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default FiltersRow;

