import { TextField, type TextFieldProps, InputAdornment, Box } from "@mui/material";
import type { ReactNode } from "react";

interface IconInputFieldProps extends Omit<TextFieldProps, "InputProps"> {
  icon: ReactNode;
  iconColor?: string;
}

const IconInputField = ({
  icon,
  iconColor = "#6C3BFF",
  sx,
  ...props
}: IconInputFieldProps) => {
  return (
    <TextField
      fullWidth
      {...props}
      sx={{
        mb: 3,
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: "#FAFAFA",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
          "& fieldset": {
            borderColor: "transparent",
          },
          "&:hover fieldset": {
            borderColor: "rgba(108, 59, 255, 0.3)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#6C3BFF",
            borderWidth: "2px",
          },
        },
        "& .MuiInputBase-input": {
          py: 1.5,
        },
        ...sx,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box
              sx={{
                color: iconColor,
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {icon}
            </Box>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default IconInputField;

