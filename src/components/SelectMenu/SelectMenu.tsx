import { Menu, MenuItem, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface SelectOption {
  value: string;
  labelKey: string;
  chipColor?: string;
  chipBackgroundColor?: string;
}

interface SelectMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  options: SelectOption[];
  onSelect: (value: string) => void;
}

const SelectMenu = ({ anchorEl, open, onClose, options, onSelect }: SelectMenuProps) => {
  const { t } = useTranslation();

  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} onClick={() => handleSelect(option.value)}>
          <Chip
            label={t(option.labelKey)}
            size="small"
            sx={{
              mr: 1,
              backgroundColor: option.chipBackgroundColor || "#F5F5F5",
              color: option.chipColor || "#616161",
            }}
          />
          {t(option.labelKey)}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default SelectMenu;
