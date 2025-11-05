import { useTranslation } from "react-i18next";
import { Box, Button, Typography, TextField, Grid, Paper, IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CloudUpload, Add, Remove } from "@mui/icons-material";
import { useState } from "react";
interface Member {
    firstName: string;
    lastName: string;
    universityMail: string;
}

const SubmitionPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [members, setMembers] = useState<Member[]>([
        { firstName: "", lastName: "", universityMail: "" },
    ]);
    const [projectTitle, setProjectTitle] = useState("");
    const [repoLink, setRepoLink] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleAddMember = () => {
        setMembers([...members, { firstName: "", lastName: "", universityMail: "" }]);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        const formData = {
            projectTitle,
            repoLink,
            description,
            members,
            image,
        };
        console.log("Form Submitted:", formData);
        alert(t("Project submitted successfully!"));
        navigate("/");
    };

    return (
        <Box sx={{ maxWidth: 710, mx: "auto", p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
                {t("Submit Project")}
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
                {t("Project Info")}
            </Typography>

            <Typography sx={{ fontFamily: 'Arial', fontWeight: 'bold', mb: -1, mt: 3 }}>
                {t("Project Title")}
            </Typography>

            <TextField
                placeholder={t("Short Title for your Project")}
                fullWidth
                margin="normal"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
            />

            <Typography sx={{ fontFamily: 'Arial', fontWeight: 'bold', mb: -1, mt: 2 }}>
                {t("GitHub Repository Link")}
            </Typography>

            <TextField
                placeholder="https://github.com/Account-Name/Repo-Name"
                fullWidth
                margin="normal"
                value={repoLink}
                onChange={(e) => setRepoLink(e.target.value)}
            />

            <Typography sx={{ fontFamily: 'Arial', fontWeight: 'bold', mb: -1, mt: 2 }}>
                {t("Project Description")}
            </Typography>

            <TextField
                multiline
                rows={3}
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
                {t("Team Members")}
            </Typography>

            {members.map((member, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label={t("First Name")}
                            value={member.firstName}
                            onChange={(e) =>
                                handleMemberChange(index, "firstName", e.target.value)
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label={t("Last Name")}
                            value={member.lastName}
                            onChange={(e) =>
                                handleMemberChange(index, "lastName", e.target.value)
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label={t("University Email")}
                            value={member.universityMail}
                            onChange={(e) =>
                                handleMemberChange(index, "universityMail", e.target.value)
                            }
                            fullWidth
                        />
                    </Grid>
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
                {t("Add Member")}
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
                    {t("Remove Last Member")}
                </Button>
            )}

            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                {t("Attachments")}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                {t("Upload Image (Optional) — Project Logo, Screenshot, or Cover Image")}
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
                    <input type="file" hidden onChange={handleFileChange} />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                    {image ? image.name : t("Attachments")}
                </Typography>
            </Paper>

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
                {t("Submit Project")}
            </Button>
        </Box>
    );
};

export default SubmitionPage;