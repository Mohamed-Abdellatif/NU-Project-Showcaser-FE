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
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
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

  // Reusable navigation handler
  const handleMenuAction = (action: string | (() => void)) => {
    handleProfileMenuClose();
    if (typeof action === "string") {
      navigate(action);
    } else {
      action();
    }
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
            bgcolor: "var(--primary)",
            color: "#fff",
          },
        }}
      >
        <Avatar
          sx={{
            bgcolor: "var(--primary)",
            color: "#fff",
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
            fontSize: { xs: 16, md: 18 },
            fontWeight: "bold",
            transition: "all 0.25s ease",
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
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "20px",
            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            mt: 1,
            minWidth: 180,
            overflow: "hidden",
          },
        }}
      >
        <MenuItem
          onClick={() => handleMenuAction(`/profile/${user?.email.split("@")[0]}`)}
          sx={{
            fontFamily: "Inter, Poppins, system-ui, sans-serif",
            color: "var(--text-primary)",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)",
            },
          }}
        >
          {t("nav.profile")}
        </MenuItem>
        {user?.role === "admin" && (
          <MenuItem
            onClick={() => handleMenuAction("/admin-panel")}
            sx={{
              fontFamily: "Inter, Poppins, system-ui, sans-serif",
              color: "var(--text-primary)",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.1)",
              },
            }}
          >
            {t("nav.admin-panel")}
          </MenuItem>
        )}
        {(user?.role === "supervisor" ||
          user?.role === "admin" )&& (
            <MenuItem
              onClick={() => handleMenuAction("/project-requests")}
              sx={{
                fontFamily: "Inter, Poppins, system-ui, sans-serif",
                color: "var(--text-primary)",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                },
              }}
            >
              {t("nav.project-requests")}
            </MenuItem>
          )}
        <MenuItem
          onClick={() => handleMenuAction("/starred-projects")}
          sx={{
            fontFamily: "Inter, Poppins, system-ui, sans-serif",
            color: "var(--text-primary)",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)",
            },
          }}
        >
          {t("nav.starred-projects")}
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuAction("/submit")}
          sx={{
            fontFamily: "Inter, Poppins, system-ui, sans-serif",
            color: "var(--text-primary)",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)",
            },
          }}
        >
          {t("nav.submit-project")}
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuAction(onLogout)}
          sx={{
            fontFamily: "Inter, Poppins, system-ui, sans-serif",
            color: "var(--text-primary)",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)",
            },
          }}
        >
          {t("nav.logout")}
        </MenuItem>
      </Menu>
    </>
  );
};
