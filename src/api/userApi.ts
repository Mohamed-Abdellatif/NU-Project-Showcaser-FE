import axios from "axios";
import type { User } from "../types";

const USER_BASE = `${import.meta.env.VITE_API_BASE}/user`;

// User update payload (partial user fields)
export interface UserUpdatePayload {
  email: string;
  linkedInUrl?: string;
  githubUrl?: string;
  universityId?: string;
  school?: string;
  major?: string;
  firstName?: string;
  lastName?: string;
}

// Complete profile payload (required fields for profile completion)
export interface CompleteProfilePayload {
  linkedInUrl: string;
  githubUrl: string;
  universityId: string;
  school: string;
  major: string;
  email: string;
}

/**
 * Get user by ID
 * @param userId - User ID
 * @returns User object
 */
export const getProfileByUserName = async (userName: string): Promise<User> => {
  try {
    const response = await axios.get<User>(`${USER_BASE}/profile/${userName}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
    throw error;
  }
};

/**
 * Update current user's profile
 * @param updates - Partial user data to update
 * @returns Updated user object
 */
export const updateUser = async (
  profileData: UserUpdatePayload
): Promise<User> => {
  try {
    const response = await axios.put<User>(
      `${USER_BASE}/update-profile`,
      profileData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update user profile"
      );
    }
    throw error;
  }
};

/**
 * Complete user profile (for initial profile setup)
 * @param profileData - Required profile data
 * @returns Updated user object
 */
export const completeProfile = async (
  profileData: CompleteProfilePayload
): Promise<User> => {
  try {
    const response = await axios.post<User>(
      `${USER_BASE}/complete-profile`,
      profileData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to complete profile"
      );
    }
    throw error;
  }
};

/**
 * Get current user's profile
 * @returns Current user object
 */
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await axios.get<User>(`${USER_BASE}/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch current user"
      );
    }
    throw error;
  }
};

export const requestDeactivateAccount = async (
  email: string
): Promise<void> => {
  try {
    await axios.put(
      `${USER_BASE}/request-deactivate`,
      { email },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to deactivate account"
      );
    }
    throw error;
  }
};
