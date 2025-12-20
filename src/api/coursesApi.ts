import axios from "axios";
import type { Course } from "../types";

const API_BASE = `${import.meta.env.VITE_API_BASE}/course`;

/**
 * Query parameters for filtering courses
 */
export interface CourseFilterParams {
  code?: string;
  title?: string;
}

/**
 * Get all courses from the database with optional filters
 * @param filters - Optional filters for code and/or title
 * @returns Array of courses matching the filters
 */
export const getAllCourses = async (
  filters?: CourseFilterParams
): Promise<Course[]> => {
  try {
    const params = new URLSearchParams();
    
    if (filters?.code) {
      params.append("code", filters.code);
    }
    
    if (filters?.title) {
      params.append("title", filters.title);
    }

    const url = params.toString() 
      ? `${API_BASE}/all?${params.toString()}` 
      : `${API_BASE}/all`;

    const response = await axios.get<Course[]>(url, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch courses"
      );
    }
    throw error;
  }
};
