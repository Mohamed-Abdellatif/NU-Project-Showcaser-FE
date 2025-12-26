import { useState } from 'react';
import { Button, Menu, MenuItem, Typography, Box } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../utils/constants';
import { languageAtom } from '../../atoms/languageAtom';
import { useAtom } from "jotai";







interface LanguageSelectorProps {
  variant?: 'button' | 'menuItem';
  onLanguageChange?: () => void;
}

export const LanguageSelector = ({
  variant = 'button'
}: LanguageSelectorProps) => {
  const [, setlanguage] = useAtom(languageAtom)
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
      [
        <MenuItem
          key="language-label"
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            pointerEvents: 'none',
            color: 'text.secondary',
          }}
        >
          <LanguageIcon fontSize="small" sx={{ mr: 1 }} />
          {i18n.t('common.language')}
        </MenuItem>,
        ...LANGUAGES.map((lang) => (
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
        ))
      ]
    );
  }

  return (
    <>
      <Button
        onClick={handleLangMenuOpen}
        sx={{
          borderRadius: '12px',
          border: '1px solid rgba(25, 118, 210, 0.3)',
          minWidth: 'auto',
          px: 1.5,
          py: 0.5,
          color: 'var(--text-primary)',
          fontFamily: 'Inter, Poppins, system-ui, sans-serif',
          fontWeight: 500,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            borderColor: 'var(--primary)',
          },
        }}
      >
        <Typography variant="button" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
          {LANGUAGES.find(l => l.code === i18n.language)?.code.toUpperCase() || 'EN'}
        </Typography>
      </Button>
      <Menu
        anchorEl={langMenuAnchor}
        open={Boolean(langMenuAnchor)}
        onClose={handleLangMenuClose}
        PaperProps={{
          sx: {
            maxHeight: 400,
            overflow: 'auto',
          },
        }}
        sx={{
          '& .MuiPaper-root': {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '20px',
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
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
              fontFamily: 'Inter, Poppins, system-ui, sans-serif',
              color: 'var(--text-primary)',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.15)',
              },
            }}
          >
            {lang.name}
            {i18n.language === lang.code && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'var(--primary)',
                }}
              />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
