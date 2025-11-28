


export interface User {
  linkedInUrl: string;
  githubUrl: string;
  universityId: string;
  school: string;
  major: string;
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  msId: string;
  firstName: string;
  lastName: string;
  starredProjects?: string[];
}

export interface Language {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
}

// Add more types as needed

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  teamLeader: Member;
  teamMembers: Member[];
  supervisor: string;
  stars: number;
  tags: string[];
  images: string[];
  videos: string[];
  createdAt: string;
  course: string;
  repoUrl: string;
}

// Project creation/update payload
export interface ProjectCreatePayload {
  title: string;
  description: string;
  technologies?: string[];
  teamLeader: Member;
  teamMembers?: Member[];
  supervisor: string;
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
  status?: string;
  taMail?: string;
}

// Search query parameters
export interface ProjectSearchParams {
  title?: string;
  major?: string;
  supervisor?: string;
  teamMembers?: Member[];
  teamLeader?: Member;
  course?: string;
  page?: number;
  limit?: number;
}

// Pagination info
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Paginated response
export interface PaginatedProjectsResponse {
  projects: Project[];
  pagination: PaginationInfo;
}

// Comment type (re-exported from commentsApi for convenience)
export type { Comment, CommentCreatePayload } from '../api/commentsApi';

// User API types (re-exported from userApi for convenience)
export type {
  UserUpdatePayload,
  CompleteProfilePayload,
} from '../api/userApi';

export interface Member {
  name: string;
  email: string;
}