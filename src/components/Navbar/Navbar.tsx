import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
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
import axios from "axios";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, userAtom } from "../../atoms/authAtom";
import type { User } from "../../types";
export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setUser] = useAtom<User | null>(userAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/microsoft";
  };

  const handleLogout = async () => {
    window.location.href = "http://localhost:3000/auth/logout";
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get<{ authenticated: boolean , user: User }>(
        `http://localhost:3000/auth/me`,
        {
          withCredentials: true,
        }
      );
      if (res.data.authenticated) {
        setIsAuthenticated(true);
        setUser(res.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(60deg, #8E44AD 0%, #A569BD 50%,#8E44AD 100%)",
          boxShadow: 3,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: { xs: 1, md: 2 },
            flexDirection: {
              xs: showMobileSearch ? "column" : "row",
              md: "row",
            },
            gap: { xs: showMobileSearch ? 2 : 0, md: 0 },
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                display: {
                  xs: isMobile && showMobileSearch ? "none" : "block",
                },
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  color: "#283593",
                  marginRight: 3,
                  padding: "2px 2px"
                }}
              >
                NU
              </span>
              Project Showcase
            </Typography>
          </Box>

          {/* Search Bar */}
          <SearchBoxWithResults
            showMobile={showMobileSearch}
            isMobile={isMobile}
            placeholder={t("nav.searchProject")}
          />

          {/* Navigation Links and Login Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 2 },
            }}
          >
            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleToggleMobileSearch}
                  sx={{ display: { sm: "none" } }}
                >
                  <SearchIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{
                    display: showMobileSearch ? "none" : "flex",
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: { sm: 1, md: 2 },
                  alignItems: "center",
                }}
              >
                <Button color="inherit" onClick={() => navigate("/")}>
                  {t("nav.home")}
                </Button>
                <Button onClick={() => navigate("/about")} color="inherit">
                  {t("nav.about")}
                </Button>
                <Button color="inherit" onClick={() => navigate("/projects")}>{t("nav.projects")}</Button>
                <LanguageSelector />
              </Box>
            )}
            {!isAuthenticated ? (
              <Button
                onClick={handleLogin}
                variant="contained"
                sx={{
                  bgcolor: "#6A1B9A",
                  "&:hover": {
                    bgcolor: "#4A148C",
                  },
                  display: showMobileSearch ? "none" : "flex",
                  borderRadius: 2,
                  px: { xs: 2, md: 3 },
                }}
              >
                {t("nav.login")}
              </Button>
            ) : (
              <UserMenu showMobileSearch={showMobileSearch} onLogout={handleLogout} />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            width: 200,
            mt: 1,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/");
            handleMenuClose();
          }}
        >
          {t("nav.home")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/about");
            handleMenuClose();
          }}
        >
          {t("nav.about")}
        </MenuItem>
        <MenuItem onClick={() => {
          navigate("/projects");
          handleMenuClose();
        }}>{t("nav.projects")}</MenuItem>
        <LanguageSelector
          variant="menuItem"
          onLanguageChange={handleMenuClose}
        />
      </Menu>
    </>
  );
};
