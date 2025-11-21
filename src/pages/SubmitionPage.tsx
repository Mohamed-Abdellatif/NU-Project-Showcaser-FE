import { useTranslation } from "react-i18next";
import { Box, Button, Typography, TextField, Grid, Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CloudUpload, Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import { useCreateProject } from "../hooks/useProjects";
interface Member {
    firstName: string;
    lastName: string;
    // universityMail: string;
}

const SubmitionPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const createProject = useCreateProject();

    const [members, setMembers] = useState<Member[]>([
        // { firstName: "", lastName: "", universityMail: "" },
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
    const [liveUrl, setLiveUrl] = useState("");
    const [videos, setVideos] = useState<File[]>([]);


    const handleAddMember = () => {
        // setMembers([...members, { firstName: "", lastName: "", universityMail: "" }]);
        setMembers([...members, { firstName: "", lastName: "" }]);
    };

    const handleRemoveMember = (index: number) => {
        const updatedMembers = members.filter((_, i) => i !== index);
        setMembers(updatedMembers);
    }

    const handleMemberChange = (
        index: number,
        field: keyof Member,
        value: string
    ) => {
        const updatedMembers = [...members];
        updatedMembers[index][field] = value;
        setMembers(updatedMembers);
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newVideos = Array.from(e.target.files);
            setVideos((prev) => [...prev, ...newVideos]);
        }
    };


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files);
            setImage((prev) => [...prev, ...newImages]);
        }
    };

    const handleSubmit = () => {
        const formData = {
            title: projectTitle,
            description,
            technologies: [],
            teamLeader: members[0]?.firstName + " " + members[0]?.lastName,
            teamMembers: members.slice(1).map(m => `${m.firstName} ${m.lastName}`),
            supervisor,
            stars: 0,
            tags: [],
            course,
            images: [],
            videos: [],
            repoUrl: repoLink,
            liveUrl,
        };
        console.log("Form Submitted:", formData);
        createProject.mutate(formData, {
            onSuccess: () => {
                alert(t("submissionPage.Project submitted successfully!"));
                navigate("/");
            }
        });
        alert(t("submissionPage.Project submitted successfully!"));
        navigate("/");
    };

    return (
        <Box sx={{ maxWidth: 710, mx: "auto", p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
                {t("submissionPage.Submit Project")}
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
                {t("submissionPage.Project Info")}
            </Typography>

            <Typography sx={{ fontFamily: 'Arial', fontWeight: 'bold', mb: -1, mt: 3 }}>
                {t("submissionPage.Project Title")}
            </Typography>

            <TextField
                placeholder={t("submissionPage.Short Title for your Project")}
                fullWidth
                margin="normal"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
            />

            <Typography sx={{ fontFamily: 'Arial', fontWeight: 'bold', mb: -1, mt: 2 }}>
                {t("submissionPage.GitHub Repository Link")}
            </Typography>

            <TextField
                placeholder="https://github.com/Account-Name/Repo-Name"
                fullWidth
                margin="normal"
                value={repoLink}
                onChange={(e) => setRepoLink(e.target.value)}
            />

            <Typography sx={{ fontFamily: 'Arial', fontWeight: 'bold', mb: -1, mt: 2 }}>
                {t("submissionPage.Project Description")}
            </Typography>

            <TextField
                multiline
                rows={3}
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                {t("submissionPage.Technologies (comma separated)")}
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Python, React, Node.js"
            />

            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                {t("submissionPage.Tags (comma separated)")}
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="AI, Robotics, ML"
            />

            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                {t("submissionPage.Supervisor")}
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                placeholder="Dr. Name"
            />

            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                {t("submissionPage.Course")}
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Machine Learning"
            />

            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                {t("submissionPage.Live Demo URL (optional)")}
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://yourproject.com"
            />

            <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
                {t("submissionPage.Team Members")}
            </Typography>

            {members.map((member, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                    <Grid>
                        <TextField
                            label={t("submissionPage.First Name")}
                            value={member.firstName}
                            onChange={(e) =>
                                handleMemberChange(index, "firstName", e.target.value)
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            label={t("submissionPage.Last Name")}
                            value={member.lastName}
                            onChange={(e) =>
                                handleMemberChange(index, "lastName", e.target.value)
                            }
                            fullWidth
                        />
                    </Grid>
                    {/* <Grid>
                        <TextField
                            label={t("submissionPage.University Email")}
                            value={member.universityMail}
                            onChange={(e) =>
                                handleMemberChange(index, "universityMail", e.target.value)
                            }
                            fullWidth
                        />
                    </Grid> */}
                </Grid>
            ))}
            <Button
                startIcon={<Add />}
                onClick={handleAddMember}
                variant="outlined"
                sx={{
                    mt: 1,
                    mb: 2,
                    color: "#6A1B9A",
                    textTransform: "none",
                    borderColor: "#6A1B9A",
                    '&hover': {
                        borderColor: "#4A148C",
                        backgroundColor: "#6A1B9A",
                    }
                }}
            >
                {t("submissionPage.Add Member")}
            </Button>
            {members.length > 1 && (
                <Button
                    startIcon={<Remove />}
                    onClick={() => handleRemoveMember(members.length - 1)}
                    variant="outlined"
                    sx={{
                        mt: 1,
                        mb: 2,
                        ml: 5,
                        color: "#E53935",
                        textTransform: "none",
                        borderColor: "#E53935",
                        '&hover': {
                            borderColor: "#B71C1C",
                            backgroundColor: "#E53935",
                        }
                    }}
                >
                    {t("submissionPage.Remove Last Member")}
                </Button>
            )}

            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                {t("submissionPage.Attachments")}
            </Typography>

            <Typography variant="h6" sx={{ mt: 3 }}>
                {t("submissionPage.Videos (optional)")}
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    borderStyle: "dashed",
                    borderColor: "#B39DDB",
                    textAlign: "center",
                    p: 3,
                    mb: 2,
                }}
            >
                <IconButton component="label">
                    <CloudUpload sx={{ fontSize: 40, color: "#6A1B9A" }} />
                    <input
                        type="file"
                        accept="video/*"
                        multiple
                        hidden
                        onChange={handleVideoUpload}
                    />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                    {t("submissionPage.Drop or Select Video Files")}
                </Typography>
            </Paper>


            <Grid container spacing={2} sx={{ mb: 3 }}>
                {videos.map((videoFile, idx) => (
                    <Grid>
                        <Paper
                            elevation={2}
                            sx={{
                                width: 140,
                                p: 1,
                                textAlign: "center",
                                borderRadius: 2,
                            }}
                        >
                            <video
                                src={URL.createObjectURL(videoFile)}
                                style={{ width: "100%", borderRadius: 8 }}
                                controls
                            />
                            <Typography variant="body2" noWrap>
                                {videoFile.name}
                            </Typography>

                            <Button
                                color="error"
                                size="small"
                                onClick={() =>
                                    setVideos(videos.filter((_, i) => i !== idx))
                                }
                            >
                                {t("submissionPage.Remove Video")}
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>



            <Typography variant="body2" sx={{ mb: 1 }}>
                {t("submissionPage.Upload Image (Optional) — Project Logo, Screenshot, or Cover Image")}
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    borderStyle: "dashed",
                    borderColor: "#B39DDB",
                    textAlign: "center",
                    p: 3,
                    mb: 3,
                }}
            >
                <IconButton component="label">
                    <CloudUpload sx={{ fontSize: 40, color: "#6A1B9A" }} />
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleImageUpload}
                    />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                    {t("submissionPage.Drop or Select Image Files")}
                </Typography>
            </Paper>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                {image.map((imageFile, idx) => (
                    <Grid>
                        <Paper
                            elevation={2}
                            sx={{
                                width: 140,
                                p: 1,
                                textAlign: "center",
                                borderRadius: 2,
                            }}
                        >
                            <img
                                src={URL.createObjectURL(imageFile)}
                                style={{ width: "100%", borderRadius: 8 }}
                            />
                            <Typography variant="body2" noWrap>
                                {imageFile.name}
                            </Typography>

                            <Button
                                color="error"
                                size="small"
                                onClick={() =>
                                    setImage(image.filter((_, i) => i !== idx))
                                }
                            >
                                {t("submissionPage.Remove Image")}
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Button
                variant="contained"
                fullWidth
                sx={{
                    bgcolor: "#6A1B9A",
                    "&:hover": { bgcolor: "#7B1FA2" },
                    fontWeight: "bold",
                    py: 1.2,
                }}
                onClick={handleSubmit}
            >
                {t("submissionPage.Submit Project")}
            </Button>
        </Box>
    );
};

export default SubmitionPage;