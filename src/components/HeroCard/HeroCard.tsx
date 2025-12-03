import { Box, Typography, Button } from "@mui/material";
import GlassCard from "../GlassCard/GlassCard";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HERO_SLIDES_CONFIG } from "../../utils/constants";



interface SlideContent {
  title: string;
  subtitle: string;
  ctaText: string;
  decorativeBarColor: string;
  buttonLink: string;
}

const HeroCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  // Get slides from translations
  const slides = useMemo<SlideContent[]>(() => 
    HERO_SLIDES_CONFIG.map((config) => ({
      title: t(config.translationKeys.title),
      subtitle: t(config.translationKeys.subtitle),
      ctaText: t(config.translationKeys.ctaText),
      decorativeBarColor: config.decorativeBarColor,
      buttonLink: config.buttonLink,
    }))
  , [t]);

  const currentContent = slides[currentSlide];
  
  const onCtaClick = () => {
    navigate(currentContent.buttonLink);
  };

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        p: 2,
        mt: 3,
        mb: 4,
        ml: isRTL ? 0 : 3,
        mr: isRTL ? 3 : 0,
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
            textAlign: { xs: "center", md: isRTL ? "right" : "left" },
            zIndex: 1,
            position: "relative",
            width: "100%",
            height: { xs: "260px", md: "300px" },
            overflow: "hidden",
          }}
        >
          {/* Slider Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: `translateY(-${currentSlide * 100}%)`,
              height: "100%",
            }}
          >
            {slides.map((slide, index) => (
              <Box
                key={index}
                sx={{
                  flex: "0 0 100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                  opacity: isTransitioning && index !== currentSlide ? 0.7 : 1,
                  transition: "opacity 0.3s ease",
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
                  {slide.title}
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
                  {slide.subtitle}
                </Typography>

                <Button
                  onClick={onCtaClick}
                  variant="contained"
                  sx={{
                    bgcolor: slide.decorativeBarColor,
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
                  {slide.ctaText}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Decorative Bar */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            right: isRTL ? "auto" : 0,
            left: isRTL ? 0 : "auto",
            top: 0,
            bottom: 0,
            width: "6px",
            backgroundColor: currentContent.decorativeBarColor ,
            opacity: 0.8,
            zIndex: 0,
            transition: "background-color 0.5s ease",
          }}
        />

        {/* Slide Indicators */}
        {slides.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              right: isRTL ? "auto" : { xs: "20px", md: "30px" },
              left: isRTL ? { xs: "20px", md: "30px" } : "auto",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              zIndex: 2,
            }}
          >
            {slides.map((_, index) => (
              <Box
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setIsTransitioning(false);
                  }, 100);
                }}
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    index === currentSlide
                      ? currentContent.decorativeBarColor 
                      : "rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.2)",
                    backgroundColor: currentContent.decorativeBarColor ,
                  },
                }}
              />
            ))}
          </Box>
        )}
      </GlassCard>
    </Box>
  );
};

export default HeroCard;

