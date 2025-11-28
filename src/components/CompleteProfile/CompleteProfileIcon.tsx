import { Box } from "@mui/material";
import { School as SchoolIcon } from "@mui/icons-material";
import GradientIconBox from "../GradientIconBox/GradientIconBox";

const CompleteProfileIcon = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 4,
      }}
    >
      <GradientIconBox icon={<SchoolIcon />} />
    </Box>
  );
};

export default CompleteProfileIcon;


