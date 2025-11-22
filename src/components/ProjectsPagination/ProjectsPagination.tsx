import { Box, Pagination, useTheme, useMediaQuery } from "@mui/material";
import type { PaginationInfo } from "../../types";

interface ProjectsPaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

const ProjectsPagination = ({
  pagination,
  onPageChange,
}: ProjectsPaginationProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        direction: "ltr",
      }}
    >
      <Pagination
        count={pagination.totalPages}
        page={pagination.page}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
        size={isMobile ? "small" : "large"}
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default ProjectsPagination;

