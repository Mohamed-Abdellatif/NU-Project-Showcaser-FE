import axios from "axios";
import type { Project, User, School, Suggestion, Course } from "../types";
import type { Comment } from "./commentsApi";

const API_BASE = import.meta.env.VITE_API_BASE;

// API Response types
interface DeleteResponse {
  message: string;
}

// Dashboard Stats types
export interface DashboardStats {
  projects: {
    total: number;
    pending: number;
  };
  users: {
    total: number;
    newThisWeek: number;
  };
  comments: {
    total: number;
    newThisWeek: number;
  };
}

// Pagination response type
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter parameter types
export interface ProjectFilters {
  page?: number;
  limit?: number;
  title?: string;
  status?: string;
  course?: string;
  supervisor?: string;
  tags?: string;
  teamLeader?: string;
  teamMember?: string;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  school?: string;
  major?: string;
  deactivated?: boolean;
  deactivateRequested?: boolean;
}

export interface CommentFilters {
  page?: number;
  limit?: number;
  content?: string;
  projectId?: string;
  userId?: string;
  authorFirstName?: string;
  authorLastName?: string;
  authorEmail?: string;
}

export interface SuggestionFilters {
  page?: number;
  limit?: number;
  title?: string;
  description?: string;
}

export interface SchoolFilters {
  page?: number;
  limit?: number;
  name?: string;
  majors?: string;
}

export interface CourseFilters {
  page?: number;
  limit?: number;
  code?: string;
  title?: string;
}

// Update payload types
export interface ProjectUpdatePayload {
  title?: string;
  description?: string;
  technologies?: string[];
  teamLeader?: string;
  teamMembers?: string[];
  supervisor?: string;
  stars?: number;
  tags?: string[];
  images?: string[];
  videos?: string[];
  course?: string;
  repoUrl?: string;
  liveUrl?: string;
  teachingAssistant?: string;
  status?: string;
}

export interface UserUpdatePayload {
  name?: string;
  email?: string;
  role?: "student" | "supervisor" | "admin";
  firstName?: string;
  lastName?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  universityId?: string;
  school?: string;
  major?: string;
  deactivated?: boolean;
  deactivateRequested?: boolean;
}

export interface CommentUpdatePayload {
  content?: string;
  projectId?: string;
  userId?: string;
}

export interface SuggestionUpdatePayload {
  title?: string;
  description?: string;
  images?: string[];
}

export interface SchoolUpdatePayload {
  name?: string;
  majors?: string[];
}

export interface CourseCreatePayload {
  code: string;
  title: string;
}

export interface CourseUpdatePayload {
  code?: string;
  title?: string;
}

// ============================================
// 1. Project Management APIs
// Base path: /admin/project
// ============================================

/**
 * Get all projects in the system (includes pending, approved, rejected)
 * @param filters - Optional pagination and filter parameters
 * @returns Paginated response with projects
 */
export const getAllProjects = async (
  filters?: ProjectFilters
): Promise<PaginatedResponse<Project>> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.limit) queryParams.append("limit", filters.limit.toString());
      if (filters.title) queryParams.append("title", filters.title);
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.course) queryParams.append("course", filters.course);
      if (filters.supervisor) queryParams.append("supervisor", filters.supervisor);
      if (filters.tags) queryParams.append("tags", filters.tags);
      if (filters.teamLeader) queryParams.append("teamLeader", filters.teamLeader);
      if (filters.teamMember) queryParams.append("teamMember", filters.teamMember);
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${API_BASE}/admin/project/all-projects?${queryString}`
      : `${API_BASE}/admin/project/all-projects`;

    const response = await axios.get<PaginatedResponse<Project>>(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch all projects"
      );
    }
    throw error;
  }
};

/**
 * Get a specific project by ID
 * @param id - MongoDB ObjectId of the project
 * @returns Project object or 404 if not found
 */
export const getProjectById = async (id: string): Promise<Project> => {
  try {
    const response = await axios.get<Project>(
      `${API_BASE}/admin/project/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Project not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch project"
      );
    }
    throw error;
  }
};

