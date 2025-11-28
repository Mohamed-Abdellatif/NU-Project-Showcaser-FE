import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUserById,
  updateUser,
  completeProfile,
  getCurrentUser,
  type UserUpdatePayload,
  type CompleteProfilePayload,
} from '../api/userApi';
import type { User } from '../types';
import { authKeys } from './useAuth';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

/**
 * Hook to fetch user by ID
 * @param userId - User ID to fetch
 * @returns Query result with user object
 */
export const useGetUser = (userId: string | undefined) => {
  return useQuery<User, Error>({
    queryKey: userKeys.detail(userId || ''),
    queryFn: () => {
      if (!userId) {
        throw new Error('User ID is required');
      }
      return getUserById(userId);
    },
    enabled: !!userId,
  });
};

/**
 * Hook to fetch current user's profile
 * @returns Query result with current user object
 */
export const useGetCurrentUser = () => {
  return useQuery<User, Error>({
    queryKey: userKeys.me(),
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // Consider user data fresh for 5 minutes
  });
};

/**
 * Hook to update current user's profile
 * @returns Mutation hook for updating user profile
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UserUpdatePayload>({
    mutationFn: updateUser,
    onSuccess: (data) => {
      // Invalidate and refetch current user data
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(data._id) });
      // Also invalidate auth to refresh user data in auth context
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};

/**
 * Hook to complete user profile (for initial profile setup)
 * @returns Mutation hook for completing profile
 */
export const useCompleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, CompleteProfilePayload>({
    mutationFn: completeProfile,
    onSuccess: (data) => {
      // Invalidate and refetch current user data
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(data._id) });
      // Also invalidate auth to refresh user data in auth context
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};

