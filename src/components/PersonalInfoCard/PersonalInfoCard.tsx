import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";
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
interface PersonalInfoCardProps {
  user: User | null;
}

const PersonalInfoCard = ({ user }: PersonalInfoCardProps) => {
  const { t } = useTranslation();
  const getInitials = () => {
    if (!user) return "U";
    const firstInitial = user.firstName?.[0]?.toUpperCase() || "";
    const lastInitial = user.lastName?.[0]?.toUpperCase() || "";
    return `${firstInitial}${lastInitial}` || "U";
  };

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      user.name ||
      "User"
    : "User";

  return (
    <Card
      sx={{
        borderRadius: "24px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#ffffff",
        p: 4,
        mb: 4,
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
                bgcolor: "#414F75",
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
                  color: "#1a1a1a",
                }}
              >
                {fullName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: "1rem",
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
              label="University ID"
              value={user?.universityId || "N/A"}
              icon={<PersonIcon />}
            />
            <InfoField
              label="Email"
              value={user?.email || "N/A"}
              icon={<EmailIcon />}
            />
            <InfoField
              label="School"
              value={user?.school || "N/A"}
              icon={<SchoolIcon />}
            />
            <InfoField
              label="GitHub"
              value={user?.githubUrl || "N/A"}
              icon={<GitHubIcon />}
              onClick={() => {
                window.open(user?.githubUrl || "", "_blank");
              }}
            />
            <InfoField
              label="Major"
              value={user?.major || "N/A"}
              icon={<BallotIcon />}
            />
            <InfoField
              label="LinkedIn"
              value={user?.linkedInUrl || "N/A"}
              icon={<LinkedInIcon />}
              onClick={() => {
                window.open(user?.linkedInUrl || "", "_blank");
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