/**
 * Edit/Update a project by ID
 * @param projectId - MongoDB ObjectId of the project
 * @param updates - Partial project object with fields to update
 * @returns Updated project object
 */
export const editProject = async (
  projectId: string,
  updates: ProjectUpdatePayload
): Promise<Project> => {
  try {
    const response = await axios.put<Project>(
      `${API_BASE}/admin/project/${projectId}`,
      updates,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Project not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to update project"
      );
    }
    throw error;
  }
};

/**
 * Permanently delete a project
 * @param projectId - MongoDB ObjectId of the project
 * @returns Success message
 */
export const deleteProject = async (projectId: string): Promise<string> => {
  try {
    const response = await axios.delete<DeleteResponse>(
      `${API_BASE}/admin/project/${projectId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Project not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to delete project"
      );
    }
    throw error;
  }
};

// ============================================
// 2. User Management APIs
// Base path: /admin/user
// ============================================

/**
 * Get all users in the system
 * @param filters - Optional pagination and filter parameters
 * @returns Paginated response with users (includes email, role, projects, etc.)
 */
export const getAllUsers = async (
  filters?: UserFilters
): Promise<PaginatedResponse<User>> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.limit) queryParams.append("limit", filters.limit.toString());
      if (filters.firstName) queryParams.append("firstName", filters.firstName);
      if (filters.lastName) queryParams.append("lastName", filters.lastName);
      if (filters.email) queryParams.append("email", filters.email);
      if (filters.role) queryParams.append("role", filters.role);
      if (filters.school) queryParams.append("school", filters.school);
      if (filters.major) queryParams.append("major", filters.major);
      if (filters.deactivated !== undefined) 
        queryParams.append("deactivated", filters.deactivated.toString());
      if (filters.deactivateRequested !== undefined) 
        queryParams.append("deactivateRequested", filters.deactivateRequested.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${API_BASE}/admin/user/all-users?${queryString}`
      : `${API_BASE}/admin/user/all-users`;

    const response = await axios.get<PaginatedResponse<User>>(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch all users"
      );
    }
    throw error;
  }
};

/**
 * Get a specific user by ID
 * @param id - MongoDB ObjectId of the user
 * @returns User object or 404 if not found
 */
export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_BASE}/admin/user/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("User not found");
      }
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
    throw error;
  }
};

/**
 * Edit/Update a user by ID
 * Use this to change user roles to "admin"
 * @param userId - MongoDB ObjectId of the user
 * @param updates - Partial user object with fields to update
 * @returns Updated user object
 */
export const editUser = async (
  userId: string,
  updates: UserUpdatePayload
): Promise<User> => {
  try {
    const response = await axios.put<User>(
      `${API_BASE}/admin/user/${userId}`,
      updates,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("User not found");
      }
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
    throw error;
  }
};

/**
 * Permanently delete a user
 * @param userId - MongoDB ObjectId of the user
 * @returns Success message
 */
export const deleteUser = async (userId: string): Promise<string> => {
  try {
    const response = await axios.delete<DeleteResponse>(
      `${API_BASE}/admin/user/${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("User not found");
      }
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
    throw error;
  }
};

// ============================================
// 3. Comment Management APIs
// Base path: /admin/comment
// ============================================

/**
 * Get all comments across all projects
 * @param filters - Optional pagination and filter parameters
 * @returns Paginated response with comments
 */
export const getAllComments = async (
  filters?: CommentFilters
): Promise<PaginatedResponse<Comment>> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.limit) queryParams.append("limit", filters.limit.toString());
      if (filters.content) queryParams.append("content", filters.content);
      if (filters.projectId) queryParams.append("projectId", filters.projectId);
      if (filters.userId) queryParams.append("userId", filters.userId);
      if (filters.authorFirstName) queryParams.append("authorFirstName", filters.authorFirstName);
      if (filters.authorLastName) queryParams.append("authorLastName", filters.authorLastName);
      if (filters.authorEmail) queryParams.append("authorEmail", filters.authorEmail);
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${API_BASE}/admin/comment/all-comments?${queryString}`
      : `${API_BASE}/admin/comment/all-comments`;

    const response = await axios.get<PaginatedResponse<Comment>>(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch all comments"
      );
    }
    throw error;
  }
};

