import { Box, IconButton, InputBase } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  showMobile?: boolean;
  isMobile?: boolean;
  placeholder?: string;
}

export const SearchBox = ({
  value,
  onChange,
  showMobile = false,
  isMobile = false,
  placeholder,
}: SearchBoxProps) => {
  const { t } = useTranslation();
  const defaultPlaceholder = placeholder || t('common.search');
  const handleClearSearch = () => {
    onChange('');
  };

  return (
    <Box
      sx={{
        display: {
          xs: showMobile || !isMobile ? 'flex' : 'none',
          md: 'flex',
        },
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.06)',
        width: {
          xs: showMobile ? '100%' : '200px',
          sm: '250px',
          md: '380px',
        },
        transition: 'all 0.25s ease',
        '&:hover, &:focus-within': {
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
          width: {
            xs: showMobile ? '100%' : '220px',
            sm: '270px',
            md: '400px',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pl: 2,
          color: 'var(--text-primary)',
          opacity: 0.6,
        }}
      >
        <SearchIcon />
      </Box>
      <InputBase
        placeholder={defaultPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          flex: 1,
          pl: 1,
          pr: value ? 4 : 2,
          py: 1.5,
          fontSize: '0.95rem',
          color: 'var(--text-primary)',
          '&::placeholder': {
            color: '#7A86A0',
            opacity: 1,
          },
        }}
      />
      {value && (
        <IconButton
          size="small"
          onClick={handleClearSearch}
          sx={{
            position: 'absolute',
            right: 4,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-primary)',
            opacity: 0.5,
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};
