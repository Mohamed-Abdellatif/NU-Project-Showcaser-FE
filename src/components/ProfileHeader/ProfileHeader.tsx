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
            fontFamily: "Inter, Poppins, system-ui, sans-serif",
            color: "var(--text-primary)",
          }}
        >
          {t("profile.profileHeaderTitle")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#7A86A0",
            fontSize: "1.1rem",
            fontFamily: "Inter, Poppins, system-ui, sans-serif",
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
          borderRadius: "20px",
          px: 3,
          py: 1.5,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(89, 134, 217, 0.3)",
          color: "var(--accent)",
          textTransform: "none",
          fontWeight: 600,
          fontFamily: "Inter, Poppins, system-ui, sans-serif",
          "&:hover": {
            borderColor: "var(--primary)",
            background: "rgba(255, 255, 255, 0.9)",
            transform: "translateY(-2px)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          },
          transition: "all 0.25s ease",
        }}
      >
        {t("profile.editProfile")}
      </Button>
    </Box>
  );
};

export default ProfileHeader;


