import { useState } from 'react';
import { Button, Menu, MenuItem, Typography, Box } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../utils/constants';
import { languageAtom } from '../../atoms/languageAtom';
import { useAtom } from "jotai";
import { useEffect } from "react";







interface LanguageSelectorProps {
  variant?: 'button' | 'menuItem';
  onLanguageChange?: () => void;
}

export const LanguageSelector = ({
  variant = 'button',
  onLanguageChange
}: LanguageSelectorProps) => {
  const [language, setlanguage] = useAtom(languageAtom)
  const [langMenuAnchor, setLangMenuAnchor] = useState<null | HTMLElement>(null);
  const { i18n } = useTranslation();





  const handleLanguageChange = (langCode: string) => {
    const lang = LANGUAGES.find(l => l.code === langCode);
    if (lang) {
      setlanguage(langCode);
      i18n.changeLanguage(langCode);
      handleLangMenuClose();
    }
  };

  const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangMenuAnchor(null);
  };

  if (variant === 'menuItem') {
    return (
      <>
        <MenuItem
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            pointerEvents: 'none',
            color: 'text.secondary',
          }}
        >
          <LanguageIcon fontSize="small" sx={{ mr: 1 }} />
          Language
        </MenuItem>
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            sx={{
              pl: 4,
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            {lang.name}
            {i18n.language === lang.code && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                }}
              />
            )}
          </MenuItem>
        ))}
      </>
    );
  }

  return (
    <>
      <Button
        color="inherit"
        onClick={handleLangMenuOpen}
        endIcon={<LanguageIcon />}
        sx={{
          borderRadius: 1,
          border: '1px solid rgba(255,255,255,0.3)',
          minWidth: 'auto',
          px: 1,
        }}
      >
        <Typography variant="button" sx={{ fontSize: '0.875rem', marginRight: 1, marginLeft: 1 }}>
          {LANGUAGES.find(l => l.code === i18n.language)?.code.toUpperCase() || 'EN'}
        </Typography>
      </Button>
      <Menu
        anchorEl={langMenuAnchor}
        open={Boolean(langMenuAnchor)}
        onClose={handleLangMenuClose}
        sx={{
          '& .MuiPaper-root': {
            mt: 1,
            minWidth: 120,
          },
        }}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={i18n.language === lang.code}
            sx={{
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            {lang.name}
            {i18n.language === lang.code && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                }}
              />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
