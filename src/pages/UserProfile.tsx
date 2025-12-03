import { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, userAtom } from "../atoms/authAtom";
import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import PersonalInfoCard from "../components/PersonalInfoCard/PersonalInfoCard";
import ProjectShowcase from "../components/ProjectShowcase/ProjectShowcase";
import {
  useGetProfileByUserName,
  useRequestDeactivateAccount,
} from "../hooks/useUser";
import LoadingState from "../components/LoadingState/LoadingState";
import ProjectsPagination from "../components/ProjectsPagination/ProjectsPagination";
import type { PaginatedProjectsResponse } from "../types";
import { useSendMail } from "../hooks/useNotify";
import { deactivateAccountEmail } from "../utils/constants";
import { useToastContext } from "../contexts/ToastContext";
import { useTranslation } from "react-i18next";
import ValidationModal from "../components/ValidationModal/ValidationModal";
const LOGOUT_BASE = `${import.meta.env.VITE_API_BASE}/auth/logout`;

// Main Component
const UserProfile = () => {
  const { showSuccess, showError } = useToastContext();
  const { t } = useTranslation();
  const { userName } = useParams();
  const sendEmail = useSendMail();
  const requestDeactivateAccount = useRequestDeactivateAccount();
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const { data: userProfileData, isLoading: isLoadingUserProfile } =
    useGetProfileByUserName(userName);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const isMyProfile = useMemo(() => {
    return user?.email === userProfileData?.email;
  }, [user, userProfileData]);

  const userData = useMemo(() => {
    return isMyProfile ? user : userProfileData;
  }, [user, userProfileData, isMyProfile]);

  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Validation modal state
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  // Fetch user's projects (as team leader)
  const { data: projectsData } = useProjects(page, itemsPerPage, {
    teamLeader: { name: "", email: userProfileData?.email || "" },
    teamMembers: [{ name: "", email: userProfileData?.email || "" }],
  });

  const userProjects = useMemo(() => {
    return (
      (projectsData as PaginatedProjectsResponse | undefined)?.projects || []
    );
  }, [projectsData]);

  const pagination = useMemo(() => {
    return (projectsData as PaginatedProjectsResponse | undefined)?.pagination;
  }, [projectsData]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLogout = () => {
    window.location.href = LOGOUT_BASE;
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  const handleDeactivate = () => {
    if(userData?.deactivated || userData?.deactivateRequested) {
      showError(t("userProfile.requestDeactivateAccountAlreadyRequested"));
      setIsDeactivateModalOpen(false);
      return;
    }
    requestDeactivateAccount.mutate(userData?.email!, {
      onSuccess: () => {
        setIsDeactivateModalOpen(false);
        sendEmail.mutate(deactivateAccountEmail(userData?.email!));
        showSuccess(t("userProfile.requestDeactivateAccountSuccessfully"));
        setTimeout(() => {
          handleLogout();
        }, 4000);
      },
      onError: () => {
        setIsDeactivateModalOpen(false);
        showError(t("userProfile.requestDeactivateAccountFailed"));
      },
    });
  };

  if (isLoadingUserProfile) {
    return <LoadingState />;
  }

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
        {user && isMyProfile && (
          <ProfileHeader onEditClick={() => navigate("/edit-profile")} />
        )}
        <PersonalInfoCard user={userData || null} />
        <ProjectShowcase
          projects={userProjects}
          user={user}
          isMyProfile={isMyProfile}
        />
        {pagination && (
          <ProjectsPagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}

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
          {user && isMyProfile && (
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
              {!userData?.deactivated && !userData?.deactivateRequested && <Button
                variant="outlined"
                onClick={() => setIsDeactivateModalOpen(true)}
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
              </Button>}
            </Box>
          )}
        </Box>
      </Box>

      {/* Deactivate Account Validation Modal */}
      <ValidationModal
        open={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={handleDeactivate}
        title={t("userProfile.deactivateAccountTitle")}
        message={t("userProfile.deactivateAccountMessage")}
        confirmText={t("userProfile.deactivateAccountConfirm")}
        cancelText={t("validationModal.cancel")}
        confirmColor="error"
        loading={requestDeactivateAccount.isPending || sendEmail.isPending}
      />
    </Box>
  );
};

export default UserProfile;
