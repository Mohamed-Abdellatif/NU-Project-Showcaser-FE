import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import CommentIcon from "@mui/icons-material/Comment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { sidebarCollapsedAtom } from "../../atoms/adminAtom";

interface MenuItem {
  id: string;
  labelKey: string;
  icon: React.ReactElement;
}

interface AdminSidebarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

const AdminSidebar = ({
  activeItem = "dashboard",
  onItemClick,
}: AdminSidebarProps) => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useAtom(sidebarCollapsedAtom);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      labelKey: "admin.sidebar.dashboard",
      icon: <DashboardIcon />,
    },
    {
      id: "comments",
      labelKey: "admin.sidebar.comments",
      icon: <CommentIcon />,
    },
    {
      id: "projects",
      labelKey: "admin.sidebar.projects",
      icon: <FolderIcon />,
    },

    { id: "schools", labelKey: "admin.sidebar.schools", icon: <SchoolIcon /> },
    {
      id: "suggestions",
      labelKey: "admin.sidebar.suggestions",
      icon: <LightbulbIcon />,
    },
    { id: "users", labelKey: "admin.sidebar.users", icon: <PeopleIcon /> },
  ];

  return (
    <Box
      sx={{
        width: collapsed ? 80 : 280,
        minHeight: "100%",
        background:
          "linear-gradient(180deg, var(--primary) 0%, var(--accent) 100%)",
        display: "flex",
        flexDirection: "column",
        py: 4,
        px: 2,
        flexShrink: 0,
        transition: "width 0.3s ease",
        position: "relative",
      }}
    >
      {/* Toggle Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          mb: 3,
        }}
      >
        <Tooltip
          title={collapsed ? t("admin.sidebar.expand") : t("admin.sidebar.collapse")}
          placement="right"
        >
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Menu Items */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;
          const itemContent = (
            <ListItemButton
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              sx={{
                borderRadius: "12px",
                mb: 1,
                py: 1.5,
                px: collapsed ? 1.5 : 2,
                backgroundColor: "transparent",
                borderLeft: isActive ? "4px solid var(--golden-yellow)" : "4px solid transparent",
                background: isActive
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
                backdropFilter: isActive ? "blur(10px)" : "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
                transition: "all 0.2s ease",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: collapsed ? "unset" : 40,
                  justifyContent: "center",
                  "& svg": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    padding: "8px",
                    fontSize: "1.5rem",
                    transition: "all 0.2s ease",
                  },
                  "&:hover svg": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    color: "var(--golden-yellow)",
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={t(item.labelKey)}
                  primaryTypographyProps={{
                    fontSize: "1rem",
                    fontWeight: isActive ? 600 : 500,
                    color: "white",
                  }}
                />
              )}
            </ListItemButton>
          );

          return collapsed ? (
            <Tooltip key={item.id} title={t(item.labelKey)} placement="right">
              {itemContent}
            </Tooltip>
          ) : (
            itemContent
          );
        })}
      </List>
    </Box>
  );
};

export default AdminSidebar;
