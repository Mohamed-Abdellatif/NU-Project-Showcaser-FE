import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import {
  // Project Management
  getAllProjects,
  getProjectById,
  editProject,
  deleteProject,
  // User Management
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  // Comment Management
  getAllComments,
  getCommentById,
  editComment,
  deleteComment,
  // Suggestion Management
  getAllSuggestions,
  getSuggestionById,
  editSuggestion,
  deleteSuggestion,
  // School Management
  getAllSchools,
  getSchoolById,
  createSchool,
  editSchool,
  deleteSchool,
  // Course Management
  getAllCourses,
  createCourse,
  editCourse,
  deleteCourse,
  // Dashboard Stats
  getDashboardStats,
  // Types
  type ProjectUpdatePayload,
  type UserUpdatePayload,
  type CommentUpdatePayload,
  type SuggestionUpdatePayload,
  type SchoolUpdatePayload,
  type CourseCreatePayload,
  type CourseUpdatePayload,
  type PaginatedResponse,
  type ProjectFilters,
  type UserFilters,
  type CommentFilters,
  type SuggestionFilters,
  type SchoolFilters,
  type CourseFilters,
  type DashboardStats,
} from '../api/adminApi';
import type { Project, User, School, Suggestion, Course } from '../types';
import type { Comment } from '../api/commentsApi';

// Query keys for React Query
export const adminKeys = {
  // Projects
  projects: {
    all: ['admin', 'projects'] as const,
    lists: () => [...adminKeys.projects.all, 'list'] as const,
    list: (filters?: ProjectFilters) => [...adminKeys.projects.lists(), filters] as const,
    details: () => [...adminKeys.projects.all, 'detail'] as const,
    detail: (id: string) => [...adminKeys.projects.details(), id] as const,
  },
  // Users
  users: {
    all: ['admin', 'users'] as const,
    lists: () => [...adminKeys.users.all, 'list'] as const,
    list: (filters?: UserFilters) => [...adminKeys.users.lists(), filters] as const,
    details: () => [...adminKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...adminKeys.users.details(), id] as const,
  },
  // Comments
  comments: {
    all: ['admin', 'comments'] as const,
    lists: () => [...adminKeys.comments.all, 'list'] as const,
    list: (filters?: CommentFilters) => [...adminKeys.comments.lists(), filters] as const,
    details: () => [...adminKeys.comments.all, 'detail'] as const,
    detail: (id: string) => [...adminKeys.comments.details(), id] as const,
  },
  // Suggestions
  suggestions: {
    all: ['admin', 'suggestions'] as const,
    lists: () => [...adminKeys.suggestions.all, 'list'] as const,
    list: (filters?: SuggestionFilters) => [...adminKeys.suggestions.lists(), filters] as const,
    details: () => [...adminKeys.suggestions.all, 'detail'] as const,
    detail: (id: string) => [...adminKeys.suggestions.details(), id] as const,
  },
  // Schools
  schools: {
    all: ['admin', 'schools'] as const,
    lists: () => [...adminKeys.schools.all, 'list'] as const,
    list: (filters?: SchoolFilters) => [...adminKeys.schools.lists(), filters] as const,
    details: () => [...adminKeys.schools.all, 'detail'] as const,
    detail: (id: string) => [...adminKeys.schools.details(), id] as const,
  },
  // Courses
  courses: {
    all: ['admin', 'courses'] as const,
    lists: () => [...adminKeys.courses.all, 'list'] as const,
    list: (filters?: CourseFilters) => [...adminKeys.courses.lists(), filters] as const,
  },
  // Dashboard Stats
  stats: () => ['admin', 'stats'] as const,
};

// ============================================
// 1. Project Management Hooks
// ============================================

/**
 * Hook to get all projects (includes pending, approved, rejected)
 * @param filters - Optional pagination and filter parameters
 */
