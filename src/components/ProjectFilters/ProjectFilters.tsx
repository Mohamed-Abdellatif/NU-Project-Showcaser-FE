import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Collapse,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";
import type { ProjectSearchParams } from "../../types";

interface ProjectFiltersProps {
  filters: ProjectSearchParams;
  onFilterChange: (field: keyof ProjectSearchParams, value: string) => void;
  onClearFilters: () => void;
}

const ProjectFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
}: ProjectFiltersProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showFilters, setShowFilters] = useState(!isMobile);

  const hasActiveFilters = Object.values(filters).some((value) => value?.trim());

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 4,
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterListIcon />
          <Typography variant="h6">{t("projects.advancedSearch")}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {hasActiveFilters && (
            <Button
              variant="outlined"
              size="small"
              onClick={onClearFilters}
              startIcon={<ClearIcon />}
            >
              {t("projects.clearFilters")}
            </Button>
          )}
          {isMobile && (
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              aria-label="toggle filters"
            >
              <FilterListIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <Collapse in={showFilters}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label={t("projects.filters.title")}
            value={filters.title || ""}
            onChange={(e) => onFilterChange("title", e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            label={t("projects.filters.teamLeader")}
            value={filters.teamLeader || ""}
            onChange={(e) => onFilterChange("teamLeader", e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            label={t("projects.filters.supervisor")}
            value={filters.supervisor || ""}
            onChange={(e) => onFilterChange("supervisor", e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            label={t("projects.filters.major")}
            value={filters.major || ""}
            onChange={(e) => onFilterChange("major", e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            label={t("projects.filters.course")}
            value={filters.course || ""}
            onChange={(e) => onFilterChange("course", e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            label={t("projects.filters.teamMember")}
            value={filters.teamMember || ""}
            onChange={(e) => onFilterChange("teamMember", e.target.value)}
            variant="outlined"
          />
        </Box>
      </Collapse>
    </Paper>
  );
};

export default ProjectFilters;

