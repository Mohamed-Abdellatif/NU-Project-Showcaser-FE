import { useState, useEffect } from "react";
import { Box, Card } from "@mui/material";
import { useUpdateUser } from "../hooks/useUser";
import { useToastContext } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CompleteProfileHeader from "../components/CompleteProfile/CompleteProfileHeader";
import CompleteProfileIcon from "../components/CompleteProfile/CompleteProfileIcon";
import CompleteProfileDescription from "../components/CompleteProfile/CompleteProfileDescription";
import CompleteProfileForm from "../components/CompleteProfile/CompleteProfileForm";
import LoadingState from "../components/LoadingState/LoadingState";
import {
  validateLinkedInUrl as getLinkedInUrlError,
  validateGitHubUrl as getGitHubUrlError,
  validateUniversityId as getUniversityIdError,
} from "../utils/validation";
import { userAtom } from "../atoms/authAtom";
import { useAtom } from "jotai";
import type { User } from "../types";

const EditProfile = () => {
  const { mutate: updateUser } = useUpdateUser();
  const [user] = useAtom<User | null>(userAtom);
  const { showSuccess, showError } = useToastContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [major, setMajor] = useState("");
  const [school, setSchool] = useState("");
  const [universityId, setUniversityId] = useState("");
  
  // Validation errors
  const [errors, setErrors] = useState({
    linkedInUrl: "",
    githubUrl: "",
    universityId: "",
  });

  // Load user data when available
  useEffect(() => {
    if (user) {
      setLinkedInUrl(user.linkedInUrl || "");
      setGithubUrl(user.githubUrl || "");
      setMajor(user.major || "");
      setSchool(user.school || "");
      setUniversityId(user.universityId || "");
    }
  }, [user]);

  // Validation handlers
  const validateLinkedInUrl = (url: string) => {
    const error = getLinkedInUrlError(url);
    setErrors((prev) => ({ ...prev, linkedInUrl: error }));
    return error === "";
  };

  const validateGitHubUrl = (url: string) => {
    const error = getGitHubUrlError(url);
    setErrors((prev) => ({ ...prev, githubUrl: error }));
    return error === "";
  };

  const validateUniversityId = (id: string) => {
    const error = getUniversityIdError(id);
    setErrors((prev) => ({ ...prev, universityId: error }));
    return error === "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const isLinkedInValid = validateLinkedInUrl(linkedInUrl);
    const isGitHubValid = validateGitHubUrl(githubUrl);
    const isUniversityIdValid = validateUniversityId(universityId);

    if (!isLinkedInValid || !isGitHubValid || !isUniversityIdValid) {
      showError(t("editProfile.pleaseFixValidationErrorsBeforeSubmitting"));
      return;
    }

    updateUser(
      {
        linkedInUrl,
        major,
        school,
        universityId,
        githubUrl,
        email: user?.email!,
      },
      {
        onSuccess: () => {
          showSuccess(t("editProfile.profileUpdatedSuccessfully"));
          navigate("/profile");
        },
        onError: (error: Error) => {
          showError(error.message || t("editProfile.failedToUpdateProfile"));
        },
      }
    );
  };

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#FFF9F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingState />
      </Box>
    );
  }

  return (    
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FFF9F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: "650px",
          width: "100%",
          borderRadius: "32px",
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
          backgroundColor: "#ffffff",
          p: { xs: 4, sm: 6 },
        }}
      >
        {/* Header Section */}
        <CompleteProfileHeader
          title={t("editProfile.title")}
          subtitle={t("editProfile.subtitle")}
        />

        {/* Icon Section */}
        <CompleteProfileIcon />

        {/* Description Text */}
        <CompleteProfileDescription
          description={t("editProfile.pleaseUpdateYourDetails")}
        />

        {/* Form Section */}
        <CompleteProfileForm
          linkedInUrl={linkedInUrl}
          githubUrl={githubUrl}
          major={major}
          school={school}
          universityId={universityId}
          errors={errors}
          onLinkedInUrlChange={setLinkedInUrl}
          onGithubUrlChange={setGithubUrl}
          onMajorChange={setMajor}
          onSchoolChange={setSchool}
          onUniversityIdChange={setUniversityId}
          onLinkedInUrlBlur={() => validateLinkedInUrl(linkedInUrl)}
          onGithubUrlBlur={() => validateGitHubUrl(githubUrl)}
          onUniversityIdBlur={() => validateUniversityId(universityId)}
          onSubmit={handleSubmit}
          submitButtonText={t("editProfile.save")}
          showSkipLink={false}
        />
      </Card>
    </Box>
  );
};

export default EditProfile;

