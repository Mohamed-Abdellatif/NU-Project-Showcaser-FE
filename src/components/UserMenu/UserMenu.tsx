import { useState } from "react";
import { IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/authAtom";
import type { User } from "../../types";

interface UserMenuProps {
  showMobileSearch: boolean;
  onLogout: () => void;
}

export const UserMenu = ({ showMobileSearch, onLogout }: UserMenuProps) => {
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [user] = useAtom<User | null>(userAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getInitials = () => {
    if (!user) return "";
    const firstInitial = user.firstName?.[0]?.toUpperCase() || "";
    const lastInitial = user.lastName?.[0]?.toUpperCase() || "";
    return `${firstInitial}.${lastInitial}` || "U";
  };
  

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleProfileMenuClose();
    navigate("/profile");
  };

  const handleProjectRequestClick = () => {
    handleProfileMenuClose();
    navigate("/project-requests");
  };

  const handleLogoutClick = () => {
    handleProfileMenuClose();
    onLogout();
  };

  return (
    <>
      <IconButton
        onClick={handleProfileMenuOpen}
        onMouseEnter={handleProfileMenuOpen}
        sx={{
          display: showMobileSearch ? "none" : "flex",
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          p: 0,
          "&:hover .MuiAvatar-root": {
            bgcolor: "#4A148C",
          },
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#6A1B9A",
            color: "white",
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
            fontSize: { xs: 16, md: 18 },
            fontWeight: "bold",
            transition: "background-color 0.2s",
          }}
        >
          {getInitials()}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={profileMenuAnchorEl}
        open={Boolean(profileMenuAnchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          onMouseLeave: handleProfileMenuClose,
        }}
        sx={{
          "& .MuiPaper-root": {
            mt: 1,
            minWidth: 180,
          },
        }}
      >
        <MenuItem onClick={handleProfileClick}>
          {t("nav.profile")}
        </MenuItem>
        <MenuItem onClick={handleProjectRequestClick}>
          {t("nav.project-requests")}
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          {t("nav.logout")}
        </MenuItem>
      </Menu>
    </>
  );
};

