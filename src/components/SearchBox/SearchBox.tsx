import { Box, IconButton, InputBase } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

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
  placeholder = 'Search',
}: SearchBoxProps) => {
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
        backgroundColor: 'white',
        borderRadius: 2,
        width: {
          xs: showMobile ? '100%' : '200px',
          sm: '250px',
          md: '300px',
        },
        transition: 'width 0.3s',
        '&:hover, &:focus-within': {
          width: {
            xs: showMobile ? '100%' : '220px',
            sm: '270px',
            md: '320px',
          },
        },
      }}
    >
      <InputBase
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          flex: 1,
          pl: 2,
          pr: value ? 4 : 2,
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
          }}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};
