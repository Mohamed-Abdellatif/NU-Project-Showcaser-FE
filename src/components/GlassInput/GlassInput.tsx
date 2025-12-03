import { Box, InputBase, IconButton } from "@mui/material";
import {  Clear as ClearIcon } from "@mui/icons-material";
import type { ReactNode } from "react";

interface GlassInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  sx?: any;
  fullWidth?: boolean;
}

const GlassInput = ({
  placeholder,
  value,
  onChange,
  icon,
  sx,
  fullWidth = false,
}: GlassInputProps) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06)",
        transition: "all 0.25s ease",
        width: fullWidth ? "100%" : "auto",
        "&:hover, &:focus-within": {
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
        },
        ...sx,
      }}
    >
      {icon && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pl: 2,
            color: "var(--text-primary)",
            opacity: 0.6,
          }}
        >
          {icon}
        </Box>
      )}
      <InputBase
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          flex: 1,
          pl: icon ? 1 : 2,
          pr: value ? 4 : 2,
          py: 1.5,
          fontSize: "0.95rem",
          color: "var(--text-primary)",
          "&::placeholder": {
            color: "#7A86A0",
            opacity: 1,
          },
        }}
      />
      {value && (
        <IconButton
          size="small"
          onClick={handleClear}
          sx={{
            position: "absolute",
            right: 4,
            color: "var(--text-primary)",
            opacity: 0.5,
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default GlassInput;

