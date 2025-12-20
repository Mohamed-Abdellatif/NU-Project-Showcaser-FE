import { useQuery } from '@tanstack/react-query';
import { getAllCourses, type CourseFilterParams } from '../api/coursesApi';
import type { Course } from '../types';

// Query keys
export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (filters?: CourseFilterParams) => [...courseKeys.lists(), filters] as const,
};

/**
 * Hook to fetch all courses with optional filters
 * @param filters - Optional filters for code and/or title (case-insensitive, partial match)
 * @returns Query result with array of courses
 * 
 * @example
 * // Get all courses
 * const { data } = useCourses();
 * 
 * @example
 * // Filter by code
 * const { data } = useCourses({ code: 'CS101' });
 * 
 * @example
 * // Filter by title
 * const { data } = useCourses({ title: 'Computer' });
 * 
 * @example
 * // Filter by code OR title
 * const { data } = useCourses({ code: 'CS', title: 'Math' });
 */
export const useCourses = (filters?: CourseFilterParams) => {
  return useQuery<Course[], Error>({
    queryKey: courseKeys.list(filters),
    queryFn: () => getAllCourses(filters),
  });
};
