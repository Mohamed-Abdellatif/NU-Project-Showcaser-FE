import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getProjects, 
  searchProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  getProjectById,
  getFeaturedProjects,
  starProject,
  getStarredProjects,
  getPendingProjectsByTA,
  getRelatedProjects
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
  starred: () => [...projectKeys.all, 'starred'] as const,
  pendingByTA: (taMail: string) => [...projectKeys.all, 'pendingByTA', taMail] as const,
  related: (id: string) => [...projectKeys.all, 'related', id] as const,
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
    onSuccess: (data: Project) => {
      // Invalidate and refetch projects list after creating
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.featured() });
      queryClient.invalidateQueries({ queryKey: projectKeys.starred() });
      queryClient.invalidateQueries({ queryKey: projectKeys.pendingByTA(data.teachingAssistant ) });
    },
  });
};

/**
 * Hook to update a project
 */
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, { id: string; updates: ProjectUpdatePayload; taMail?: string }>({
    mutationFn: (vars) => {
      const { id, updates } = vars;
      return updateProject(id, updates);
    },
    onSuccess: (_data: Project, variables: { id: string; updates: ProjectUpdatePayload; taMail?: string }) => {
      // Invalidate the specific project detail and all lists
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      const taMail = variables.taMail || variables.updates.taMail;
      if (taMail) {
        queryClient.invalidateQueries({ queryKey: projectKeys.pendingByTA(taMail) });
      }
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
      queryClient.invalidateQueries({ queryKey: projectKeys.starred() });
    },
  });
};

export const useStarredProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: projectKeys.starred(),
    queryFn: getStarredProjects,
  });
};

export const useGetPendingProjectsByTA = (taMail: string | undefined) => {
  return useQuery<Project[], Error>({
    queryKey: projectKeys.pendingByTA(taMail || ''),
    queryFn: () => {
      if (!taMail) {
        throw new Error('taMail is required');
      }
      return getPendingProjectsByTA(taMail);
    },
    enabled: !!taMail,
  });
};

/**
 * Hook to get related projects by project ID
 * @param id - MongoDB ObjectId of the project
 */
export const useRelatedProjects = (id: string | undefined) => {
  return useQuery<Project[], Error>({
    queryKey: projectKeys.related(id || ''),
    queryFn: () => {
      if (!id) {
        throw new Error('Project ID is required');
      }
      return getRelatedProjects(id);
    },
    enabled: !!id,
  });
};