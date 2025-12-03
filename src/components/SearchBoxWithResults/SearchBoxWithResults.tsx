import { useEffect, useState, useRef } from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { SearchBox } from "../SearchBox/SearchBox";
import { useNavigate } from "react-router-dom";
import { searchProjects } from "../../api/projectsApi";
import type { Project } from "../../types";
import { useTranslation } from "react-i18next";

interface SearchBoxWithResultsProps {
  showMobile?: boolean;
  isMobile?: boolean;
  placeholder?: string;
}

export const SearchBoxWithResults = ({
  showMobile = false,
  isMobile = false,
  placeholder,
}: SearchBoxWithResultsProps) => {
  const { t } = useTranslation();
  const defaultPlaceholder = placeholder || t('common.search');
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Debounced search effect
  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const debounceTimer = setTimeout(async () => {
      try {
        const results = await searchProjects({ title: searchValue.trim() });
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
      setIsSearching(false);
    };
  }, [searchValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
    setSearchValue("");
    setShowResults(false);
  };

  return (
    <Box
      ref={searchBoxRef}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SearchBox
        value={searchValue}
        onChange={(value) => {
          setSearchValue(value);
          if (value.trim()) {
            setShowResults(true);
          }
        }}
        showMobile={showMobile}
        isMobile={isMobile}
        placeholder={defaultPlaceholder}
      />
      {/* Search Results Dropdown */}
      {showResults && (searchResults.length > 0 || isSearching) && (
        <Paper
          elevation={0}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            maxHeight: "400px",
            overflow: "auto",
            zIndex: 1300,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "20px",
            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            width: {
              xs: showMobile ? "100%" : "200px",
              sm: "250px",
              md: "380px",
            },
          }}
        >
          {isSearching ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 3,
              }}
            >
              <CircularProgress size={24} />
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {searchResults.map((project) => (
                <ListItem key={project._id} disablePadding>
                  <ListItemButton
                    onClick={() => handleProjectClick(project._id)}
                    sx={{
                      fontFamily: "Inter, Poppins, system-ui, sans-serif",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={project.title}
                      secondary={project.course || project.description?.slice(0, 50)}
                      slotProps={{
                        primary: {
                          sx: { fontWeight: 500 },
                        },
                        secondary: {
                          sx: { fontSize: "0.75rem" },
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      )}
    </Box>
  );
};

