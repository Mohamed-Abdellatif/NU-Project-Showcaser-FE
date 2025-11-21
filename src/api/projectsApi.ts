import axios from 'axios';
import type { Project, ProjectCreatePayload, ProjectSearchParams, PaginatedProjectsResponse } from '../types';
import type { ProjectUpdatePayload } from '../types';
const API_BASE = `${import.meta.env.VITE_API_BASE}/project`;
// Project interface matching the API response


// API Response types
interface DeleteResponse {
  message: string;
}

/**
 * Search for projects using optional query parameters
 * Returns projects matching ANY of the provided criteria (OR logic)
 * @param params - Search criteria
 * @returns Array of matching projects
 */
export const searchProjects = async (
  params?: ProjectSearchParams
): Promise<Project[]> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.title) queryParams.append('title', params.title);
    if (params?.major) queryParams.append('major', params.major);
    if (params?.supervisor) queryParams.append('supervisor', params.supervisor);
    if (params?.teamMember) queryParams.append('teamMember', params.teamMember);
    if (params?.teamLeader) queryParams.append('teamLeader', params.teamLeader);

    const queryString = queryParams.toString();
    const url = queryString 
      ? `${API_BASE}/search?${queryString}` 
      : `${API_BASE}/search`;

    const response = await axios.get<Project[]>(url, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to search projects'
      );
    }
    throw error;
  }
};

/**
 * Get all projects from the database with pagination and optional filters
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 10, max: 100)
 * @param filters - Optional filter parameters (title, major, supervisor, teamMember, teamLeader, course)
 * @returns Paginated response with projects and pagination info
 */
export const getProjects = async (
  page: number = 1,
  limit: number = 10,
  filters?: Omit<ProjectSearchParams, 'page' | 'limit'>
): Promise<PaginatedProjectsResponse> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());

    // Add filter parameters if provided
    if (filters?.title) queryParams.append('title', filters.title);
    if (filters?.major) queryParams.append('major', filters.major);
    if (filters?.supervisor) queryParams.append('supervisor', filters.supervisor);
    if (filters?.teamMember) queryParams.append('teamMember', filters.teamMember);
    if (filters?.teamLeader) queryParams.append('teamLeader', filters.teamLeader);
    if (filters?.course) queryParams.append('course', filters.course);

    const response = await axios.get<PaginatedProjectsResponse>(
      `${API_BASE}/?${queryParams.toString()}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch projects'
      );
    }
    throw error;
  }
};

/**
 * Create a new project
 * @param project - Project data to create
 * @returns Created project object
 */
export const createProject = async (
  project: ProjectCreatePayload
): Promise<Project> => {
  try {
    const response = await axios.post<Project>(
      API_BASE,
      project,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to create project'
      );
    }
    throw error;
  }
};

/**
 * Update an existing project by MongoDB ObjectId
 * @param id - MongoDB ObjectId of the project
 * @param updates - Project fields to update (all optional)
 * @returns Updated project object
 */
export const updateProject = async (
  id: string,
  updates: ProjectUpdatePayload
): Promise<Project> => {
  try {
    const response = await axios.put<Project>(
      `${API_BASE}/${id}`,
      updates,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Project not found');
      }
      throw new Error(
        error.response?.data?.message || 'Failed to update project'
      );
    }
    throw error;
  }
};

/**
 * Delete a project by MongoDB ObjectId
 * @param id - MongoDB ObjectId of the project
 * @returns Success message
 */
export const deleteProject = async (id: string): Promise<string> => {
  try {
    const response = await axios.delete<DeleteResponse>(
      `${API_BASE}/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Project not found');
      }
      throw new Error(
        error.response?.data?.message || 'Failed to delete project'
      );
    }
    throw error;
  }
};

/**
 * Get a project by MongoDB ObjectId
 * @param id - MongoDB ObjectId of the project
 * @returns Project object
 */
export const getProjectById = async (id: string): Promise<Project> => {
  try {
    const response = await axios.get<Project>(`${API_BASE}/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Project not found');
      }
      throw new Error(
        error.response?.data?.message || 'Failed to get project'
      );
    }
    throw error;
  }
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<Project[]>(`${API_BASE}/featured`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to get featured projects'
      );
    }
    throw error;
  }
};

export const starProject = async (id: string, action: 'add' | 'remove'): Promise<string> => {
  try {
    const response = await axios.put<string>(
      `${API_BASE}/star/${id}`,
      { action },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to star project');
    }
    throw error;
  }
};

