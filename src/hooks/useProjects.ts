import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getProjects, 
  searchProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  getProjectById,
  getFeaturedProjects,
  starProject
} from '../api/projectsApi';
import type { 
  Project, 
  ProjectSearchParams, 
  ProjectCreatePayload, 
  ProjectUpdatePayload,
  PaginatedProjectsResponse
} from '../types';
import { authKeys } from './useAuth';

// Query keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params?: ProjectSearchParams) => [...projectKeys.lists(), params] as const,
  listPaginated: (page?: number, limit?: number, filters?: Omit<ProjectSearchParams, 'page' | 'limit'>) => 
    [...projectKeys.lists(), 'paginated', page, limit, filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  featured: () => [...projectKeys.all, 'featured'] as const,
};

/**
 * Hook to fetch all projects with pagination and optional filters
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 10)
 * @param filters - Optional filter parameters (title, major, supervisor, teamMember, teamLeader, course)
 */
export const useProjects = (
  page: number = 1, 
  limit: number = 10,
  filters?: Omit<ProjectSearchParams, 'page' | 'limit'>
) => {
  return useQuery<PaginatedProjectsResponse, Error>({
    queryKey: projectKeys.listPaginated(page, limit, filters),
    queryFn: () => getProjects(page, limit, filters),
  });
};

export const useFeaturedProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: projectKeys.featured(),
    queryFn: getFeaturedProjects,
  });
};

/**
 * Hook to search projects with optional parameters and pagination
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

export const useStarProject = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, { id: string; action: 'add' | 'remove' }>({
    mutationFn: ({ id, action }: { id: string; action: 'add' | 'remove' }) => starProject(id, action),
    onSuccess: (_data: string, variables: { id: string; action: 'add' | 'remove' }) => {
      // Invalidate the specific project detail and all lists
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
