import { Box, Typography, Card, IconButton } from "@mui/material";

export interface InfoFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const InfoField = ({ label, value, icon, onClick }: InfoFieldProps) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.2s",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
              transform: "translateY(-2px)",
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
              color: "text.secondary",
              fontSize: "0.75rem",
              fontWeight: 500,
              mb: 0.5,
              display: "block",
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#1a1a1a",
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
    </Card>
  );
};

export default InfoField;



