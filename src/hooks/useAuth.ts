import { useQuery } from '@tanstack/react-query';
import { checkAuth, type AuthMeResponse } from '../api/authApi';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

/**
 * Hook to check authentication status and get current user
 * @returns Query result with authentication status and user object
 */
export const useAuth = () => {
  return useQuery<AuthMeResponse, Error>({
    queryKey: authKeys.me(),
    queryFn: checkAuth,
    retry: false, // Don't retry on auth failures
    staleTime: 5 * 60 * 1000, // Consider auth status fresh for 5 minutes
  });
};

