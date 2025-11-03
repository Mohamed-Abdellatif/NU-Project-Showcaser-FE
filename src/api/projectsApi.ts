import axios from 'axios';
import type { Project, ProjectCreatePayload, ProjectSearchParams } from '../types';
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
 * Get all projects from the database
 * @returns Array of all projects
 */
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<Project[]>(API_BASE, {
      withCredentials: true,
    });

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
// Export all API functions
export const projectsApi = {
  searchProjects,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
};