/**
 * Get a specific comment by ID
 * @param id - MongoDB ObjectId of the comment
 * @returns Comment object or 404 if not found
 */
export const getCommentById = async (id: string): Promise<Comment> => {
  try {
    const response = await axios.get<Comment>(
      `${API_BASE}/admin/comment/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Comment not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch comment"
      );
    }
    throw error;
  }
};

/**
 * Edit/Update a comment by ID
 * @param commentId - MongoDB ObjectId of the comment
 * @param updates - Partial comment object with fields to update
 * @returns Updated comment object
 */
export const editComment = async (
  commentId: string,
  updates: CommentUpdatePayload
): Promise<Comment> => {
  try {
    const response = await axios.put<Comment>(
      `${API_BASE}/admin/comment/${commentId}`,
      updates,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Comment not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to update comment"
      );
    }
    throw error;
  }
};

/**
 * Permanently delete a comment
 * @param commentId - MongoDB ObjectId of the comment
 * @returns Success message
 */
export const deleteComment = async (commentId: string): Promise<string> => {
  try {
    const response = await axios.delete<DeleteResponse>(
      `${API_BASE}/admin/comment/${commentId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Comment not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
    throw error;
  }
};

// ============================================
// 4. Suggestion Management APIs
// Base path: /admin/suggestion
// ============================================

/**
 * Get all suggestions
 * @param filters - Optional pagination and filter parameters
 * @returns Paginated response with suggestions
 */
export const getAllSuggestions = async (
  filters?: SuggestionFilters
): Promise<PaginatedResponse<Suggestion>> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.limit) queryParams.append("limit", filters.limit.toString());
      if (filters.title) queryParams.append("title", filters.title);
      if (filters.description) queryParams.append("description", filters.description);
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${API_BASE}/admin/suggestion/all-suggestions?${queryString}`
      : `${API_BASE}/admin/suggestion/all-suggestions`;

    const response = await axios.get<PaginatedResponse<Suggestion>>(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch all suggestions"
      );
    }
    throw error;
  }
};

/**
 * Get a specific suggestion by ID
 * @param id - MongoDB ObjectId of the suggestion
 * @returns Suggestion object or 404 if not found
 */
export const getSuggestionById = async (id: string): Promise<Suggestion> => {
  try {
    const response = await axios.get<Suggestion>(
      `${API_BASE}/admin/suggestion/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Suggestion not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch suggestion"
      );
    }
    throw error;
  }
};

/**
 * Edit/Update a suggestion by ID
 * @param suggestionId - MongoDB ObjectId of the suggestion
 * @param updates - Partial suggestion object with fields to update
 * @returns Updated suggestion object
 */
export const editSuggestion = async (
  suggestionId: string,
  updates: SuggestionUpdatePayload
): Promise<Suggestion> => {
  try {
    const response = await axios.put<Suggestion>(
      `${API_BASE}/admin/suggestion/${suggestionId}`,
      updates,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Suggestion not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to update suggestion"
      );
    }
    throw error;
  }
};

/**
 * Permanently delete a suggestion
 * @param suggestionId - MongoDB ObjectId of the suggestion
 * @returns Success message
 */
export const deleteSuggestion = async (
  suggestionId: string
): Promise<string> => {
  try {
    const response = await axios.delete<DeleteResponse>(
      `${API_BASE}/admin/suggestion/${suggestionId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Suggestion not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to delete suggestion"
      );
    }
    throw error;
  }
};

// ============================================
// 5. School Management APIs
// Base path: /admin/school
// ============================================

/**
 * Create a new school
 * @param schoolData - School data to create
 * @returns Created school object
 */
export const createSchool = async (
  schoolData: SchoolUpdatePayload
): Promise<School> => {
  try {
    const response = await axios.post<School>(
      `${API_BASE}/admin/school`,
      schoolData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create school"
      );
    }
    throw error;
  }
};

/**
 * Get all schools/departments
 * @param filters - Optional pagination and filter parameters
 * @returns Paginated response with schools
 */
export const getAllSchools = async (
  filters?: SchoolFilters
): Promise<PaginatedResponse<School>> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.limit) queryParams.append("limit", filters.limit.toString());
      if (filters.name) queryParams.append("name", filters.name);
      if (filters.majors) queryParams.append("majors", filters.majors);
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${API_BASE}/admin/school/all-schools?${queryString}`
      : `${API_BASE}/admin/school/all-schools`;

    const response = await axios.get<PaginatedResponse<School>>(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch all schools"
      );
    }
    throw error;
  }
};

