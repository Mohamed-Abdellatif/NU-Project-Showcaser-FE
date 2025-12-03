import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import {
  Star,
  StarBorder,
  GitHub as GitHubIcon,
  CalendarTodayOutlined,
  SchoolOutlined,
  PersonOutlineOutlined,
  PeopleOutlineOutlined,
} from "@mui/icons-material";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useStarProject } from "../../hooks/useProjects";
import { userAtom } from "../../atoms/authAtom";
import { useAtom } from "jotai";
import { useToastContext } from "../../contexts/ToastContext";
import type { Member } from "../../types";
import { useNavigate } from "react-router-dom";

interface ProjectInfoCardProps {
  course?: string;
  supervisor?: string;
  teamLeader?: Member;
  teamMembers?: Member[];
  repoUrl?: string;
  stars: number;
  projectId: string;
  description?: string;
  technologies?: string[];
  tags?: string[];
  createdAt?: string;
  isLoading?: boolean;
}
const formatName = (name) => {
  if (!name || typeof name !== 'string') return "—";
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const ProjectInfoCard = ({
  supervisor,
  teamLeader,
  teamMembers,
  repoUrl,
  stars,
  projectId,
  description,
  technologies = [],
  tags = [],
  createdAt,
  isLoading,
}: ProjectInfoCardProps) => {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const { mutate: starProjectAction, isPending: isStarring } = useStarProject();
  const liked = useMemo(
    () => user?.starredProjects?.includes(projectId),
    [user, projectId, stars, isLoading, isStarring]
  );
  const { t } = useTranslation();
  const { showWarning, showSuccess } = useToastContext();
  const lastRequestTimeRef = useRef<number>(0);
  const COOLDOWN_MS = 500; // 0.5 seconds

  const handleStarProject = () => {
    if (!user) {
      showWarning(t("viewProject.loginToStar"));
      return;
    }
    if (isStarring || isLoading) {
      return;
    }

    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTimeRef.current;

    if (timeSinceLastRequest < COOLDOWN_MS) {
      return;
    }

    lastRequestTimeRef.current = now;
    starProjectAction(
      { id: projectId, action: liked ? "remove" : "add" },
      {
        onSuccess: () => {
          showSuccess(
            liked
              ? t("viewProject.starProjectRemoved")
              : t("viewProject.starProjectAdded")
          );
        },
      }
    );
  };

  const colors = {
    textHeader: "var(--text-primary)",
    cardBg: "var(--background-lighter)",
    buttonBg: "var(--text-primary)",
    chipBg: "var(--background-light)",
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 6,
        width: "70%",
        mt: 6,
        fontFamily: "Poppins, sans-serif",
        flexWrap: "nowrap",
        justifyContent: "space-between",
      }}
    >
      <Box flex={1} minWidth="300px">
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: colors.textHeader, mb: 3 }}
        >
          {t("viewProject.aboutProject")}
        </Typography>
        <Typography
          sx={{ fontSize: "1.05rem", color: "#444", mb: 4, lineHeight: 1.7 }}
        >
          {description || t("viewProject.noDescription")}
        </Typography>

        {technologies.length > 0 && (
          <Box mb={3}>
            <Typography
              sx={{ fontWeight: 700, color: colors.textHeader, mb: 1.5 }}
            >
              {t("viewProject.technologies")}
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              {technologies.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  sx={{
                    bgcolor: colors.chipBg,
                    fontWeight: 600,
                    borderRadius: "8px",
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {tags.length > 0 && (
          <Box>
            <Typography
              sx={{ fontWeight: 700, color: colors.textHeader, mb: 1.5 }}
            >
              {t("viewProject.tags")}
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              {tags.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  sx={{
                    bgcolor: "var(--tag-background)",
                    fontWeight: 500,
                    borderRadius: "16px",
                    border: "1px solid #ebdce3",
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>

      <Card
        sx={{
          width: "350px",
          borderRadius: 3,
          background: colors.cardBg,
          flexShrink: 0,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: colors.textHeader, mb: 2 }}
          >
            {t("viewProject.projectDetails")}
          </Typography>
          <Divider sx={{ borderColor: "rgba(0,0,0,0.06)", mb: 3 }} />

          {[
            {
              icon: <CalendarTodayOutlined />,
              label: t("viewProject.created"),
              value: createdAt ? createdAt.split("T")[0] : "—",
            },
            {
              icon: <SchoolOutlined />,
              label: t("viewProject.supervisor"),
              value: formatName(supervisor) || "—",
            },
            {
              icon: <PersonOutlineOutlined />,
              label: t("viewProject.teamLeader"),
              value: formatName(teamLeader?.name) || "—",
              onClick: teamLeader ? () => {
                navigate(`/profile/${teamLeader?.email.split("@")[0]}`);
              } : undefined,
            },
            {
              icon: <PeopleOutlineOutlined />,
              label: t("viewProject.teamMembers"),
              value:
                teamMembers?.map((m) => `${m.name} (${m.email})`).join(", ") ||
                t("viewProject.none"),
            },
          ].map((row) => (
            <InfoRow key={row.label} {...row} />
          ))}

          {repoUrl && (
            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              onClick={() => window.open(repoUrl, "_blank")}
              sx={{
                mt: 4,
                width: "100%",
                py: 1.5,
                bgcolor: "var(--text-primary)",
                "&:hover": { bgcolor: "var(--text-Secondary)" },
                borderRadius: 2,
                fontWeight: 600,
                fontFamily: "Poppins",
                textTransform: "none",
              }}
            >
              <span style={{ margin: "0 10px" }}>
                {" "}
                {t("viewProject.githubRepo")}
              </span>
            </Button>
          )}

          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <IconButton
              onClick={handleStarProject}
              disabled={isStarring || isLoading}
              sx={{ padding: 1 }}
            >
              {liked ? (
                <Star sx={{ color: colors.buttonBg, fontSize: 28 }} />
              ) : (
                <StarBorder sx={{ color: colors.buttonBg, fontSize: 28 }} />
              )}
            </IconButton>
            <Typography
              sx={{ fontWeight: 700, fontSize: 16, color: colors.textHeader }}
            >
              {Number(stars).toFixed(0)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick?: () => void;
}) => (
  <Box
    sx={{
      display: "flex",
      gap: 2,
      alignItems: "flex-start",
      mb: 3,
      cursor: onClick ? "pointer" : "default",
    }}
    onClick={onClick}
  >
    <Box sx={{ mt: 0.5, color: "#4a1d45", opacity: 0.8 }}>{icon}</Box>
    <Box>
      <Typography
        sx={{
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "#4a1d45",
          opacity: 0.9,
        }}
      >
        {label}:
      </Typography>
      <Typography 
        sx={{ 
          fontSize: "1rem", 
          fontWeight: 500, 
          color: "#222",
          textDecoration: onClick ? "underline" : "none",
          "&:hover": onClick ? {
            opacity: 0.7,
          } : {},
        }}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);