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
import type { Member, ProjectSearchParams } from "../../types";

interface ProjectFiltersProps {
  filters: ProjectSearchParams;
  onFilterChange: (field: keyof ProjectSearchParams, value: string | Member | Member[]) => void;
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

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    // Skip pagination params
    if (key === 'page' || key === 'limit') return false;
    
    if (value === undefined) return false;
    
    //strings
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    
    //Member 
    if (!Array.isArray(value) && typeof value === 'object' && 'name' in value) {
      return (value.name?.trim().length > 0) || (value.email?.trim().length > 0);
    }
    
    //Member[]
    if (Array.isArray(value)) {
      return value.length > 0 && value.some(member => 
        (member.name?.trim().length > 0) || (member.email?.trim().length > 0)
      );
    }
    
    return false;
  });

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
            value={filters.teamLeader?.name || ""}
            onChange={(e) => {
              const name = e.target.value;
              onFilterChange("teamLeader", name ? { name, email: filters.teamLeader?.email || "" } : { name: "", email: "" });
            }}
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
            value={filters.teamMembers?.map((member) => member.name).join(", ") || ""}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (!inputValue.trim()) {
                onFilterChange("teamMembers", [{ name: "", email: "" }]);
              } else {
                const names = inputValue.split(",").map(name => name.trim()).filter(name => name);
                const members: Member[] = names.map(name => ({
                  name,
                  email: filters.teamMembers?.find(m => m.name === name)?.email || ""
                }));
                onFilterChange("teamMembers", members.length > 0 ? members : [{ name: "", email: "" }]);
              }
            }}
            variant="outlined"
          />
        </Box>
      </Collapse>
    </Paper>
  );
};

export default ProjectFilters;

