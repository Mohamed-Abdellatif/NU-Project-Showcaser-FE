import { Typography } from "@mui/material";

interface CompleteProfileDescriptionProps {
  description: string;
}

const CompleteProfileDescription = ({ description }: CompleteProfileDescriptionProps) => {
  return (
    <Typography
      variant="body2"
      sx={{
        textAlign: "center",
        color: "text.secondary",
        mb: 4,
        fontSize: "0.95rem",
      }}
    >
      {description}
    </Typography>
  );
};

export default CompleteProfileDescription;

