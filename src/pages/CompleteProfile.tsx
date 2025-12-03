import { useState } from "react";
import { Box, Card } from "@mui/material";
import { useCompleteProfile } from "../hooks/useUser";
import type { User } from "../types";
import { userAtom } from "../atoms/authAtom";
import { useAtom } from "jotai";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CompleteProfileHeader from "../components/CompleteProfile/CompleteProfileHeader";
import CompleteProfileIcon from "../components/CompleteProfile/CompleteProfileIcon";
import CompleteProfileDescription from "../components/CompleteProfile/CompleteProfileDescription";
import CompleteProfileForm from "../components/CompleteProfile/CompleteProfileForm";
import {
  validateLinkedInUrl as getLinkedInUrlError,
  validateGitHubUrl as getGitHubUrlError,
  validateUniversityId as getUniversityIdError,
} from "../utils/validation";

const CompleteProfile = () => {
  const { mutate: completeProfile } = useCompleteProfile();
  const { showSuccess, showError } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user] = useAtom<User | null>(userAtom);
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
      showError(t("completeProfile.pleaseFixValidationErrorsBeforeSubmitting"));
      return;
    }

    completeProfile({
      linkedInUrl,
      major,
      school,
      universityId,
      githubUrl,
      email: user?.email!,
    });
    showSuccess(t("completeProfile.profileCompletedSuccessfully"));
    navigate("/");
    setGithubUrl("");
    setLinkedInUrl("");
    setMajor("");
    setSchool("");
    setUniversityId("");
    setErrors({
      linkedInUrl: "",
      githubUrl: "",
      universityId: "",
    });
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--background-light)",
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
          title={t("completeProfile.title")}
          subtitle={t("completeProfile.subtitle")}
        />

        {/* Icon Section */}
        <CompleteProfileIcon />

        {/* Description Text */}
        <CompleteProfileDescription
          description={t("completeProfile.pleaseProvideMoreDetails")}
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
          submitButtonText={t("completeProfile.save")}
          skipLinkText={t("completeProfile.skip")}
          onSkip={() => navigate("/")}
        />
      </Card>
    </Box>
  );
};

export default CompleteProfile;
