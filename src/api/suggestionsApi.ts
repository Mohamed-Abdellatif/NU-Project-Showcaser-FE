import axios from "axios";
import type { Suggestion, SuggestionCreatePayload } from "../types";

const API_BASE = `${import.meta.env.VITE_API_BASE}/suggestion`;

/**
 * Create a new suggestion
 * @param suggestion - Suggestion data to create
 * @returns Created suggestion object
 */
export const createSuggestion = async (
  suggestion: SuggestionCreatePayload
): Promise<Suggestion> => {
  try {
    const response = await axios.post<Suggestion>(API_BASE, suggestion, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create suggestion"
      );
    }
    throw error;
  }
};

/**
 * Get all suggestions from the database
 * @returns Array of all suggestions
 */
export const getAllSuggestions = async (): Promise<Suggestion[]> => {
  try {
    const response = await axios.get<Suggestion[]>(`${API_BASE}/all`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch suggestions"
      );
    }
    throw error;
  }
};

/**
 * Get a suggestion by ID
 * @param id - Suggestion ID
 * @returns Suggestion object
 */
export const getSuggestionById = async (id: string): Promise<Suggestion> => {
  try {
    const response = await axios.get<Suggestion>(`${API_BASE}/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Suggestion not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to get suggestion"
      );
    }
    throw error;
  }
};

