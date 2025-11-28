import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Icons from "@mui/icons-material";
import { keyframes } from "@mui/system";

const HailIcon = Icons.Hail;
const StarIcon = Icons.Star;
const CodeIcon = Icons.Code;
const AllInclusiveIcon = Icons.AllInclusive;

const focusY = 840;
const zoom = 180;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;


const AboutUsSection = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      icon: <AllInclusiveIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
      name: "Mohamed",
      description: "Full Stack Developer",
      mail: "m.abdellatif2319@nu.edu.eg",
      github: "https://github.com/Mohamed-Abdellatif",
      linkedIn: "https://www.linkedin.com/in/mohamed-abdellatif-6060371b0/"
    },
    {
      icon: <HailIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
      name: "Fahd",
      description: "Frontend Developer",
      mail: "f.Essameldin2333@nu.edu.eg",
      github: "https://github.com/FahdKhater",
      linkedIn: "https://www.linkedin.com/in/fahd-khater-8698a02b0/"
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
      name: "Zeyad",
      description: "Frontend Developer",
      mail: "z.ahmed2310@nu.edu.eg",
      github: "https://github.com/Zeyad-Ahmed2005",
      linkedIn: "https://www.linkedin.com/in/zeyad-ahmed-b57019278/"
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: "#9900ffff" }} />,
      name: "Omar",
      description: "Backend Developer",
      mail: "o.tamer2391@nu.edu.eg",
      github: "https://github.com/Lark01",
      linkedIn: "https://www.linkedin.com/in/omar-abouhussein-a371592b7/"
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
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
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(179, 85, 242, 0.2)",
                    background: "rgba(255, 255, 255, 0.8)",
                    "& .icon-box": {
                      transform: "scale(1.1) rotate(5deg)",
                      background: "linear-gradient(135deg, #B355F2 0%, #C88BFF 50%, #FFD6E8 100%)",
                    },
                  },
                }}
              >
                <Box className="icon-box"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #B355F2 0%, #C88BFF 50%, #FFD6E8 100%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  {member.icon}
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
