import { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Button,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import GlassCard from "../components/GlassCard/GlassCard";

const LearnMore = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => setExpanded(isExpanded ? panel : false);

  const faqItems = [
    {
      id: "benefits",
      question: t("learnmore.faq.benefitsQuestion"),
      answer: t("learnmore.faq.benefitsAnswer"),
      icon: <SchoolIcon sx={{ color: "var(--primary)", mr: 2 }} />,
    },
    {
      id: "get-started",
      question: t("learnmore.faq.getStartedQuestion"),
      answer: t("learnmore.faq.getStartedAnswer"),
      icon: <RocketLaunchIcon sx={{ color: "var(--primary)", mr: 2 }} />,
    },
    {
      id: "signin",
      question: t("learnmore.faq.signinQuestion"),
      answer: t("learnmore.faq.signinAnswer"),
      icon: <HowToRegIcon sx={{ color: "var(--primary)", mr: 2 }} />,
    },
    {
      id: "audience",
      question: t("learnmore.faq.audienceQuestion"),
      answer: t("learnmore.faq.audienceAnswer"),
      icon: <GroupsIcon sx={{ color: "var(--primary)", mr: 2 }} />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, var(--background-lighter) 0%, var(--Off-White) 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        {/* Hero Section */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{
              color: "var(--text-primary)",
              fontWeight: 800,
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              mb: 3,
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("learnmore.hero.title")}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "var(--text-secondary)",
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            {t("learnmore.hero.subtitle")}
          </Typography>

          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/")}
            sx={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0px 8px 24px rgba(25, 118, 210, 0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0px 12px 32px rgba(25, 118, 210, 0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {t("learnmore.hero.startExploring")}
          </Button>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mb: 10 }}>
          <Typography
            variant="h2"
            sx={{
              color: "var(--text-primary)",
              fontWeight: 700,
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              fontSize: { xs: "2rem", md: "2.75rem" },
              mb: 6,
              textAlign: "center",
            }}
          >
            {t("learnmore.faq.title")}
          </Typography>

          <Box sx={{ maxWidth: "900px", mx: "auto" }}>
            {faqItems.map((item) => (
              <GlassCard key={item.id} elevation="light" sx={{ mb: 2 }}>
                <Accordion
                  expanded={expanded === item.id}
                  onChange={handleChange(item.id)}
                  sx={{
                    background: "transparent",
                    boxShadow: "none",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "var(--primary)" }} />}
                    sx={{
                      minHeight: "80px",
                      "& .MuiAccordionSummary-content": {
                        display: "flex",
                        alignItems: "center",
                        my: 1,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {item.icon}
                      <Typography
                        variant="h6"
                        sx={{
                          color: "var(--text-primary)",
                          fontWeight: 600,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                        }}
                      >
                        {item.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails sx={{ pt: 0, pb: 3, px: { xs: 3, md: 4 } }}>
                    <Typography
                      sx={{
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                        fontSize: "1rem",
                        pl: 6,
                      }}
                    >
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </GlassCard>
            ))}
          </Box>
        </Box>

        {/* CTA Section */}
        <GlassCard
          elevation="medium"
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            mt: 6,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "var(--text-primary)",
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            {t("learnmore.cta.title")}
          </Typography>

          <Typography
            sx={{
              color: "var(--text-secondary)",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            {t("learnmore.cta.subtitle")}
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/submit")}
            sx={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              borderRadius: "50px",
              px: 6,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            {t("learnmore.cta.startJourney")}
          </Button>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default LearnMore;
