import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Icons from "@mui/icons-material";
import { keyframes } from "@mui/system";
import { useToastContext } from "../contexts/ToastContext";
import { foundingMembers } from "../utils/constants";
import type { FoundingMember } from "../types";
import NUHeaderBg from "../assets/NU Header Background.png";


const MailIcon = Icons.Mail;
const GitHubIcon = Icons.GitHub;
const LinkedInIcon = Icons.LinkedIn;


// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;


const AboutUsSection = () => {
  const { t } = useTranslation();
  const { showSuccess } = useToastContext();


  return (
    <Box
      sx={{
        width: "97.4%",
        minHeight: { xs: "auto", sm: "90vh" },
        py: { xs: 4, sm: 8, md: 12 },
        px: { xs: 1, sm: 2 },
        position: "relative",
        overflow: "hidden",
        background: "var(--background-light)", // base background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: `${fadeIn} 0.8s ease-in-out`,
        // IMAGE on top layer
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "300px",
          backgroundImage: `url(${NUHeaderBg})`,
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          pointerEvents: "none",
        },
        // GRADIENT that blends image → glassmorphism theme background
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "300px",
          background: "linear-gradient(to bottom, rgba(240, 246, 255, 0) 0%, rgba(240, 246, 255, 0.4) 30%, rgba(89, 134, 217, 0.5) 50%, rgba(25, 118, 210, 0.6) 70%, var(--background-light) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ zIndex: 3, width: "100%", position: "relative" }}>

        {/* Title */}
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: 800,
            color: "var(--text-primary)",
            marginTop: { xs: "20px", sm: "80px", md: "150px" },
            mb: { xs: 1, sm: 2 },
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            animation: `${fadeIn} 0.8s ease-out`,
            px: { xs: 2, sm: 0 },
          }}
        >
          {t("about.title")}
        </Typography>

        {/* Description */}
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: "var(--text-secondary)",
            maxWidth: 700,
            mx: "auto",
            mb: { xs: 4, sm: 6, md: 10 },
            lineHeight: 1.6,
            animation: `${fadeIn} 0.2s ease-out backwards`,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
            px: { xs: 2, sm: 3, md: 0 },
          }}
        >
          {t("about.subtitle")}
        </Typography>

        {/* Team Grid */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {foundingMembers.map((member: FoundingMember, idx: number) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 4,
                  background: "#FFFFFF",
                  border: "var(--accent)",
                  animation: `${fadeIn} 0.8s ease-out ${0.4 + idx * 0.1}s backwards`,
                  "&:hover": {
                    transition: "transform 1s ease, box-shadow 0.3s ease, background 0.3s ease",
                    transform: "translateY(-10px)",
                    boxShadow: "0 10px 20px var(--accent)",
                    background: "rgba(255, 255, 255, 0.8)",
                    "& .icon-box": {
                      transform: "scale(1.1) rotate(0deg)",
                    },
                  },
                }}
              >
                <Box className="icon-box"
                  sx={{
                    width: { xs: 60, sm: 70, md: 80 },
                    height: { xs: 60, sm: 70, md: 80 },
                    borderRadius: "50%",
                    background: `url(${member.image}) center center/cover no-repeat`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: { xs: 2, sm: 2.5, md: 3 },
                  }}
                >
                </Box>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#4a1c48",
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  }}
                >
                  {member.name}
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{
                      fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                      mt: 0.5,
                    }}
                  >
                    {member.description}
                  </Typography>
                  <Typography
                    align="center"
                    sx={{
                      mt: { xs: 1, sm: 1.5 },
                      display: "flex",
                      justifyContent: "center",
                      gap: { xs: 1, sm: 1.5 },
                    }}
                  >
                    <a
                      onClick={() => {
                        navigator.clipboard.writeText(member.mail); showSuccess(`${member.mail} copied to clipboard!`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <MailIcon sx={{ fontSize: { xs: 24, sm: 28, md: 30 }, color: "#0f6cbd" }} />
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <GitHubIcon sx={{ fontSize: { xs: 24, sm: 28, md: 30 }, color: "#383737" }} />
                    </a>
                    <a href={member.linkedIn} target="_blank" rel="noopener noreferrer">
                      <LinkedInIcon sx={{ fontSize: { xs: 24, sm: 28, md: 30 }, color: "#126bc4" }} />
                    </a>
                  </Typography>
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsSection;
