import { Box, Typography, IconButton } from "@mui/material";
import GlassCard from "../GlassCard/GlassCard";

export interface InfoFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const InfoField = ({ label, value, icon, onClick }: InfoFieldProps) => {
  return (
    <GlassCard
      elevation="light"
      onClick={onClick}
      sx={{
        p: 2.5,
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(89, 134, 217, 0.2)",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06)",
        transition: "all 0.25s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
              transform: "translateY(-2px)",
              border: "1px solid rgba(89, 134, 217, 0.4)",
            }
          : {},
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#7A86A0",
              fontSize: "0.75rem",
              fontWeight: 500,
              mb: 0.5,
              display: "block",
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "var(--text-primary)",
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
            }}
          >
            {value}
          </Typography>
        </Box>
        {icon && (
          <IconButton
            size="small"
            sx={{
              color: "var(--accent)",
              "&:hover": {
                backgroundColor: "var(--background-light)",
              },
            }}
          >
            {icon}
          </IconButton>
        )}
      </Box>
    </GlassCard>
  );
};

export default InfoField;



