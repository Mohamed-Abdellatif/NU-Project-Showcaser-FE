import { Box, Typography, Button } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
interface ProfileHeaderProps {
  onEditClick?: () => void;
}

const ProfileHeader = ({ onEditClick }: ProfileHeaderProps) => {
  const { t } = useTranslation();
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
          {t("profile.profileHeaderTitle")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontSize: "1.1rem",
          }}
        >
          {t("profile.profileHeaderSubtitle")}
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
          borderColor: "var(--accent)",
          color: "var(--accent)",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            borderColor: "var(--primary)",
            backgroundColor: "var(--background-light)",
          },
        }}
      >
        {t("profile.editProfile")}
      </Button>
    </Box>
  );
};

export default ProfileHeader;


