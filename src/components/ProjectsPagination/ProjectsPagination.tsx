import { Box,  IconButton, useTheme, useMediaQuery } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

  const pages = [];
  const maxVisiblePages = isMobile ? 3 : 5;
  const startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
        gap: 1,
        direction: "ltr",
      }}
    >
      <IconButton
        onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
        disabled={pagination.page === 1}
        sx={{
          borderRadius: "16px",
          background: pagination.page === 1 
            ? "rgba(255, 255, 255, 0.5)" 
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(89, 134, 217, 0.2)",
          color: pagination.page === 1 ? "#ccc" : "var(--text-primary)",
          "&:hover": {
            background: pagination.page === 1 
              ? "rgba(255, 255, 255, 0.5)" 
              : "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(89, 134, 217, 0.4)",
          },
          "&.Mui-disabled": {
            background: "rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(89, 134, 217, 0.1)",
          },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {pages.map((pageNum) => (
        <Box
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          sx={{
            minWidth: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            background: pageNum === pagination.page
              ? "var(--primary)"
              : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: pageNum === pagination.page
              ? "1px solid var(--primary)"
              : "1px solid rgba(89, 134, 217, 0.2)",
            color: pageNum === pagination.page ? "#fff" : "var(--text-primary)",
            fontFamily: "Inter, Poppins, system-ui, sans-serif",
            fontSize: "0.95rem",
            fontWeight: pageNum === pagination.page ? 600 : 500,
            cursor: "pointer",
            transition: "all 0.25s ease",
            "&:hover": {
              background: pageNum === pagination.page
                ? "var(--accent)"
                : "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(89, 134, 217, 0.4)",
              transform: "translateY(-2px)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          {pageNum}
        </Box>
      ))}

      <IconButton
        onClick={() => onPageChange(Math.min(pagination.totalPages, pagination.page + 1))}
        disabled={pagination.page === pagination.totalPages}
        sx={{
          borderRadius: "16px",
          background: pagination.page === pagination.totalPages
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(89, 134, 217, 0.2)",
          color: pagination.page === pagination.totalPages ? "#ccc" : "var(--text-primary)",
          "&:hover": {
            background: pagination.page === pagination.totalPages
              ? "rgba(255, 255, 255, 0.5)"
              : "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(89, 134, 217, 0.4)",
          },
          "&.Mui-disabled": {
            background: "rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(89, 134, 217, 0.1)",
          },
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default ProjectsPagination;

