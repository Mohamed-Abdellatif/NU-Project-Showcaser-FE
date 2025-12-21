import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import axios from 'axios';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  searchProjects,
  getFeaturedProjects,
  starProject,
  getStarredProjects,
} from '../projectsApi';
import type { Project, ProjectCreatePayload } from '../../types';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('projectsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProject: Project = {
    _id: 'proj123',
    title: 'Test Project',
    description: 'A test project',
    technologies: ['React', 'TypeScript'],
    teamLeader: { name: 'Leader', email: 'leader@nu.edu.eg' },
    teamMembers: [{ name: 'Member', email: 'member@nu.edu.eg' }],
    supervisor: 'Dr. Smith',
    stars: 5,
    tags: ['web'],
    images: [],
    videos: [],
    createdAt: new Date().toISOString(),
    course: 'CS101',
    repoUrl: 'https://github.com/test/project',
    teachingAssistant: 'TA Name',
  };

  describe('getProjects', () => {
    it('should fetch projects with pagination', async () => {
      const mockResponse = {
        data: {
          projects: [mockProject],
          pagination: {
            page: 1,
            limit: 10,
            total: 1,
            totalPages: 1,
          },
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getProjects(1, 10);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('page=1'),
        expect.objectContaining({ withCredentials: true })
      );
    });

    it('should include filters in query parameters', async () => {
      const mockResponse = {
        data: {
          projects: [mockProject],
          pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      await getProjects(1, 10, {
        title: 'Test',
        major: 'Computer Science',
        supervisor: 'Dr. Smith',
      });

      const callUrl = mockedAxios.get.mock.calls[0][0] as string;
      expect(callUrl).toContain('title=Test');
      expect(callUrl).toContain('major=Computer+Science');
      expect(callUrl).toContain('supervisor=Dr.+Smith');
    });

    it('should throw error on API failure', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          data: { message: 'Failed to fetch' },
        },
      };

      mockedAxios.get.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError = jest.fn().mockReturnValue(true) as any;

      await expect(getProjects()).rejects.toThrow('Failed to fetch');
    });
  });

  describe('getProjectById', () => {
    it('should fetch a single project by ID', async () => {
      const mockResponse = { data: mockProject };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getProjectById('proj123');

      expect(result).toEqual(mockProject);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/proj123'),
        expect.objectContaining({ withCredentials: true })
      );
    });

    it('should throw specific error for 404', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 404,
          data: {},
        },
      };

      mockedAxios.get.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError = jest.fn().mockReturnValue(true) as any;

      await expect(getProjectById('invalid-id')).rejects.toThrow('Project not found');
    });
  });

  describe('createProject', () => {
    it('should create a new project', async () => {
      const newProject: ProjectCreatePayload = {
        title: 'New Project',
        description: 'Description',
        teamLeader: { name: 'Leader', email: 'leader@nu.edu.eg' },
        supervisor: 'Dr. Smith',
      };

      const mockResponse = { data: { ...mockProject, ...newProject } };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createProject(newProject);

      expect(result.title).toBe(newProject.title);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        newProject,
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
      );
    });

    it('should throw error on creation failure', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          data: { message: 'Validation error' },
        },
      };

      mockedAxios.post.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError = jest.fn().mockReturnValue(true) as any;

      const newProject: ProjectCreatePayload = {
        title: '',
        description: '',
        teamLeader: { name: '', email: '' },
        supervisor: '',
      };

      await expect(createProject(newProject)).rejects.toThrow('Validation error');
    });
  });

  describe('updateProject', () => {
    it('should update an existing project', async () => {
      const updates = { title: 'Updated Title' };
      const mockResponse = { data: { ...mockProject, ...updates } };

      mockedAxios.put.mockResolvedValue(mockResponse);

      const result = await updateProject('proj123', updates);

      expect(result.title).toBe('Updated Title');
      expect(mockedAxios.put).toHaveBeenCalledWith(
        expect.stringContaining('/proj123'),
        updates,
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
      );
    });

    it('should throw specific error for 404', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 404,
          data: {},
        },
      };

      mockedAxios.put.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError = jest.fn().mockReturnValue(true) as any;

      await expect(updateProject('invalid-id', { title: 'New' })).rejects.toThrow(
        'Project not found'
      );
    });
  });

  describe('deleteProject', () => {
    it('should delete a project', async () => {
      const mockResponse = { data: { message: 'Project deleted successfully' } };

      mockedAxios.delete.mockResolvedValue(mockResponse);

      const result = await deleteProject('proj123');

      expect(result).toBe('Project deleted successfully');
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        expect.stringContaining('/proj123'),
        expect.objectContaining({ withCredentials: true })
      );
    });

    it('should throw specific error for 404', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 404,
          data: {},
        },
      };

      mockedAxios.delete.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError = jest.fn().mockReturnValue(true) as any;

      await expect(deleteProject('invalid-id')).rejects.toThrow('Project not found');
    });
  });

  describe('searchProjects', () => {
    it('should search projects with parameters', async () => {
      const mockResponse = { data: [mockProject] };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await searchProjects({
        title: 'Test',
        technology: 'React',
      });

      expect(result).toEqual([mockProject]);
      const callUrl = mockedAxios.get.mock.calls[0][0] as string;
      expect(callUrl).toContain('search');
      expect(callUrl).toContain('title=Test');
      expect(callUrl).toContain('technology=React');
    });

    it('should work without parameters', async () => {
      const mockResponse = { data: [mockProject] };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await searchProjects();

      expect(result).toEqual([mockProject]);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringMatching(/\/search$/),
        expect.objectContaining({ withCredentials: true })
      );
    });
  });

  describe('getFeaturedProjects', () => {
    it('should fetch featured projects', async () => {
      const mockResponse = { data: [mockProject] };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getFeaturedProjects();

      expect(result).toEqual([mockProject]);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/featured'),
        expect.objectContaining({ withCredentials: true })
      );
    });

    it('should throw error on failure', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          data: { message: 'Server error' },
        },
      };

      mockedAxios.get.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError = jest.fn().mockReturnValue(true) as any;

      await expect(getFeaturedProjects()).rejects.toThrow('Server error');
    });
  });

  describe('starProject', () => {
    it('should add star to a project', async () => {
      const mockResponse = { data: 'Project starred successfully' };

      mockedAxios.put.mockResolvedValue(mockResponse);

      const result = await starProject('proj123', 'add');

      expect(result).toBe('Project starred successfully');
      expect(mockedAxios.put).toHaveBeenCalledWith(
        expect.stringContaining('/star/proj123'),
        { action: 'add' },
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
      );
    });

    it('should remove star from a project', async () => {
      const mockResponse = { data: 'Project unstarred successfully' };

      mockedAxios.put.mockResolvedValue(mockResponse);

      const result = await starProject('proj123', 'remove');

      expect(result).toBe('Project unstarred successfully');
      expect(mockedAxios.put).toHaveBeenCalledWith(
        expect.stringContaining('/star/proj123'),
        { action: 'remove' },
        expect.any(Object)
      );
    });
  });

  describe('getStarredProjects', () => {
    it('should fetch starred projects', async () => {
      const mockResponse = { data: [mockProject] };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getStarredProjects();

      expect(result).toEqual([mockProject]);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/starred'),
        expect.objectContaining({ withCredentials: true })
      );
    });

    it('should throw error on failure', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          data: { message: 'Unauthorized' },
        },
      };

      mockedAxios.get.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError = jest.fn().mockReturnValue(true) as any;

      await expect(getStarredProjects()).rejects.toThrow('Unauthorized');
    });
  });
});