export const useAdminProjects = (filters?: ProjectFilters) => {
  return useQuery<PaginatedResponse<Project>, Error>({
    queryKey: adminKeys.projects.list(filters),
    queryFn: () => getAllProjects(filters),
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook to get a specific project by ID
 */
export const useAdminProjectById = (id: string) => {
  return useQuery<Project, Error>({
    queryKey: adminKeys.projects.detail(id),
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });
};

/**
 * Hook to edit/update a project
 */
export const useAdminEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, { projectId: string; updates: ProjectUpdatePayload }>({
    mutationFn: ({ projectId, updates }) => editProject(projectId, updates),
    onSuccess: (_data, variables) => {
      // Invalidate specific project and all project lists
      queryClient.invalidateQueries({ queryKey: adminKeys.projects.detail(variables.projectId) });
      queryClient.invalidateQueries({ queryKey: adminKeys.projects.lists() });
    },
  });
};

/**
 * Hook to delete a project
 */
export const useAdminDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: (projectId) => deleteProject(projectId),
    onSuccess: () => {
      // Invalidate all project lists
      queryClient.invalidateQueries({ queryKey: adminKeys.projects.lists() });
    },
  });
};

// ============================================
// 2. User Management Hooks
// ============================================

/**
 * Hook to get all users
 * @param filters - Optional pagination and filter parameters
 */
export const useAdminUsers = (filters?: UserFilters) => {
  return useQuery<PaginatedResponse<User>, Error>({
    queryKey: adminKeys.users.list(filters),
    queryFn: () => getAllUsers(filters),
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook to get a specific user by ID
 */
export const useAdminUserById = (id: string) => {
  return useQuery<User, Error>({
    queryKey: adminKeys.users.detail(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

/**
 * Hook to edit/update a user
 * Use this to change user roles to "admin"
 */
export const useAdminEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { userId: string; updates: UserUpdatePayload }>({
    mutationFn: ({ userId, updates }) => editUser(userId, updates),
    onSuccess: (_data, variables) => {
      // Invalidate specific user and all user lists
      queryClient.invalidateQueries({ queryKey: adminKeys.users.detail(variables.userId) });
      queryClient.invalidateQueries({ queryKey: adminKeys.users.lists() });
    },
  });
};

/**
 * Hook to delete a user
 */
export const useAdminDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      // Invalidate all user lists
      queryClient.invalidateQueries({ queryKey: adminKeys.users.lists() });
    },
  });
};

// ============================================
// 3. Comment Management Hooks
// ============================================

/**
 * Hook to get all comments across all projects
 * @param filters - Optional pagination and filter parameters
 */
export const useAdminComments = (filters?: CommentFilters) => {
  return useQuery<PaginatedResponse<Comment>, Error>({
    queryKey: adminKeys.comments.list(filters),
    queryFn: () => getAllComments(filters),
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook to get a specific comment by ID
 */
export const useAdminCommentById = (id: string) => {
  return useQuery<Comment, Error>({
    queryKey: adminKeys.comments.detail(id),
    queryFn: () => getCommentById(id),
    enabled: !!id,
  });
};

/**
 * Hook to edit/update a comment
 */
export const useAdminEditComment = () => {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, { commentId: string; updates: CommentUpdatePayload }>({
    mutationFn: ({ commentId, updates }) => editComment(commentId, updates),
    onSuccess: (_data, variables) => {
      // Invalidate specific comment and all comment lists
      queryClient.invalidateQueries({ queryKey: adminKeys.comments.detail(variables.commentId) });
      queryClient.invalidateQueries({ queryKey: adminKeys.comments.lists() });
    },
  });
};

/**
 * Hook to delete a comment
 */
export const useAdminDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      // Invalidate all comment lists
      queryClient.invalidateQueries({ queryKey: adminKeys.comments.lists() });
    },
  });
};

// ============================================
// 4. Suggestion Management Hooks
// ============================================

/**
 * Hook to get all suggestions
 * @param filters - Optional pagination and filter parameters
 */
export const useAdminSuggestions = (filters?: SuggestionFilters) => {
  return useQuery<PaginatedResponse<Suggestion>, Error>({
    queryKey: adminKeys.suggestions.list(filters),
    queryFn: () => getAllSuggestions(filters),
  });
};

/**
 * Hook to get a specific suggestion by ID
 */
export const useAdminSuggestionById = (id: string) => {
  return useQuery<Suggestion, Error>({
    queryKey: adminKeys.suggestions.detail(id),
    queryFn: () => getSuggestionById(id),
    enabled: !!id,
  });
};

/**
 * Hook to edit/update a suggestion
 */
export const useAdminEditSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation<Suggestion, Error, { suggestionId: string; updates: SuggestionUpdatePayload }>({
    mutationFn: ({ suggestionId, updates }) => editSuggestion(suggestionId, updates),
    onSuccess: (_data, variables) => {
      // Invalidate specific suggestion and all suggestion lists
      queryClient.invalidateQueries({ queryKey: adminKeys.suggestions.detail(variables.suggestionId) });
      queryClient.invalidateQueries({ queryKey: adminKeys.suggestions.lists() });
    },
  });
};

