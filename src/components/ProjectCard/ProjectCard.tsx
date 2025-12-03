import React from 'react';
import {
  Box,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Link,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star } from '@mui/icons-material';
import {
  Code as CodeIcon,
  CameraAlt as CameraIcon,
  Folder as FolderIcon,
  GridView as GridIcon,
  ViewList as ListIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import GlassCard from '../GlassCard/GlassCard';
import type { Project } from '../../types';
import { useTranslation } from 'react-i18next';
interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
}

// Icon mapping based on project title or course
const getProjectIcon = (title: string, course?: string): React.ReactNode => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('code') || titleLower.includes('lens')) return <CodeIcon />;
  if (titleLower.includes('camera') || titleLower.includes('image')) return <CameraIcon />;
  if (titleLower.includes('grid')) return <GridIcon />;
  if (titleLower.includes('list')) return <ListIcon />;
  if (titleLower.includes('folder') || titleLower.includes('file')) return <FolderIcon />;
  return <SettingsIcon />;
};
const ProjectCard = ({ project, viewMode }: ProjectCardProps) => {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageError = () => {
    if (imageIndex === 0 && project.images?.[1]) {
      setImageIndex(1);
    }
  };

  const getImageSrc = () => {
    if (project.images?.[imageIndex]) {
      return project.images[imageIndex];
    }
    return `https://placehold.co/600x400/5986D9/FFF?text=${project.title}`;
  };

  const renderStars = (count: number) => {
    const stars = [];
    const fullStars = Math.floor(count);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          sx={{
            fontSize: '16px',
            color: i < fullStars ? 'var(--golden-yellow)' : '#E0E0E0',
          }}
        />
      );
    }
    return stars;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on "View Project" link
    if ((e.target as HTMLElement).closest('.view-project-link')) {
      return;
    }
    navigate(`/projects/${project._id}`);
  };
    const { t } = useTranslation();

  return (

    <GlassCard
      elevation="medium"
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: viewMode === 'list' ? 'row' : 'column',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(232, 241, 254, 0.6) 100%)',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.15)',
        },
        ...(viewMode === 'list' && {
          flexDirection: 'row',
          alignItems: 'stretch',
        }),
      }}
    >
      <Box sx={{ position: 'relative', width: viewMode === 'list' ? 300 : '100%' }}>
        <CardMedia
          component="img"
          image={getImageSrc()}
          alt={project.title}
          onError={handleImageError}
          sx={{
            width: '100%',
            height: viewMode === 'list' ? '100%' : 200,
            objectFit: 'cover',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: viewMode === 'list' ? 0 : '24px',
            borderBottomLeftRadius: viewMode === 'list' ? '24px' : 0,
          }}
        />
        {/* Icon on top-left */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            width: 40,
            height: 40,
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {getProjectIcon(project.title, project.course)}
        </Box>
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          p: 3,
          ...(viewMode === 'list' && {
            justifyContent: 'center',
            paddingLeft: 4,
          }),
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontFamily: 'Inter, Poppins, system-ui, sans-serif',
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontSize: '1.1rem',
              flex: 1,
              textTransform: 'capitalize',
            }}
          >
            {project.title}
          </Typography>
        </Box>

        {/* Course Code Pill */}
        {project.course && (
          <Chip
            label={project.course}
            size="small"
            sx={{
              width: 'fit-content',
              height: '24px',
              bgcolor: 'var(--primary)',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 600,
              fontFamily: 'Inter, Poppins, system-ui, sans-serif',
              '& .MuiChip-label': {
                px: 1.5,
              },
            }}
          />
        )}

        {/* Star Ratings */}
        {project.stars !== undefined && project.stars > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
            {renderStars(project.stars)}
          </Box>
        )}

        {/* View Project Link */}
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            className="view-project-link"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/projects/${project._id}`);
            }}
            sx={{
              fontFamily: 'Inter, Poppins, system-ui, sans-serif',
              fontSize: '0.875rem',
              color: 'var(--primary)',
              fontWeight: 600,
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {t('View Project')}
          </Link>
        </Box>
      </CardContent>
    </GlassCard>
  );
};

export default ProjectCard;
