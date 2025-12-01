import { useQuery } from '@tanstack/react-query';
import { getAllSchools } from '../api/schoolsApi';
import type { School } from '../types';

// Query keys
export const schoolKeys = {
  all: ['schools'] as const,
  lists: () => [...schoolKeys.all, 'list'] as const,
  list: () => [...schoolKeys.lists()] as const,
};

/**
 * Hook to fetch all schools
 * @returns Query result with array of schools
 */
export const useSchools = () => {
  return useQuery<School[], Error>({
    queryKey: schoolKeys.list(),
    queryFn: getAllSchools,
  });
};

