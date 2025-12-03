import React from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/system";

interface GlassCardProps extends Omit<React.ComponentProps<typeof Box>, "sx"> {
  children: React.ReactNode;
  elevation?: "light" | "medium" | "heavy";
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  sx?: SxProps<Theme>;
}

const GlassCard = ({
  children,
  elevation = "medium",
  onClick,
  sx,
  ...props
}: GlassCardProps) => {
  const elevationStyles = {
    light: {
      background: "rgba(255, 255, 255, 0.75)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06)",
    },
    medium: {
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
    },
    heavy: {
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.12)",
    },
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        ...elevationStyles[elevation],
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        transition: "all 0.25s ease",
        cursor: onClick ? "pointer" : "default",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default GlassCard;

