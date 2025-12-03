import { Card, CardContent, Typography, Grid, TextField, Box, Chip, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import type { Member } from "../../types/index";

interface TeamMembersCardProps {
    teamLeader: string;
    teamLeaderEmail: string;
    members: Member[];
    newMember: Member;
    onNewMemberChange: (value: Member) => void;
    onAddMember: () => void;
    onRemoveMember: (index: number) => void;
}

const TeamMembersCard = ({
    teamLeader,
    members,
    newMember,
    onNewMemberChange,
    onAddMember,
    onRemoveMember,
    teamLeaderEmail,
}: TeamMembersCardProps) => {
    const { t, i18n } = useTranslation();
    const currentDir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newErrors: { name?: string; email?: string } = {};
        
        if (!newMember.name.trim()) {
            newErrors.name = t("submissionPage.Name is required") || "Name is required";
        }
        
        if (!newMember.email.trim()) {
            newErrors.email = t("submissionPage.Email is required") || "Email is required";
        } else if (!validateEmail(newMember.email)) {
            newErrors.email = t("submissionPage.Please enter a valid email address") || "Please enter a valid email address";
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setErrors({});
        onAddMember();
    };

    const handleNameChange = (value: string) => {
        onNewMemberChange({ name: value, email: newMember.email });
        if (errors.name) {
            setErrors({ ...errors, name: undefined });
        }
    };

    const handleEmailChange = (value: string) => {
        onNewMemberChange({ name: newMember.name, email: value });
        if (errors.email) {
            setErrors({ ...errors, email: undefined });
        }
    };

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
                        color: "var(--accent)",
                    }}
                >
                    {t("submissionPage.Team Members")}
                </Typography>

                {/* Team Leader */}
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "medium" }}>
                    {t("submissionPage.Team Leader")}
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            label={t("submissionPage.name")}
                            fullWidth
                            required
                            value={teamLeader ? `${teamLeader.split(" ")[0]} ${teamLeader.split(" ")[1]}` : ""}
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
                            disabled
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            label={t("submissionPage.email")}
                            fullWidth
                            required
                            value={teamLeaderEmail}
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
                            disabled
                        />
                    </Grid>
                </Grid>

                {/* Team Members as Chips */}
                <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {members.map((member, index) => {
                        const fullName = `${member.name}`.trim();
                        const email = `${member.email}`.trim();
                        if (!fullName) return null;
                        return (
                            <Chip
                                key={index}
                                label={`${fullName} (${email})`}
                                onDelete={() => onRemoveMember(index)}
                                sx={{
                                    bgcolor: "var(--background-light)",
                                    color: "var(--accent)",
                                    "& .MuiChip-deleteIcon": {
                                        color: "var(--accent)",
                                    },
                                }}
                            />
                        );
                    })}
                </Box>

                {/* Add Member Form */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", gap: 1, mb: 2, alignItems: "flex-start" }}
                >
                    <TextField
                        placeholder={t("submissionPage.Enter member name")}
                        fullWidth
                        size="small"
                        value={newMember.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                        sx={{
                            "& .MuiInputBase-input": {
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
                        placeholder={t("submissionPage.Enter member email")}
                        fullWidth
                        size="small"
                        value={newMember.email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        type="email"
                        required
                        sx={{
                            "& .MuiInputBase-input": {
                                direction: currentDir,
                            },
                        }}
                        slotProps={{
                            input: {
                                dir: currentDir,
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Add />}
                        size="small"
                        sx={{
                            bgcolor: "var(--accent)",
                            "&:hover": { bgcolor: "var(--primary)" },
                            minWidth: "auto",
                            px: 2,
                            whiteSpace: "nowrap",
                            height: "39px",
                        }}
                    >
                        {t("submissionPage.Add Member")}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TeamMembersCard;

