import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingStateProps {
  message?: string;
  minHeight?: number;
}

const LoadingState = ({ message, minHeight = 400 }: LoadingStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight,
        gap: 2,
      }}
    >
      <CircularProgress />
      {message && (
        <Typography variant="body2" sx={{ color: "var(--secondary)" }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingState;
