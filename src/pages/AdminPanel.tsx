import { Box, Container } from "@mui/material";
import { useAtom } from "jotai";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import AdminPanelContent from "../components/AdminPanelContent/AdminPanelContent";
import { activeMenuItemAtom } from "../atoms/adminAtom";

const AdminPanel = () => {
  const [activeMenuItem, setActiveMenuItem] = useAtom(activeMenuItemAtom);


  // Handlers
  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--Off-White)",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <AdminSidebar activeItem={activeMenuItem} onItemClick={handleMenuItemClick} />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="xl">
          <AdminPanelContent
            activeMenuItem={activeMenuItem}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPanel;
