import { Box, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CompleteProfileSkipLinkProps {
  onSkip?: () => void;
  skipLinkText?: string;
}

const CompleteProfileSkipLink = ({ onSkip, skipLinkText }: CompleteProfileSkipLinkProps) => {
  const { t } = useTranslation();

  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onSkip) {
      onSkip();
    } else {
      console.log("Skip clicked");
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Link
        href="#"
        onClick={handleSkip}
        sx={{
          color: "#6C3BFF",
          textDecoration: "none",
          fontSize: "0.95rem",
          fontWeight: 500,
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        {skipLinkText || t("completeProfile.skip")}
      </Link>
    </Box>
  );
};

export default CompleteProfileSkipLink;