/**
 * Get a specific school by ID
 * @param id - MongoDB ObjectId of the school
 * @returns School object or 404 if not found
 */
export const getSchoolById = async (id: string): Promise<School> => {
  try {
    const response = await axios.get<School>(`${API_BASE}/admin/school/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("School not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch school"
      );
    }
    throw error;
  }
};

/**
 * Edit/Update a school by ID
 * @param schoolId - MongoDB ObjectId of the school
 * @param updates - Partial school object with fields to update
 * @returns Updated school object
 */
export const editSchool = async (
  schoolId: string,
  updates: SchoolUpdatePayload
): Promise<School> => {
  try {
    const response = await axios.put<School>(
      `${API_BASE}/admin/school/${schoolId}`,
      updates,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("School not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to update school"
      );
    }
    throw error;
  }
};

/**
 * Permanently delete a school
 * @param schoolId - MongoDB ObjectId of the school
 * @returns Success message
 */
export const deleteSchool = async (schoolId: string): Promise<string> => {
  try {
    const response = await axios.delete<DeleteResponse>(
      `${API_BASE}/admin/school/${schoolId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("School not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to delete school"
      );
    }
    throw error;
  }
};

// ============================================
// 6. Course Management APIs
// Base path: /admin/course
// ============================================

/**
 * Get all courses
 * @param filters - Optional pagination and filter parameters
 * @returns Paginated response with courses
 */
export const getAllCourses = async (
  filters?: CourseFilters
): Promise<PaginatedResponse<Course>> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.limit) queryParams.append("limit", filters.limit.toString());
      if (filters.code) queryParams.append("code", filters.code);
      if (filters.title) queryParams.append("title", filters.title);
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${API_BASE}/admin/course/all-courses?${queryString}`
      : `${API_BASE}/admin/course/all-courses`;

    const response = await axios.get<PaginatedResponse<Course>>(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch all courses"
      );
    }
    throw error;
  }
};

/**
 * Create a new course
 * @param courseData - Course data to create (code and title required)
 * @returns Created course object
 */
export const createCourse = async (
  courseData: CourseCreatePayload
): Promise<Course> => {
  try {
    const response = await axios.post<Course>(
      `${API_BASE}/admin/course`,
      courseData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create course"
      );
    }
    throw error;
  }
};

/**
 * Edit/Update a course by ID
 * @param courseId - MongoDB ObjectId of the course
 * @param updates - Partial course object with fields to update
 * @returns Updated course object
 */
export const editCourse = async (
  courseId: string,
  updates: CourseUpdatePayload
): Promise<Course> => {
  try {
    const response = await axios.put<Course>(
      `${API_BASE}/admin/course/${courseId}`,
      updates,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Course not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to update course"
      );
    }
    throw error;
  }
};

/**
 * Permanently delete a course
 * @param courseId - MongoDB ObjectId of the course
 * @returns Success message
 */
export const deleteCourse = async (courseId: string): Promise<string> => {
  try {
    const response = await axios.delete<DeleteResponse>(
      `${API_BASE}/admin/course/${courseId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Course not found");
      }
      throw new Error(
        error.response?.data?.message || "Failed to delete course"
      );
    }
    throw error;
  }
};

// ============================================================================
// Dashboard Stats
// ============================================================================

/**
 * Get dashboard statistics
 * @returns Dashboard statistics including projects, users, and comments counts
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await axios.get<DashboardStats>(
      `${API_BASE}/admin/stats`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
    throw error;
  }
};
