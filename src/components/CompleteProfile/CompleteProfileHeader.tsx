import { Box, Typography } from "@mui/material";
import GradientTypography from "../GradientTypography/GradientTypography";

interface CompleteProfileHeaderProps {
  title: string;
  subtitle: string;
}

const CompleteProfileHeader = ({ title, subtitle }: CompleteProfileHeaderProps) => {
  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <GradientTypography
        variant="h4"
        sx={{
          fontSize: { xs: "1.75rem", sm: "2rem" },
          mb: 1.5,
        }}
      >
        {title}
      </GradientTypography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontSize: "1rem",
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default CompleteProfileHeader;

