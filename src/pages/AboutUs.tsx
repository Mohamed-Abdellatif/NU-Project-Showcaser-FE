import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import HailIcon from '@mui/icons-material/Hail';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from "@mui/icons-material/Star";

const AboutUsSection = () => {
  const { t } = useTranslation();

  const teamMembers = [
    { icon: <PersonIcon sx={{ fontSize: 40, color: "#B355F2" ,border: "3px solid rgba(255, 255, 255, 0.62)"}} />, name: "Mohamed" },
    { icon: <HailIcon sx={{ fontSize: 40, color: "#B355F2" ,border: "3px solid rgba(255, 255, 255, 0.62)"}} />, name: "Fahd" },
    { icon: <DeleteIcon sx={{ fontSize: 40, color: "#B355F2" ,border: "3px solid rgba(255, 255, 255, 0.62)"}} />, name: "Zeyad" },
    { icon: <StarIcon sx={{ fontSize: 40, color: "#B355F2" ,border: "3px solid rgba(255, 255, 255, 0.62)"}} />, name: "Omar" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        py: 12,
        px: 2,
        background: "#ffd6e8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "#6a2c68",
          mb: 2,
          borderBottom: "3px solid #fff",
          pb: 1,
        }}
      >
        {t("about.title")}
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          color: "#6a2c68",
          maxWidth: 600,
          textAlign: "center",
          mb: 8,
        }}
      >
        {t("about.subtitle")}
      </Typography>

      <Box
        sx={{
          width: { xs: "90%", sm: "80%", md: "70%" },
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 5,
            right: 5,
            height: 8,
            backgroundColor: "rgba(255,255,255,0.7)",
            zIndex: 1,
            transform: "translateY(-180%)",
          }}
        />

        {/* Circles */}
        {teamMembers.map((member, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "radial-gradient(circle, #faf2e6 0%, #ffd6e8 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                mb: 2,
              }}
            >
              {member.icon}
            </Box>
            <Typography
              sx={{
                color: "#6a2c68",
                fontWeight: "bold",
                fontSize: { xs: "0.85rem", sm: "1rem" },
              }}
            >
              {member.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AboutUsSection;