/**
 * Hook to delete a suggestion
 */
export const useAdminDeleteSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: (suggestionId) => deleteSuggestion(suggestionId),
    onSuccess: () => {
      // Invalidate all suggestion lists
      queryClient.invalidateQueries({ queryKey: adminKeys.suggestions.lists() });
    },
  });
};

// ============================================
// 5. School Management Hooks
// ============================================

/**
 * Hook to get all schools/departments
 * @param filters - Optional pagination and filter parameters
 */
export const useAdminSchools = (filters?: SchoolFilters) => {
  return useQuery<PaginatedResponse<School>, Error>({
    queryKey: adminKeys.schools.list(filters),
    queryFn: () => getAllSchools(filters),
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook to get a specific school by ID
 */
export const useAdminSchoolById = (id: string) => {
  return useQuery<School, Error>({
    queryKey: adminKeys.schools.detail(id),
    queryFn: () => getSchoolById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a new school
 */
export const useAdminCreateSchool = () => {
  const queryClient = useQueryClient();

  return useMutation<School, Error, SchoolUpdatePayload>({
    mutationFn: (schoolData) => createSchool(schoolData),
    onSuccess: () => {
      // Invalidate all school lists
      queryClient.invalidateQueries({ queryKey: adminKeys.schools.lists() });
    },
  });
};

/**
 * Hook to edit/update a school
 */
export const useAdminEditSchool = () => {
  const queryClient = useQueryClient();

  return useMutation<School, Error, { schoolId: string; updates: SchoolUpdatePayload }>({
    mutationFn: ({ schoolId, updates }) => editSchool(schoolId, updates),
    onSuccess: (_data, variables) => {
      // Invalidate specific school and all school lists
      queryClient.invalidateQueries({ queryKey: adminKeys.schools.detail(variables.schoolId) });
      queryClient.invalidateQueries({ queryKey: adminKeys.schools.lists() });
    },
  });
};

/**
 * Hook to delete a school
 */
export const useAdminDeleteSchool = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: (schoolId) => deleteSchool(schoolId),
    onSuccess: () => {
      // Invalidate all school lists
      queryClient.invalidateQueries({ queryKey: adminKeys.schools.lists() });
    },
  });
};

// ============================================
// 6. Course Management Hooks
// ============================================

/**
 * Hook to get all courses
 * @param filters - Optional pagination and filter parameters
 */
export const useAdminCourses = (filters?: CourseFilters) => {
  return useQuery<PaginatedResponse<Course>, Error>({
    queryKey: adminKeys.courses.list(filters),
    queryFn: () => getAllCourses(filters),
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook to create a new course
 */
export const useAdminCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<Course, Error, CourseCreatePayload>({
    mutationFn: (courseData) => createCourse(courseData),
    onSuccess: () => {
      // Invalidate all course lists
      queryClient.invalidateQueries({ queryKey: adminKeys.courses.lists() });
    },
  });
};

/**
 * Hook to edit/update a course
 */
export const useAdminEditCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<Course, Error, { courseId: string; updates: CourseUpdatePayload }>({
    mutationFn: ({ courseId, updates }) => editCourse(courseId, updates),
    onSuccess: () => {
      // Invalidate all course lists
      queryClient.invalidateQueries({ queryKey: adminKeys.courses.lists() });
    },
  });
};

/**
 * Hook to delete a course
 */
export const useAdminDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: (courseId) => deleteCourse(courseId),
    onSuccess: () => {
      // Invalidate all course lists
      queryClient.invalidateQueries({ queryKey: adminKeys.courses.lists() });
    },
  });
};

// ============================================
// 7. Dashboard Stats Hooks
// ============================================

/**
 * Hook to get dashboard statistics
 * Includes total counts for projects, users, and comments
 */
export const useAdminDashboardStats = () => {
  return useQuery<DashboardStats, Error>({
    queryKey: adminKeys.stats(),
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes - stats don't need to be real-time
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};
