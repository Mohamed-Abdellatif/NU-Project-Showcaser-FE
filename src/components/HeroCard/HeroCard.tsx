import { Box, Typography, Button } from "@mui/material";
import GlassCard from "../GlassCard/GlassCard";
import { useTranslation } from "react-i18next";

interface HeroCardProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  decorativeBarColor?: string;
}

const HeroCard = ({
  title = "Have a Winning Project?",
  subtitle = "Showcase your work to the community!",
  ctaText,
  onCtaClick,
  decorativeBarColor = "#F59E0B",
}: HeroCardProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        p: 2,
        mt: 3,
        mb: 4,
        ml: 3,
        width: { xs: "calc(100% - 48px)", md: "auto" },
        minWidth: { xs: "auto", md: 200 },
      }}
    >
      <GlassCard
        elevation="medium"
        sx={{
          width: "100%",
          p: { xs: 3, md: 6 },
          mt: 2,
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            maxWidth: { md: "60%" },
            textAlign: { xs: "center", md: "left" },
            zIndex: 1,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.2,
              fontWeight: 800,
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              mb: 2,
              color: "var(--text-primary)",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.8,
              fontSize: "1.1rem",
              color: "var(--text-primary)",
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              fontWeight: 400,
            }}
          >
            {subtitle}
          </Typography>

          <Button
            onClick={onCtaClick}
            variant="contained"
            sx={{
              bgcolor: "var(--primary)",
              color: "#fff",
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              fontWeight: 600,
              px: 3,
              py: 1.2,
              fontSize: "0.95rem",
              borderRadius: "12px",
              boxShadow: "0 4px 14px 0 rgba(25, 118, 210, 0.3)",
              textTransform: "none",
              "&:hover": {
                bgcolor: "var(--accent)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px 0 rgba(25, 118, 210, 0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {ctaText || t("home.submitProject")}
          </Button>
        </Box>

        {/* Decorative Bar */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "6px",
            backgroundColor: decorativeBarColor,
            opacity: 0.8,
            zIndex: 0,
          }}
        />
      </GlassCard>
    </Box>
  );
};

export default HeroCard;

