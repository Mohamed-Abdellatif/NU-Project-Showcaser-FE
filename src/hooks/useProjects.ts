import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllProjects, 
  searchProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  getProjectById,
  getFeaturedProjects
} from '../api/projectsApi';
import type { 
  Project, 
  ProjectSearchParams, 
  ProjectCreatePayload, 
  ProjectUpdatePayload 
} from '../types';

// Query keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params?: ProjectSearchParams) => [...projectKeys.lists(), params] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  featured: () => [...projectKeys.all, 'featured'] as const,
};

/**
 * Hook to fetch all projects
 */
export const useProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: projectKeys.lists(),
    queryFn: getAllProjects,
  });
};

export const useFeaturedProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: projectKeys.featured(),
    queryFn: getFeaturedProjects,
  });
};

/**
 * Hook to search projects with optional parameters
 */
export const useSearchProjects = (params?: ProjectSearchParams) => {
  return useQuery<Project[], Error>({
    queryKey: projectKeys.list(params),
    queryFn: () => searchProjects(params),
    enabled: true, // Always enabled, even if params are undefined
  });
};

/**
 * Hook to create a new project
 */
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, ProjectCreatePayload>({
    mutationFn: createProject,
    onSuccess: () => {
      // Invalidate and refetch projects list after creating
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
};

/**
 * Hook to update a project
 */
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, { id: string; updates: ProjectUpdatePayload }>({
    mutationFn: ({ id, updates }: { id: string; updates: ProjectUpdatePayload }) => updateProject(id, updates),
    onSuccess: (_data: Project, variables: { id: string; updates: ProjectUpdatePayload }) => {
      // Invalidate the specific project detail and all lists
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
};

/**
 * Hook to delete a project
 */
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: deleteProject,
    onSuccess: () => {
      // Invalidate and refetch projects list after deleting
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
};

export const useGetProjectById = (id: string) => {
  return useQuery<Project, Error>({
    queryKey: projectKeys.detail(id),
    queryFn: () => getProjectById(id),
  });
};
