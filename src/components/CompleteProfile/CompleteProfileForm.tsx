import { Box, MenuItem } from "@mui/material";
import {
  LinkedIn as LinkedInIcon,
  Book as BookIcon,
  Shield as ShieldIcon,
  GitHub as GitHubIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import IconInputField from "../IconInputField/IconInputField";
import GradientButton from "../GradientButton/GradientButton";
import CompleteProfileSkipLink from "./CompleteProfileSkipLink";
import { useTranslation } from "react-i18next";
import { useSchools } from "../../hooks/useSchools";

interface CompleteProfileFormProps {
  linkedInUrl: string;
  githubUrl: string;
  major: string;
  school: string;
  universityId: string;
  errors: {
    linkedInUrl: string;
    githubUrl: string;
    universityId: string;
  };
  onLinkedInUrlChange: (value: string) => void;
  onGithubUrlChange: (value: string) => void;
  onMajorChange: (value: string) => void;
  onSchoolChange: (value: string) => void;
  onUniversityIdChange: (value: string) => void;
  onLinkedInUrlBlur: () => void;
  onGithubUrlBlur: () => void;
  onUniversityIdBlur: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onSkip?: () => void;
  submitButtonText?: string;
  skipLinkText?: string;
  showSkipLink?: boolean;
}

const CompleteProfileForm = ({
  linkedInUrl,
  githubUrl,
  major,
  school,
  universityId,
  errors,
  onLinkedInUrlChange,
  onGithubUrlChange,
  onMajorChange,
  onSchoolChange,
  onUniversityIdChange,
  onLinkedInUrlBlur,
  onGithubUrlBlur,
  onUniversityIdBlur,
  onSubmit,
  onSkip,
  submitButtonText,
  skipLinkText,
  showSkipLink = true,
}: CompleteProfileFormProps) => {
  const { t } = useTranslation();
  const { data: schools } = useSchools();

  const selectedSchool = schools?.find((s) => s.name === school);
  const majors = selectedSchool?.majors || [];

  return (
    <Box component="form" onSubmit={onSubmit}>
      {/* University ID Field */}
      <IconInputField
        placeholder="University ID"
        value={universityId}
        onChange={(e) => {
          onUniversityIdChange(e.target.value);
        }}
        onBlur={onUniversityIdBlur}
        error={!!errors.universityId}
        helperText={errors.universityId}
        icon={<PersonIcon />}
      />

      {/* School/Department Field */}
      <IconInputField
        placeholder="School/Department"
        value={school}
        onChange={(e) => {
          onSchoolChange(e.target.value);
          onMajorChange("");
        }}
        icon={<ShieldIcon />}
        select
        sx={{ mb: 4 }}
      >
        {schools?.map((schoolOption) => (
          <MenuItem key={schoolOption.name} value={schoolOption.name}>
            {schoolOption.name}
          </MenuItem>
        ))}
      </IconInputField>

      {/* Major Field */}
      <IconInputField
        placeholder="Major"
        value={major}
        onChange={(e) => onMajorChange(e.target.value)}
        icon={<BookIcon />}
        select
        disabled={!school || majors.length === 0}
      >
        {majors.map((majorOption) => (
          <MenuItem key={majorOption} value={majorOption}>
            {majorOption}
          </MenuItem>
        ))}
      </IconInputField>

      {/* LinkedIn Field */}
      <IconInputField
        placeholder="LinkedIn Profile URL"
        value={linkedInUrl}
        onChange={(e) => {
          onLinkedInUrlChange(e.target.value);
        }}
        onBlur={onLinkedInUrlBlur}
        error={!!errors.linkedInUrl}
        helperText={errors.linkedInUrl}
        icon={<LinkedInIcon />}
      />

      {/* GitHub Field */}
      <IconInputField
        placeholder="GitHub Profile URL"
        value={githubUrl}
        onChange={(e) => {
          onGithubUrlChange(e.target.value);
        }}
        onBlur={onGithubUrlBlur}
        error={!!errors.githubUrl}
        helperText={errors.githubUrl}
        icon={<GitHubIcon />}
      />

      {/* Primary Button */}
      <GradientButton type="submit" fullWidth sx={{ mb: 2 }} onClick={onSubmit}>
        {submitButtonText || t("completeProfile.save")}
      </GradientButton>

      {/* Skip Link */}
      {showSkipLink && (
        <CompleteProfileSkipLink onSkip={onSkip} skipLinkText={skipLinkText} />
      )}
    </Box>
  );
};

export default CompleteProfileForm;
