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
import { useState } from "react";
import { useCreateProject } from "../hooks/useProjects";
import { useUploadImage, useUploadVideo } from "../hooks/useMedia";
import type { Member } from "../types/submission";
import ProjectDetailsCard from "../components/ProjectDetailsCard/ProjectDetailsCard";
import TeamMembersCard from "../components/TeamMembersCard/TeamMembersCard";
import ImageUploadCard from "../components/ImageUploadCard/ImageUploadCard";
import VideoUploadCard from "../components/VideoUploadCard/VideoUploadCard";
import { useToastContext } from "../contexts/ToastContext";

const SubmitionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useToastContext();

  const createProject = useCreateProject();
  const uploadImage = useUploadImage();
  const uploadVideo = useUploadVideo();

  const [members, setMembers] = useState<Member[]>([
    { firstName: "", lastName: "" },
  ]);
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
  const [newMemberName, setNewMemberName] = useState("");
  const [teamLeaderFirstName, setTeamLeaderFirstName] = useState("");
  const [teamLeaderLastName, setTeamLeaderLastName] = useState("");

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      const nameParts = newMemberName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      setMembers([...members, { firstName, lastName }]);
      setNewMemberName("");
    }
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleVideoUpload = (files: File[]) => {
    if (files.length > 0) {
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
      !repoLink.trim() ||
      !teamLeaderFirstName.trim() ||
      !teamLeaderLastName.trim()
    ) {
      showError(t("submissionPage.Error: Please fill in all required fields."));
      return;
    }

    try {
      // Upload images if any
      let imageUrls: string[] = [];
      if (image.length > 0) {
        const imageResponse = await uploadImage.mutateAsync(image);
        if ("urls" in imageResponse) {
          imageUrls = imageResponse.urls;
        } else if ("url" in imageResponse) {
          imageUrls = [imageResponse.url];
        }
      }

      // Upload video if one is selected
      const videoUrls: string[] = [];
      if (video) {
        const videoResponse = await uploadVideo.mutateAsync(video);
        videoUrls.push(videoResponse.url);
      }

      // Prepare form data with uploaded URLs
      const formData = {
        title: projectTitle,
        description,
        technologies: technologies
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        teamLeader: `${teamLeaderFirstName} ${teamLeaderLastName}`.trim(),
        teamMembers: members
          .map((m) => `${m.firstName} ${m.lastName}`.trim())
          .filter((m) => m.length > 0),
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

      console.log("Form Submitted:", formData);

      // Create project with uploaded media URLs
      createProject.mutate(formData, {
        onSuccess: () => {
          showSuccess(t("submissionPage.Project submitted successfully!"));
          setTimeout(() => {
            navigate("/");
          }, 2000);
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
        bgcolor: "#f5f5f5",
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
              color: "#6a1b9a",
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
                teamLeaderFirstName={teamLeaderFirstName}
                teamLeaderLastName={teamLeaderLastName}
                members={members}
                newMemberName={newMemberName}
                onTeamLeaderFirstNameChange={setTeamLeaderFirstName}
                onTeamLeaderLastNameChange={setTeamLeaderLastName}
                onNewMemberNameChange={setNewMemberName}
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
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#6a1b9a",
                  "&:hover": { bgcolor: "#7b1fa2" },
                  fontWeight: "bold",
                  py: 1.5,
                }}
                onClick={handleSubmit}
              >
                {t("submissionPage.Submit Project")}
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
                Cancel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SubmitionPage;
