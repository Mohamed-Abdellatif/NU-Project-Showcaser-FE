import { Button, type ButtonProps } from "@mui/material";

interface GradientButtonProps extends Omit<ButtonProps, "variant"> {
  variant?: "contained" | "outlined" | "text";
  gradientFrom?: string;
  gradientTo?: string;
}

const GradientButton = ({
  children,
  gradientFrom = "var(--accent)",
  gradientTo = "var(--primary)",
  sx,
  ...props
}: GradientButtonProps) => {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        py: 1.75,
        borderRadius: "50px",
        background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        color: "#ffffff",
        fontWeight: 700,
        fontSize: "1rem",
        textTransform: "none",
        boxShadow: "0px 4px 16px rgba(77, 106, 255, 0.4)",
        "&:hover": {
          background: `linear-gradient(90deg, ${gradientFrom}dd 0%, ${gradientTo}dd 100%)`,
          boxShadow: "0px 6px 20px rgba(77, 106, 255, 0.5)",
          transform: "translateY(-2px)",
        },
        transition: "all 0.3s ease",
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default GradientButton;

