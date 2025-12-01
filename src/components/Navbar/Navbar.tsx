import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { SearchBoxWithResults } from "../SearchBoxWithResults/SearchBoxWithResults";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import { UserMenu } from "../UserMenu/UserMenu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, userAtom } from "../../atoms/authAtom";
import type { User } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import "@fontsource/inter/500.css";

const LOGIN_MICROSOFT_BASE = `${import.meta.env.VITE_API_BASE}/auth/microsoft`;
const LOGOUT_BASE = `${import.meta.env.VITE_API_BASE}/auth/logout`;

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setUser] = useAtom<User | null>(userAtom);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: authData } = useAuth();

  const textStyle = {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "1.05rem",
    textTransform: "none",
    letterSpacing: ".3px",
    minWidth: "auto",
    opacity: 0.95,
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleToggleMobileSearch = () =>
    setShowMobileSearch(!showMobileSearch);

  const handleLogin = () => (window.location.href = LOGIN_MICROSOFT_BASE);
  const handleLogout = () => {
    window.location.href = LOGOUT_BASE;
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (authData) {
      if (authData.authenticated) {
        setIsAuthenticated(true);
        setUser(authData.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, [authData, setIsAuthenticated, setUser]);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "var(--primary)",
          boxShadow: "none",
          height: "80px",
          display: "flex",
          justifyContent: "center",

        }}
      >
        <Toolbar
          sx={{
            minHeight: "70px !important",
            height: "70px",
            px: { xs: 1, md: 3 },
            display: "flex",
            alignItems: "center",
            direction: i18n.dir(), // Add RTL support
          }}
        >
          {/* LEFT SECTION - Logo & Navigation (flips for RTL) */}
          <Box sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            mr: i18n.dir() === 'rtl' ? 0 : 'auto',
            ml: i18n.dir() === 'rtl' ? 'auto' : 0,
          }}>
            <Box
              sx={{
                width: 75,
                height: 67.5,
                display: showMobileSearch && isMobile ? "none" : "flex",
                alignItems: "center",
                flexShrink: 0,
                mr: 3,
              }}
            >
              <img
                src="../../Logo.svg"
                alt="Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  scale: 1.1
                }}
              />
            </Box>

            {/* NAVIGATION BUTTONS */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}> {/* 1.25x gap (2 * 1.25 = 2.5) */}
                <Button sx={textStyle} color="inherit" onClick={() => navigate("/")}>
                  {t("nav.home")}
                </Button>
                <Button sx={textStyle} color="inherit" onClick={() => navigate("/about")}>
                  {t("nav.about")}
                </Button>
                <Button sx={textStyle} color="inherit" onClick={() => navigate("/projects")}>
                  {t("nav.projects")}
                </Button>
              </Box>
            )}
          </Box>

          {/* CENTER SECTION - Search bar exactly in middle */}
          <Box sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '380px',
            display: !isMobile || showMobileSearch ? 'flex' : 'none'
          }}>
            <SearchBoxWithResults
              placeholder={t("nav.searchProject")}
              showMobile={showMobileSearch}
              isMobile={isMobile}
            />
          </Box>

          {/* RIGHT SECTION - Language & Login (flips for RTL) */}
          <Box sx={{
            paddingRight: isMobile ? 0 : 1,
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexShrink: 0,
            ml: i18n.dir() === 'rtl' ? 0 : 'auto', // Flip for RTL
            mr: i18n.dir() === 'rtl' ? 'auto' : 0, // Flip for RTL
          }}>
            {/* Language Selector */}
            {!isMobile && <LanguageSelector />}

            {/* Login/User Menu */}
            {!isAuthenticated ? (
              !isMobile && (
                <Button
                  onClick={handleLogin}
                  sx={{
                    ...textStyle,
                    color: "#fff",
                    border: "1.6px solid rgba(255,255,255,.8)",
                    borderRadius: "8px",
                    px: 2,
                    py: 0.5,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  {t("nav.login")}
                </Button>
              )
            ) : (
              !isMobile && <UserMenu showMobileSearch={showMobileSearch} onLogout={handleLogout} />
            )}

            {/* Mobile Actions */}
            {isMobile && (
              <>
                {/* Search Toggle */}
                {!showMobileSearch && (
                  <IconButton color="inherit" onClick={handleToggleMobileSearch}>
                    <SearchIcon sx={{ fontSize: "26px" }} />
                  </IconButton>
                )}

                {/* Mobile Menu */}
                {!showMobileSearch && (
                  <IconButton color="inherit" onClick={handleMenuOpen}>
                    <MenuIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                )}

                {/* Mobile Login */}
                {!showMobileSearch && !isAuthenticated && (
                  <Button
                    onClick={handleLogin}
                    sx={{
                      ...textStyle,
                      color: "#fff",
                      border: "1.6px solid rgba(255,255,255,.8)",
                      borderRadius: "8px",
                      px: 1.5,
                      py: 0.5,
                      fontSize: "0.9rem",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    {t("nav.login")}
                  </Button>
                )}
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem sx={textStyle} onClick={() => navigate("/")}>
          {t("nav.home")}
        </MenuItem>
        <MenuItem sx={textStyle} onClick={() => navigate("/about")}>
          {t("nav.about")}
        </MenuItem>
        <MenuItem sx={textStyle} onClick={() => navigate("/projects")}>
          {t("nav.projects")}
        </MenuItem>
        <LanguageSelector variant="menuItem" onLanguageChange={handleMenuClose} />
      </Menu>
    </>
  );
};