import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useStarProject } from "../../hooks/useProjects";
import { userAtom } from "../../atoms/authAtom";
import { useAtom } from "jotai";

interface ProjectInfoCardProps {
  course?: string;
  teamMembers?: string[];
  description: string;
  repoUrl?: string;
  stars: number;
  projectId: string;
}

export const ProjectInfoCard = ({
  course,
  teamMembers,
  description,
  repoUrl,
  stars,
  projectId,
}: ProjectInfoCardProps) => {
  const [user] = useAtom(userAtom);
  const { mutate: starProjectAction } = useStarProject();

  const liked = useMemo(() => {
    return user?.starredProjects?.includes(projectId);
  }, [user, projectId]);

  const { t } = useTranslation();
  return (
    <Card
      sx={{
        mt: 6,
        width: "90%",
        maxWidth: "900px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffcfe6 0%, #ffe4f2 100%)",
        color: "#6a2c68",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight="bold">
            {t("viewProject.projectInfo")}
          </Typography>
          {/*
           FIXME: ADD STARS TO THE PROJECT
           TODO: ADD NOIFICATION FOR THE USER WHEN THE PROJECT IS STARRED OR UNSTARRED OR UNAUTHORIZED
           */}
          <Typography variant="body1" sx={{ mb: 2 }}>stars:{stars}</Typography>
          <IconButton
            onClick={() =>
              starProjectAction({
                id: projectId,
                action: liked ? "remove" : "add",
              })
            }
          >
            {liked ? (
              <StarIcon sx={{ color: "#8b3f7f" }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>{t("viewProject.course")}:</strong> {course || "—"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>{t("viewProject.teamMembers")}:</strong>{" "}
          {(teamMembers || []).join(", ") || "—"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>{t("viewProject.Description")}:</strong> {description}
        </Typography>

        {repoUrl && (
          <Box
            display="flex"
            alignItems="center"
            mt={1}
            sx={{ cursor: "pointer", textDecoration: "underline", gap: 1 }}
            onClick={() => window.open(repoUrl, "_blank")}
          >
            <GitHubIcon sx={{ fontSize: 23, mt: 0.5 }} />
            <Typography sx={{ fontSize: 15, mt: 0.5 }} variant="body2">
              {t("viewProject.githubRepo")}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
