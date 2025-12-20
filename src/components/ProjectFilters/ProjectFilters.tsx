import { Box, Typography, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";
import type { Member, ProjectSearchParams } from "../../types";
import GlassInput from "../GlassInput/GlassInput";
import GlassCard from "../GlassCard/GlassCard";

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

  // Check if there are any active filters
  const hasActiveFilters = 
    (filters.title?.trim() ?? "") !== "" ||
    (filters.teamLeader?.name?.trim() ?? "") !== "" ||
    (filters.supervisor?.trim() ?? "") !== "" ||
    (filters.technology?.trim() ?? "") !== "" ||
    (filters.course?.trim() ?? "") !== "" ||
    (filters.teamMembers && filters.teamMembers.length > 0 && 
     filters.teamMembers.some(member => (member.name?.trim() ?? "") !== "" || (member.email?.trim() ?? "") !== ""));

  return (
    <GlassCard
      elevation="medium"
      sx={{
        p: 4,
        mb: 4,
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.85) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "28px",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mb: 3,
          fontWeight: "bold",
          fontFamily: "Inter, Poppins, system-ui, sans-serif",
          color: "var(--text-primary)",
          fontSize: "1.5rem",
        }}
      >
        {t("projects.advancedSearch")}
      </Typography>

      {/* Filter Inputs Grid - 2 Rows */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2.5,
          mb: 3,
        }}
      >
        {/* Row 1 */}
        <GlassInput
          placeholder={t("projects.filters.title")}
          value={filters.title || ""}
          onChange={(value) => onFilterChange("title", value)}
          fullWidth
          sx={{
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(89, 134, 217, 0.2)",
            "&:hover": {
              border: "1px solid rgba(89, 134, 217, 0.4)",
            },
            "&:focus-within": {
              border: "1px solid var(--accent)",
              boxShadow: "0px 4px 16px rgba(89, 134, 217, 0.15)",
            },
          }}
        />
        <GlassInput
          placeholder={t("projects.filters.teamLeader")}
          value={filters.teamLeader?.name || ""}
          onChange={(value) => {
            onFilterChange("teamLeader", value ? { name: value, email: filters.teamLeader?.email || "" } : { name: "", email: "" });
          }}
          fullWidth
          sx={{
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(89, 134, 217, 0.2)",
            "&:hover": {
              border: "1px solid rgba(89, 134, 217, 0.4)",
            },
            "&:focus-within": {
              border: "1px solid var(--accent)",
              boxShadow: "0px 4px 16px rgba(89, 134, 217, 0.15)",
            },
          }}
        />
        <GlassInput
          placeholder={t("projects.filters.supervisor")}
          value={filters.supervisor || ""}
          onChange={(value) => onFilterChange("supervisor", value)}
          fullWidth
          sx={{
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(89, 134, 217, 0.2)",
            "&:hover": {
              border: "1px solid rgba(89, 134, 217, 0.4)",
            },
            "&:focus-within": {
              border: "1px solid var(--accent)",
              boxShadow: "0px 4px 16px rgba(89, 134, 217, 0.15)",
            },
          }}
        />
        {/* Row 2 */}
        <GlassInput
          placeholder={t("projects.filters.technology")}
          value={filters.technology || ""}
          onChange={(value) => onFilterChange("technology", value)}
          fullWidth
          sx={{
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(89, 134, 217, 0.2)",
            "&:hover": {
              border: "1px solid rgba(89, 134, 217, 0.4)",
            },
            "&:focus-within": {
              border: "1px solid var(--accent)",
              boxShadow: "0px 4px 16px rgba(89, 134, 217, 0.15)",
            },
          }}
        />
        <GlassInput
          placeholder={t("projects.filters.course")}
          value={filters.course || ""}
          onChange={(value) => onFilterChange("course", value)}
          fullWidth
          sx={{
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(89, 134, 217, 0.2)",
            "&:hover": {
              border: "1px solid rgba(89, 134, 217, 0.4)",
            },
            "&:focus-within": {
              border: "1px solid var(--accent)",
              boxShadow: "0px 4px 16px rgba(89, 134, 217, 0.15)",
            },
          }}
        />
        <GlassInput
          placeholder={t("projects.filters.teamMember")}
          value={filters.teamMembers?.map((member) => member.name).join(", ") || ""}
          onChange={(value) => {
            if (!value.trim()) {
              onFilterChange("teamMembers", [{ name: "", email: "" }]);
            } else {
              const names = value.split(",").map(name => name.trim()).filter(name => name);
              const members: Member[] = names.map(name => ({
                name,
                email: filters.teamMembers?.find(m => m.name === name)?.email || ""
              }));
              onFilterChange("teamMembers", members.length > 0 ? members : [{ name: "", email: "" }]);
            }
          }}
          fullWidth
          sx={{
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(89, 134, 217, 0.2)",
            "&:hover": {
              border: "1px solid rgba(89, 134, 217, 0.4)",
            },
            "&:focus-within": {
              border: "1px solid var(--accent)",
              boxShadow: "0px 4px 16px rgba(89, 134, 217, 0.15)",
            },
          }}
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        {hasActiveFilters && (
          <Button
            variant="outlined"
            onClick={onClearFilters}
            startIcon={<ClearIcon />}
            sx={{
              borderRadius: "20px",
              px: 3,
              py: 1.5,
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(89, 134, 217, 0.3)",
              color: "var(--text-primary)",
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(89, 134, 217, 0.5)",
                transform: "translateY(-2px)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
              transition: "all 0.25s ease",
            }}
          >
            {t("projects.clearFilters")}
          </Button>
        )}
        <Button
          variant="contained"
          sx={{
            minWidth: "64px",
            height: "64px",
            borderRadius: "20px",
            background: "var(--primary)",
            boxShadow: "0px 4px 16px rgba(25, 118, 210, 0.3)",
            "&:hover": {
              background: "var(--accent)",
              boxShadow: "0px 6px 20px rgba(25, 118, 210, 0.4)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.25s ease",
          }}
          aria-label="Filter"
        >
          <FilterListIcon sx={{ color: "#fff", fontSize: "28px" }} />
        </Button>
      </Box>
    </GlassCard>
  );
};

export default ProjectFilters;

