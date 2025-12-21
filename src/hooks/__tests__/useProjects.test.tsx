import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useProjects,
  useGetProjectById,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useFeaturedProjects,
  useStarProject,
  useStarredProjects,
} from '../useProjects';
import * as projectsApi from '../../api/projectsApi';
import { createMockProject } from '../../test-utils';
import type { ProjectCreatePayload } from '../../types';

// Mock the projectsApi module
jest.mock('../../api/projectsApi');
const mockedProjectsApi = projectsApi as jest.Mocked<typeof projectsApi>;

describe('useProjects hooks', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  describe('useProjects', () => {
    it('should fetch paginated projects successfully', async () => {
      const mockProject = createMockProject();
      const mockResponse = {
        projects: [mockProject],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      };

      mockedProjectsApi.getProjects.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useProjects(1, 10), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockResponse);
      expect(mockedProjectsApi.getProjects).toHaveBeenCalledWith(1, 10, undefined);
    });

    it('should pass filters to API call', async () => {
      const mockResponse = {
        projects: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      };

      mockedProjectsApi.getProjects.mockResolvedValue(mockResponse);

      const filters = { title: 'Test', major: 'Computer Science' };
      renderHook(() => useProjects(1, 10, filters), { wrapper });

      await waitFor(() => {
        expect(mockedProjectsApi.getProjects).toHaveBeenCalledWith(1, 10, filters);
      });
    });

    it('should handle errors', async () => {
      const mockError = new Error('Failed to fetch projects');
      mockedProjectsApi.getProjects.mockRejectedValue(mockError);

      const { result } = renderHook(() => useProjects(), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useGetProjectById', () => {
    it('should fetch a single project by ID', async () => {
      const mockProject = createMockProject({ _id: 'proj123' });
      mockedProjectsApi.getProjectById.mockResolvedValue(mockProject);

      const { result } = renderHook(() => useGetProjectById('proj123'), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockProject);
      expect(mockedProjectsApi.getProjectById).toHaveBeenCalledWith('proj123');
    });

    it('should handle project not found', async () => {
      const mockError = new Error('Project not found');
      mockedProjectsApi.getProjectById.mockRejectedValue(mockError);

      const { result } = renderHook(() => useGetProjectById('invalid-id'), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useCreateProject', () => {
    it('should create a project successfully', async () => {
      const newProject: ProjectCreatePayload = {
        title: 'New Project',
        description: 'Test description',
        teamLeader: { name: 'Leader', email: 'leader@nu.edu.eg' },
        supervisor: 'Dr. Smith',
      };

      const createdProject = createMockProject(newProject);
      mockedProjectsApi.createProject.mockResolvedValue(createdProject);

      const { result } = renderHook(() => useCreateProject(), { wrapper });

      result.current.mutate(newProject);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(createdProject);
      // React Query passes variables as first argument
      expect(mockedProjectsApi.createProject).toHaveBeenCalled();
      const callArgs = mockedProjectsApi.createProject.mock.calls[0];
      expect(callArgs[0]).toEqual(newProject);
    });

    it('should invalidate queries on success', async () => {
      const newProject: ProjectCreatePayload = {
        title: 'New Project',
        description: 'Test',
        teamLeader: { name: 'Leader', email: 'leader@nu.edu.eg' },
        supervisor: 'Dr. Smith',
      };

      const createdProject = createMockProject(newProject);
      mockedProjectsApi.createProject.mockResolvedValue(createdProject);

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useCreateProject(), { wrapper });

      result.current.mutate(newProject);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(invalidateSpy).toHaveBeenCalled();
    });
  });

  describe('useUpdateProject', () => {
    it('should update a project successfully', async () => {
      const updates = { title: 'Updated Title' };
      const updatedProject = createMockProject({ ...updates, _id: 'proj123' });
      mockedProjectsApi.updateProject.mockResolvedValue(updatedProject);

      const { result } = renderHook(() => useUpdateProject(), { wrapper });

      result.current.mutate({ id: 'proj123', updates });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(updatedProject);
      expect(mockedProjectsApi.updateProject).toHaveBeenCalledWith('proj123', updates);
    });

    it('should invalidate specific project and lists on success', async () => {
      const updates = { title: 'Updated' };
      const updatedProject = createMockProject({ _id: 'proj123' });
      mockedProjectsApi.updateProject.mockResolvedValue(updatedProject);

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useUpdateProject(), { wrapper });

      result.current.mutate({ id: 'proj123', updates });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(invalidateSpy).toHaveBeenCalled();
    });
  });

  describe('useDeleteProject', () => {
    it('should delete a project successfully', async () => {
      const successMessage = 'Project deleted successfully';
      mockedProjectsApi.deleteProject.mockResolvedValue(successMessage);

      const { result } = renderHook(() => useDeleteProject(), { wrapper });

      result.current.mutate('proj123');

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toBe(successMessage);
      // React Query passes variables as first argument
      expect(mockedProjectsApi.deleteProject).toHaveBeenCalled();
      const callArgs = mockedProjectsApi.deleteProject.mock.calls[0];
      expect(callArgs[0]).toBe('proj123');
    });

    it('should invalidate queries on success', async () => {
      mockedProjectsApi.deleteProject.mockResolvedValue('Deleted');

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useDeleteProject(), { wrapper });

      result.current.mutate('proj123');

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(invalidateSpy).toHaveBeenCalled();
    });
  });

  describe('useFeaturedProjects', () => {
    it('should fetch featured projects', async () => {
      const mockProjects = [createMockProject(), createMockProject({ _id: 'proj2' })];
      mockedProjectsApi.getFeaturedProjects.mockResolvedValue(mockProjects);

      const { result } = renderHook(() => useFeaturedProjects(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockProjects);
      expect(mockedProjectsApi.getFeaturedProjects).toHaveBeenCalled();
    });
  });

  describe('useStarProject', () => {
    it('should star a project', async () => {
      const successMessage = 'Project starred';
      mockedProjectsApi.starProject.mockResolvedValue(successMessage);

      const { result } = renderHook(() => useStarProject(), { wrapper });

      result.current.mutate({ id: 'proj123', action: 'add' });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toBe(successMessage);
      expect(mockedProjectsApi.starProject).toHaveBeenCalledWith('proj123', 'add');
    });

    it('should unstar a project', async () => {
      const successMessage = 'Project unstarred';
      mockedProjectsApi.starProject.mockResolvedValue(successMessage);

      const { result } = renderHook(() => useStarProject(), { wrapper });

      result.current.mutate({ id: 'proj123', action: 'remove' });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockedProjectsApi.starProject).toHaveBeenCalledWith('proj123', 'remove');
    });

    it('should invalidate multiple queries on success', async () => {
      mockedProjectsApi.starProject.mockResolvedValue('Success');

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useStarProject(), { wrapper });

      result.current.mutate({ id: 'proj123', action: 'add' });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // Should invalidate project detail, lists, auth, starred, and featured
      // React Query may call invalidateQueries multiple times
      expect(invalidateSpy.mock.calls.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('useStarredProjects', () => {
    it('should fetch starred projects', async () => {
      const mockProjects = [createMockProject()];
      mockedProjectsApi.getStarredProjects.mockResolvedValue(mockProjects);

      const { result } = renderHook(() => useStarredProjects(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockProjects);
      expect(mockedProjectsApi.getStarredProjects).toHaveBeenCalled();
    });

    it('should handle empty starred projects', async () => {
      mockedProjectsApi.getStarredProjects.mockResolvedValue([]);

      const { result } = renderHook(() => useStarredProjects(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual([]);
    });
  });
});
