import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { PaginationInfo } from "../../types";

interface ResultsHeaderProps {
  pagination: PaginationInfo | undefined;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  itemsPerPageOptions?: number[];
}

const ResultsHeader = ({
  pagination,
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [12, 24, 48, 64, 128],
}: ResultsHeaderProps) => {
  const { t } = useTranslation();

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
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        {pagination && pagination.total > 0
          ? `${t("projects.pagination.showing")} ${(pagination.page - 1) * pagination.limit + 1} ${t("projects.pagination.to")} ${Math.min(pagination.page * pagination.limit, pagination.total)} ${t("projects.pagination.of")} ${pagination.total} ${t("projects.pagination.results")}`
          : t("projects.noResults")}
      </Typography>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>{t("projects.pagination.perPage")}</InputLabel>
        <Select
          value={itemsPerPage}
          label={t("projects.pagination.perPage")}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          {itemsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ResultsHeader;

