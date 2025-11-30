import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Icons from "@mui/icons-material";
import { keyframes } from "@mui/system";
import { useToastContext } from "../contexts/ToastContext";

const HailIcon = Icons.Hail;
const StarIcon = Icons.Star;
const CodeIcon = Icons.Code;
const AllInclusiveIcon = Icons.AllInclusive;
const MailIcon = Icons.Mail;
const GitHubIcon = Icons.GitHub;
const LinkedInIcon = Icons.LinkedIn;


const focusY = -100;
const zoom = 180;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;


const AboutUsSection = () => {
  const { t } = useTranslation();
  const { showSuccess } = useToastContext();

  const teamMembers = [
    {
      icon: <AllInclusiveIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
      image: "https://media.licdn.com/dms/image/v2/D4D03AQGtGQEb_iUdBA/profile-displayphoto-shrink_800_800/B4DZSyHXscGkAc-/0/1738155065020?e=1766016000&v=beta&t=HhlK6uGfntPwIRQ2p08M1FZyYFM8UuBavJN1XqQSeyk",
      name: "Mohamed",
      description: "Full Stack Developer",
      mail: "m.abdellatif2319@nu.edu.eg",
      mailIcon: <MailIcon sx={{ fontSize: 30, color: "#0f6cbd" }} />,
      github: "https://github.com/Mohamed-Abdellatif",
      githubIcon: <GitHubIcon sx={{ fontSize: 30, color: "#383737" }} />,
      linkedIn: "https://www.linkedin.com/in/mohamed-abdellatif-6060371b0/",
      linkedInIcon: <LinkedInIcon sx={{ fontSize: 30, color: "#126bc4" }} />,
    },
    {
      icon: <HailIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHqobwKdu293g/profile-displayphoto-shrink_800_800/B4EZZDNwJZG0Ag-/0/1744884407028?e=1766016000&v=beta&t=TlSsh3ThfEK8gly7a93nv1KtT4Pe78ofYtW5aT4xcAA",
      name: "Fahd",
      description: "Frontend Developer",
      mail: "f.essameldin2333@nu.edu.eg",
      mailIcon: <MailIcon sx={{ fontSize: 30, color: "#0f6cbd" }} />,
      github: "https://github.com/FahdKhater",
      githubIcon: <GitHubIcon sx={{ fontSize: 30, color: "#383737" }} />,
      linkedIn: "https://www.linkedin.com/in/fahd-khater-8698a02b0/",
      linkedInIcon: <LinkedInIcon sx={{ fontSize: 30, color: "#126bc4" }} />,
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
      image: "https://media.licdn.com/dms/image/v2/D4E03AQH4F0D7vnNZGQ/profile-displayphoto-shrink_800_800/B4EZTDCdtXHcAg-/0/1738438991474?e=1766016000&v=beta&t=eKEO6mjaXKz76NZKZER5nBTDKHrjMg1y_0zB08T0yQk",
      name: "Zeyad",
      description: "Frontend Developer",
      mail: "z.ahmed2310@nu.edu.eg",
      mailIcon: <MailIcon sx={{ fontSize: 30, color: "#0f6cbd" }} />,
      github: "https://github.com/Zeyad-Ahmed2005",
      githubIcon: <GitHubIcon sx={{ fontSize: 30, color: "#383737" }} />,
      linkedIn: "https://www.linkedin.com/in/zeyad-ahmed-b57019278/",
      linkedInIcon: <LinkedInIcon sx={{ fontSize: 30, color: "#126bc4" }} />,
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEeIgWJLMoIaA/profile-displayphoto-shrink_800_800/B4DZVLPlO9HIAc-/0/1740724131973?e=1766016000&v=beta&t=z55N1VaKGJJe2uvB5V_9dC44Y7RBG8KcBg4amK0cYZk",
      name: "Omar",
      description: "Backend Developer",
      mail: "o.tamer2391@nu.edu.eg",
      mailIcon: <MailIcon sx={{ fontSize: 30, color: "#0f6cbd" }} />,
      github: "https://github.com/Lark01",
      githubIcon: <GitHubIcon sx={{ fontSize: 30, color: "#383737" }} />,
      linkedIn: "https://www.linkedin.com/in/omar-abouhussein-a371592b7/",
      linkedInIcon: <LinkedInIcon sx={{ fontSize: 30, color: "#126bc4" }} />,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        py: 12,
        px: 2,
        // background: "#ffd6e8",
        background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffd6e8 40%),
                 url('https://www.nu.edu.eg/sites/default/files/banners/2024-03/1920x480_-_copy.png') center ${focusY}% / ${zoom}% no-repeat`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: `${fadeIn} 0.8s ease-in-out`,
      }}
    >
      <Container maxWidth="lg" sx={{ zIndex: 1 }}>

        {/* Title */}
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: 800,
            color: "#6a2c68",
            marginTop: "150px",
            mb: 2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            animation: `${fadeIn} 0.8s ease-out`,
          }}
        >
          {t("about.title")}
        </Typography>

        {/* Description */}
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: "#8a4c88",
            maxWidth: 700,
            mx: "auto",
            mb: 10,
            lineHeight: 1.6,
            animation: `${fadeIn} 0.2s ease-out backwards`,
          }}
        >
          {t("about.subtitle")}
        </Typography>

        {/* Team Grid */}
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 4,
                  background: "#FFFFFF",
                  border: "#B355F2",
                  animation: `${fadeIn} 0.8s ease-out ${0.4 + idx * 0.1}s backwards`,
                  "&:hover": {
                    transition: "transform 1s ease, box-shadow 0.3s ease, background 0.3s ease",
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(179, 85, 242, 0.2)",
                    background: "rgba(255, 255, 255, 0.8)",
                    "& .icon-box": {
                      transform: "scale(1.1) rotate(0deg)",
                    },
                  },
                }}
              >
                <Box className="icon-box"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `url(${member.image}) center center/cover no-repeat`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                </Box>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#4a1c48",
                  }}
                >
                  {member.name}
                  <Typography variant="body1" align="center">
                    {member.description}
                  </Typography>
                  <Typography align="center">
                    <a
                      onClick={() => {
                        navigator.clipboard.writeText(member.mail); showSuccess(`${member.mail} copied to clipboard!`);
                      }}
                      style={{ marginRight: "5px", marginLeft: "5px", cursor: "pointer" }}
                    >
                      {member.mailIcon}
                    </a>
                    <a href={member.github} style={{ marginRight: "5px", marginLeft: "5px" }}>
                      {member.githubIcon}
                    </a>
                    <a href={member.linkedIn} style={{ marginRight: "5px", marginLeft: "5px" }}>
                      {member.linkedInIcon}
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
