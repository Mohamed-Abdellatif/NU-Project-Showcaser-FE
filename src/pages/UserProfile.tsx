import { useMemo } from "react";
import { Box, Button } from "@mui/material";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/authAtom";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import PersonalInfoCard from "../components/PersonalInfoCard/PersonalInfoCard";
import ProjectShowcase from "../components/ProjectShowcase/ProjectShowcase";

// Main Component
const UserProfile = () => {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  // Fetch user's projects (as team leader)
  const { data: projectsData } = useProjects(1, 10, {
    teamLeader: {name:  "", email: user?.email || ""},
    teamMembers: [{name:  "", email: user?.email || ""}],
  });

  const userProjects = useMemo(() => {
    return projectsData?.projects || [];
  }, [projectsData]);

  const handleLogout = () => {
    // Handle logout - you may need to implement this based on your auth system
    navigate("/");
  };

  const handleDeactivate = () => {
    // Handle deactivate account
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      // Implement deactivation logic
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FAF9F6",
        py: { xs: 3, md: 6 },
        px: { xs: 2, md: 4 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <ProfileHeader onEditClick={() => navigate("/edit-profile")} />
        <PersonalInfoCard user={user} />
        <ProjectShowcase projects={userProjects} />

        {/* Footer Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 4,
            pt: 4,
            borderTop: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Button
            variant="text"
            onClick={() => navigate("/projects")}
            sx={{
              color: "#6C3BFF",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "rgba(108, 59, 255, 0.04)",
              },
            }}
          >
            View All Projects
          </Button>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                borderColor: "#d32f2f",
                color: "#d32f2f",
                borderRadius: "12px",
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#c62828",
                  backgroundColor: "rgba(211, 47, 47, 0.04)",
                },
              }}
            >
              Logout
            </Button>
            <Button
              variant="outlined"
              onClick={handleDeactivate}
              sx={{
                borderColor: "#d32f2f",
                color: "#d32f2f",
                borderRadius: "12px",
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#c62828",
                  backgroundColor: "rgba(211, 47, 47, 0.04)",
                },
              }}
            >
              Deactivate Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
