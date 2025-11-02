import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import type { Project } from '../../types';
import { useNavigate } from "react-router-dom";
interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
}

const ProjectCard = ({ project, viewMode }: ProjectCardProps) => {

  const navigate = useNavigate();


  return (
    <Card
      onClick={() => navigate(`/projects/${project.id}`)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: viewMode === 'list' ? 'row' : 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 6,
        },
        borderRadius: 2,
        ...(viewMode === 'list' && {
          flexDirection: 'row',
          alignItems: 'stretch',
          '& .MuiCardContent-root': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }),
      }}
    >
      <CardMedia
        component="img"
        image={project.images?.[0]}
      alt={project.title}
      sx={{
        width: viewMode === 'list' ? 300 : '100%',
        height: viewMode === 'list' ? 300 : 300,
        objectFit: 'cover'
      }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          ...(viewMode === 'list' && {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 3,
            paddingLeft: 4,
          }),
        }}
      >
        <Typography variant="h6" component="h2">
          {project.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 'auto' }}
        >
          {project.course}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
