import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import { useCreateProject } from "../hooks/useProjects";
import { useUploadImage, useUploadVideo } from "../hooks/useMedia";
import type { Member } from "../types/index";
import ProjectDetailsCard from "../components/ProjectDetailsCard/ProjectDetailsCard";
import TeamMembersCard from "../components/TeamMembersCard/TeamMembersCard";
import ImageUploadCard from "../components/ImageUploadCard/ImageUploadCard";
import VideoUploadCard from "../components/VideoUploadCard/VideoUploadCard";
import { useToastContext } from "../contexts/ToastContext";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/authAtom";
import type { User } from "../types";
import { useSendMail } from "../hooks/useNotify";
import {
  requestProjectToTAEmail,
} from "../utils/constants";
import {
  isValidUrl,
  isValidGitHubUrl,
} from "../utils/validation";

const SubmitionPage = () => {
  const { t } = useTranslation();
  const sendEmail = useSendMail();
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useToastContext();
  const [user] = useAtom<User | null>(userAtom);
  const lastRequestTimeRef = useRef<number>(0);
  const COOLDOWN_MS = 5000; // 5 seconds

  const createProject = useCreateProject();
  const uploadImage = useUploadImage();
  const uploadVideo = useUploadVideo();

  const [members, setMembers] = useState<Member[]>([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File[]>([]);
  const [technologies, setTechnologies] = useState("");
  const [tags, setTags] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [course, setCourse] = useState("");
  const [teachingAssistantEmail, setTeachingAssistantEmail] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [newMember, setNewMember] = useState<Member>({ name: "", email: "" });
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const teamLeader = useMemo(
    () => user?.firstName + " " + user?.lastName,
    [user]
  );

  const handleAddMember = () => {
    if (
      newMember.name.trim() &&
      newMember.email.trim() &&
      !members.some((m) => m.email === newMember.email)
    ) {
      setMembers([...members, newMember]);
      setNewMember({ name: "", email: "" });
    }
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleVideoUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const MAX_SIZE = 50 * 1024 * 1024;

      if (file.size > MAX_SIZE) {
        showWarning(t("submissionPage.Video Too Big!"));
        return;
      }
      setVideo(files[0]);
    }
  };

  const handleImageUpload = (files: File[]) => {
    const remainingSlots = 10 - image.length;
    if (remainingSlots > 0) {
      const filesToAdd = files.slice(0, remainingSlots);
      setImage((prev) => [...prev, ...filesToAdd]);
      if (files.length > remainingSlots) {
        showWarning(
          t(
            "submissionPage.Maximum 10 images allowed. Only the first {{count}} images were added.",
            { count: remainingSlots }
          )
        );
      }
    } else {
      showWarning(
        t(
          "submissionPage.Maximum 10 images allowed. Please remove some images before adding new ones."
        )
      );
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    handleImageUpload(files);
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    handleVideoUpload(files);
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (
      !projectTitle.trim() ||
      !description.trim() ||
      !repoLink.trim() ||
      !teamLeader.trim() ||
      !supervisor.trim() ||
      !course.trim() ||
      !teachingAssistantEmail.trim() ||
      !tags.trim() ||
      !technologies.trim()
    ) {
      showError(t("submissionPage.Error: Please fill in all required fields."));
      return;
    }

    // Validate GitHub repository URL
    if (!isValidGitHubUrl(repoLink)) {
      showError(t("submissionPage.Error: Please enter a valid GitHub repository URL."));
      return;
    }

    // Validate live URL if provided
    if (liveUrl.trim() && !isValidUrl(liveUrl)) {
      showError(t("submissionPage.Error: Please enter a valid live URL."));
      return;
    }

    try {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTimeRef.current;

      if (timeSinceLastRequest < COOLDOWN_MS) {
        return;
      }

      lastRequestTimeRef.current = now;

      // Upload images if any
      let imageUrls: string[] = [];
      if (image.length > 0) {
        setIsImageUploading(true);
        const imageResponse = await uploadImage.mutateAsync(image);
        if ("urls" in imageResponse) {
          imageUrls = imageResponse.urls;
        } else if ("url" in imageResponse) {
          imageUrls = [imageResponse.url];
        }
        setIsImageUploading(false);
      }

      // Upload video if one is selected
      const videoUrls: string[] = [];
      if (video) {
        setIsVideoUploading(true);
        const videoResponse = await uploadVideo.mutateAsync(video);
        videoUrls.push(videoResponse.url);
        setIsVideoUploading(false);
      }

      // Prepare form data with uploaded URLs
      const formData = {
        title: projectTitle,
        description,
        technologies: technologies
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        teamLeader: { name: teamLeader.trim(), email: user?.email! },
        teamMembers: members.filter((m) => m.name.trim() && m.email.trim()),
        supervisor,
        stars: 0,
        status: "pending-ta",
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        course,
        teachingAssistant: teachingAssistantEmail,
        images: imageUrls,
        videos: videoUrls,
        repoUrl: repoLink,
        liveUrl,
      };
      // Create project with uploaded media URLs
      createProject.mutate(formData, {
        onSuccess: () => {
          showSuccess(t("submissionPage.Project submitted successfully!"));
          setCourse("");
          setDescription("");
          setImage([]);
          setLiveUrl("");
          setMembers([]);
          setProjectTitle("");
          setRepoLink("");
          setSupervisor("");
          setTags("");
          setTechnologies("");
          setTeachingAssistantEmail("");
          setVideo(null);
          navigate("/");
          sendEmail.mutate({
            to: teachingAssistantEmail,
            subject: requestProjectToTAEmail.subject,
            html: requestProjectToTAEmail.html,
          });
        },
        onError: (error) => {
          console.error("Failed to create project:", error);
          showError(
            t("submissionPage.Failed to submit project. Please try again.")
          );
        },
      });
    } catch (error) {
      console.error("Failed to upload media:", error);
      showError(
        t("submissionPage.Failed to upload media files. Please try again.")
      );
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--background-light)",
        py: 4,
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 1200,
          mx: "auto",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(106, 27, 154, 0.15)",
          bgcolor: "white",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header Section */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: "var(--accent)",
            }}
          >
            {t("submissionPage.Submit Project")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "text.secondary",
            }}
          >
            {t(
              "submissionPage.Add your project details and media to NU Project Showcaser"
            )}
          </Typography>

          {/* Two-Column Layout */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Left Column - Project Details Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <ProjectDetailsCard
                projectTitle={projectTitle}
                description={description}
                repoLink={repoLink}
                liveUrl={liveUrl}
                supervisor={supervisor}
                course={course}
                teachingAssistantEmail={teachingAssistantEmail}
                technologies={technologies}
                tags={tags}
                onProjectTitleChange={setProjectTitle}
                onDescriptionChange={setDescription}
                onRepoLinkChange={setRepoLink}
                onLiveUrlChange={setLiveUrl}
                onSupervisorChange={setSupervisor}
                onCourseChange={setCourse}
                onTeachingAssistantEmailChange={setTeachingAssistantEmail}
                onTechnologiesChange={setTechnologies}
                onTagsChange={setTags}
              />
            </Grid>

            {/* Right Column - Team Members Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TeamMembersCard
                teamLeader={teamLeader}
                teamLeaderEmail={user?.email!}
                members={members}
                newMember={newMember}
                onNewMemberChange={setNewMember}
                onAddMember={handleAddMember}
                onRemoveMember={handleRemoveMember}
              />
            </Grid>
          </Grid>

          {/* File Upload Sections - Side by Side */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Images Upload Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <ImageUploadCard
                images={image}
                onImageUpload={handleImageUpload}
                onImageRemove={(idx) =>
                  setImage(image.filter((_, i) => i !== idx))
                }
                onDragOver={handleDragOver}
                onDrop={handleImageDrop}
              />
            </Grid>

            {/* Video Upload Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <VideoUploadCard
                video={video}
                onVideoUpload={handleVideoUpload}
                onVideoRemove={() => setVideo(null)}
                onDragOver={handleDragOver}
                onDrop={handleVideoDrop}
              />
            </Grid>
          </Grid>

          {/* Submission Section */}
          <Box sx={{ mt: 4 }}>
            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                disabled={createProject.isPending || isImageUploading || isVideoUploading}
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "var(--accent)",
                  "&:hover": { bgcolor: "var(--primary)" },
                  fontWeight: "bold",
                  py: 1.5,
                }}
                onClick={handleSubmit}
              >
                {createProject.isPending || isImageUploading || isVideoUploading ? t("submissionPage.Submitting") : t("submissionPage.Submit Project")}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: "#9e9e9e",
                  color: "#616161",
                  "&:hover": {
                    borderColor: "#757575",
                    bgcolor: "#f5f5f5",
                  },
                  py: 1.5,
                }}
                onClick={handleCancel}
              >
                {t("submissionPage.Cancel")}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SubmitionPage;
