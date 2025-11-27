import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Icons from "@mui/icons-material";

const HailIcon = Icons.Hail;
const StarIcon = Icons.Star;
const CodeIcon = Icons.Code;
const AllInclusiveIcon = Icons.AllInclusive;


const AboutUsSection = () => {
  const { t } = useTranslation();

  const teamMembers = [
    { icon: <AllInclusiveIcon sx={{ fontSize: 40, color: "#9900ffff" }} />, name: "Mohamed", description: "Full Stack Developer" },
    { icon: <HailIcon sx={{ fontSize: 40, color: "#9900ffff" }} />, name: "Fahd", description: "Frontend Developer" },
    { icon: <CodeIcon sx={{ fontSize: 40, color: "#9900ffff" }} />, name: "Zeyad", description: "Frontend Developer" },
    { icon: <StarIcon sx={{ fontSize: 40, color: "#9900ffff" }} />, name: "Omar", description: "Backend Developer" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        py: 12,
        px: 2,
        background: "#ffd6e8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
            mb: 2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
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
                }}
              >
                <Box
                  className="icon-box"
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
