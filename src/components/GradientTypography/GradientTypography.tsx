import { Typography, type TypographyProps } from "@mui/material";

interface GradientTypographyProps extends TypographyProps {
  gradientFrom?: string;
  gradientTo?: string;
}

const GradientTypography = ({
  children,
  gradientFrom = "#6C3BFF",
  gradientTo = "#B355F2",
  sx,
  ...props
}: GradientTypographyProps) => {
  return (
    <Typography
      {...props}
      sx={{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: 700,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default GradientTypography;

