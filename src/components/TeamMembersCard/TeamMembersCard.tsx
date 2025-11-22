import { Card, CardContent, Typography, Grid, TextField, Box, Chip, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { Member } from "../../types/submission";

interface TeamMembersCardProps {
    teamLeaderFirstName: string;
    teamLeaderLastName: string;
    members: Member[];
    newMemberName: string;
    onTeamLeaderFirstNameChange: (value: string) => void;
    onTeamLeaderLastNameChange: (value: string) => void;
    onNewMemberNameChange: (value: string) => void;
    onAddMember: () => void;
    onRemoveMember: (index: number) => void;
}

const TeamMembersCard = ({
    teamLeaderFirstName,
    teamLeaderLastName,
    members,
    newMemberName,
    onTeamLeaderFirstNameChange,
    onTeamLeaderLastNameChange,
    onNewMemberNameChange,
    onAddMember,
    onRemoveMember,
}: TeamMembersCardProps) => {
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
                    {t("submissionPage.Team Members")}
                </Typography>

                {/* Team Leader */}
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "medium" }}>
                    {t("submissionPage.Team Leader")}
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            label={t("submissionPage.First Name")}
                            fullWidth
                            required
                            value={teamLeaderFirstName}
                            onChange={(e) => onTeamLeaderFirstNameChange(e.target.value)}
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
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            label={t("submissionPage.Last Name")}
                            fullWidth
                            required
                            value={teamLeaderLastName}
                            onChange={(e) => onTeamLeaderLastNameChange(e.target.value)}
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
                    </Grid>
                </Grid>

                {/* Team Members as Chips */}
                <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {members.map((member, index) => {
                        const fullName = `${member.firstName} ${member.lastName}`.trim();
                        if (!fullName) return null;
                        return (
                            <Chip
                                key={index}
                                label={fullName}
                                onDelete={() => onRemoveMember(index)}
                                sx={{
                                    bgcolor: "#e1bee7",
                                    color: "#6a1b9a",
                                    "& .MuiChip-deleteIcon": {
                                        color: "#6a1b9a",
                                    },
                                }}
                            />
                        );
                    })}
                </Box>

                {/* Add Member Input */}
                <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}>
                    <TextField
                        placeholder={t("submissionPage.Enter member name")}
                        fullWidth
                        size="small"
                        value={newMemberName}
                        onChange={(e) => onNewMemberNameChange(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                onAddMember();
                            }
                        }}
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
                        variant="contained"
                        startIcon={<Add />}
                        onClick={onAddMember}
                        size="small"
                        sx={{
                            bgcolor: "#6a1b9a",
                            "&:hover": { bgcolor: "#7b1fa2" },
                            minWidth: "auto",
                            px: 2,
                            whiteSpace: "nowrap",
                            height: "40px",
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

