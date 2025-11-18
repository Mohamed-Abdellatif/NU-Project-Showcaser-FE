import axios from 'axios';
import type { User } from '../types';

const AUTH_BASE = `${import.meta.env.VITE_API_BASE}/auth`;

export interface AuthMeResponse {
  authenticated: boolean;
  user: User;
}

/**
 * Check authentication status and get current user
 * @returns Authentication status and user object
 */
export const checkAuth = async (): Promise<AuthMeResponse> => {
  try {
    const response = await axios.get<AuthMeResponse>(
      `${AUTH_BASE}/me`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to check authentication'
      );
    }
    throw error;
  }
};

