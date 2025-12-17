import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import CommentIcon from "@mui/icons-material/Comment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useTranslation } from "react-i18next";

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
        width: 280,
        minHeight: "100%",
        background:
          "linear-gradient(180deg, var(--primary) 0%, var(--accent) 100%)",
        borderRadius: "0 24px 24px 0",
        display: "flex",
        flexDirection: "column",
        py: 4,
        px: 2,
        flexShrink: 0,
      }}
    >
      {/* Menu Items */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            sx={{
              borderRadius: "12px",
              mb: 1,
              py: 1.5,
              backgroundColor:
                activeItem === item.id
                  ? "rgba(255, 255, 255, 0.15)"
                  : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={t(item.labelKey)}
              primaryTypographyProps={{
                fontSize: "1rem",
                fontWeight: activeItem === item.id ? 600 : 500,
                color: "white",
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default AdminSidebar;
