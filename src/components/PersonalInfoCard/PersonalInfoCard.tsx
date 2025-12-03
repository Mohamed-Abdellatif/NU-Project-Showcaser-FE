import { Box, Typography, CardContent, Avatar } from "@mui/material";
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Ballot as BallotIcon,
} from "@mui/icons-material";
import type { User } from "../../types";
import InfoField from "../InfoField/InfoField";
import { useTranslation } from "react-i18next";
import GlassCard from "../GlassCard/GlassCard";
interface PersonalInfoCardProps {
  user: User | null;
}

const PersonalInfoCard = ({ user }: PersonalInfoCardProps) => {
  const { t } = useTranslation();
  const getInitials = () => {
    if (!user) return "";
    const firstInitial = user.firstName?.[0]?.toUpperCase() || "";
    const lastInitial = user.lastName?.[0]?.toUpperCase() || "";
    return `${firstInitial}.${lastInitial}` || "U";
  };

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    user.name ||
    "User"
    : "User";

  return (
    <GlassCard
      elevation="medium"
      sx={{
        p: 4,
        mb: 4,
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.85) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "28px",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          {/* Left side - Avatar and Name */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              gap: 2,
              flex: { md: "0 0 30%" },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 120, md: 140 },
                height: { xs: 120, md: 140 },
                bgcolor: "var(--primary)",
                fontSize: "3rem",
                fontWeight: 700,
              }}
            >
              {getInitials()}
            </Avatar>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 0.5,
                  fontFamily: "Inter, Poppins, system-ui, sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                {fullName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#7A86A0",
                  fontSize: "1rem",
                  fontFamily: "Inter, Poppins, system-ui, sans-serif",
                }}
              >
                {t("profile.university")}
              </Typography>
            </Box>
          </Box>

          {/* Right side - Info Fields */}
          <Box
            sx={{
              flex: { md: "1 1 auto" },
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
              gap: 2,
            }}
          >
            <InfoField
              label={t("profile.universityId")}
              value={user?.universityId || "N/A"}
              icon={<PersonIcon />}
            />
            <InfoField
              label={t("profile.email")}
              value={user?.email || "N/A"}
              icon={<EmailIcon />}
            />
            <InfoField
              label={t("profile.school")}
              value={user?.school || "N/A"}
              icon={<SchoolIcon />}
            />
            <InfoField
              label={t("profile.github")}
              value={user?.githubUrl || "N/A"}
              icon={<GitHubIcon />}
              onClick={() => {
                window.open(user?.githubUrl || "", "_blank");
              }}
            />
            <InfoField
              label={t("profile.major")}
              value={user?.major || "N/A"}
              icon={<BallotIcon />}
            />
            <InfoField
              label={t("profile.linkedIn")}
              value={user?.linkedInUrl || "N/A"}
              icon={<LinkedInIcon />}
              onClick={() => {
                window.open(user?.linkedInUrl || "", "_blank");
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </GlassCard>
  );
};

export default PersonalInfoCard;
