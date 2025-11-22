import { Card, CardContent, Typography, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ProjectDetailsCardProps {
    projectTitle: string;
    description: string;
    repoLink: string;
    liveUrl: string;
    supervisor: string;
    course: string;
    teachingAssistantEmail: string;
    technologies: string;
    tags: string;
    onProjectTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onRepoLinkChange: (value: string) => void;
    onLiveUrlChange: (value: string) => void;
    onSupervisorChange: (value: string) => void;
    onCourseChange: (value: string) => void;
    onTeachingAssistantEmailChange: (value: string) => void;
    onTechnologiesChange: (value: string) => void;
    onTagsChange: (value: string) => void;
}

const ProjectDetailsCard = ({
    projectTitle,
    description,
    repoLink,
    liveUrl,
    supervisor,
    course,
    teachingAssistantEmail,
    technologies,
    tags,
    onProjectTitleChange,
    onDescriptionChange,
    onRepoLinkChange,
    onLiveUrlChange,
    onSupervisorChange,
    onCourseChange,
    onTeachingAssistantEmailChange,
    onTechnologiesChange,
    onTagsChange,
}: ProjectDetailsCardProps) => {
    const { t, i18n } = useTranslation();
    const currentDir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    return (
        <Card
            sx={{
                height: "100%",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        mb: 3,
                        color: "#6a1b9a",
                    }}
                >
                    {t("submissionPage.Project Info")}
                </Typography>

                <TextField
                    label={t("submissionPage.Project Title")}
                    placeholder={t("submissionPage.Short Title for your Project")}
                    fullWidth
                    required
                    value={projectTitle}
                    onChange={(e) => onProjectTitleChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Project Description")}
                    fullWidth
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.GitHub Repository Link")}
                    placeholder="https://github.com/Account-Name/Repo-Name"
                    fullWidth
                    required
                    value={repoLink}
                    onChange={(e) => onRepoLinkChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Live Demo URL (optional)")}
                    placeholder="https://yourproject.com"
                    fullWidth
                    value={liveUrl}
                    onChange={(e) => onLiveUrlChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Supervisor")}
                    placeholder="Dr. Name"
                    fullWidth
                    value={supervisor}
                    onChange={(e) => onSupervisorChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Course")}
                    placeholder="Machine Learning"
                    fullWidth
                    value={course}
                    onChange={(e) => onCourseChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Teaching Assistant Email")}
                    placeholder="ta@nu.edu.eg"
                    fullWidth
                    type="email"
                    value={teachingAssistantEmail}
                    onChange={(e) => onTeachingAssistantEmailChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Technologies (comma separated)")}
                    placeholder="Python, React, Node.js"
                    fullWidth
                    value={technologies}
                    onChange={(e) => onTechnologiesChange(e.target.value)}
                    dir={currentDir}
                    sx={{ 
                        mb: 2,
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />

                <TextField
                    label={t("submissionPage.Tags (comma separated)")}
                    placeholder="AI, Robotics, ML"
                    fullWidth
                    value={tags}
                    onChange={(e) => onTagsChange(e.target.value)}
                    dir={currentDir}
                    sx={{
                        direction: currentDir,
                        "& .MuiInputBase-input": {
                            direction: currentDir,
                        },
                        "& .MuiInputLabel-root": {
                            direction: currentDir,
                        },
                    }}
                    slotProps={{
                        input: {
                            dir: currentDir,
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default ProjectDetailsCard;

