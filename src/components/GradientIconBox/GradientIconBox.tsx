import { Box } from "@mui/material";
import { ReactNode } from "react";

interface GradientIconBoxProps {
  icon: ReactNode;
  size?: number | { xs?: number; sm?: number };
  gradientFrom?: string;
  gradientTo?: string;
  borderRadius?: string;
}

const GradientIconBox = ({
  icon,
  size = { xs: 100, sm: 120 },
  gradientFrom = "#6C3BFF",
  gradientTo = "#B355F2",
  borderRadius = "20px",
}: GradientIconBoxProps) => {
  const width = typeof size === "number" ? size : size.xs || 100;
  const height = typeof size === "number" ? size : size.xs || 100;
  const smWidth = typeof size === "number" ? size : size.sm || 120;
  const smHeight = typeof size === "number" ? size : size.sm || 120;

  return (
    <Box
      sx={{
        width: { xs: width, sm: smWidth },
        height: { xs: height, sm: smHeight },
        borderRadius: borderRadius,
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 4px 16px rgba(108, 59, 255, 0.3)",
      }}
    >
      <Box
        sx={{
          "& svg": {
            fontSize: { xs: "3.125rem", sm: "3.75rem" },
            color: "#ffffff",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
    </Box>
  );
};

export default GradientIconBox;

