import { Box, Typography, Button } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

interface ProfileHeaderProps {
  onEditClick?: () => void;
}

const ProfileHeader = ({ onEditClick }: ProfileHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: 4,
        flexWrap: { xs: "wrap", sm: "nowrap" },
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "2rem", md: "2.5rem" },
            color: "#1a1a1a",
          }}
        >
          User Profile
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontSize: "1.1rem",
          }}
        >
          View and manage your personal details and projects
        </Typography>
      </Box>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        onClick={onEditClick}
        sx={{
          borderRadius: "24px",
          px: 3,
          py: 1.5,
          borderColor: "#6C3BFF",
          color: "#6C3BFF",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            borderColor: "#5A2FE6",
            backgroundColor: "rgba(108, 59, 255, 0.04)",
          },
        }}
      >
        Edit Profile
      </Button>
    </Box>
  );
};

export default ProfileHeader;


