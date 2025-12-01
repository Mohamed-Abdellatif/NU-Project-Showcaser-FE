import axios from "axios";
import type { School } from "../types";

const API_BASE = `${import.meta.env.VITE_API_BASE}/school`;

/**
 * Get all schools from the database
 * @returns Array of all schools
 */
export const getAllSchools = async (): Promise<School[]> => {
  try {
    const response = await axios.get<School[]>(`${API_BASE}/all`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch schools"
      );
    }
    throw error;
  }
};

