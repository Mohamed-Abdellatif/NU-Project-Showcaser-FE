import axios from 'axios';

const COMMENTS_BASE = `${import.meta.env.VITE_API_BASE}/comment`;

// Comment interface matching the API response
export interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  projectId: string;
  userId: string;
  authorFirstName: string;
  authorLastName: string;
  authorEmail?: string;
}

// Comment creation payload
export interface CommentCreatePayload {
  content: string;
  projectId: string;
  userId: string;
  authorFirstName: string;
  authorLastName: string;
  authorEmail?: string;
}

// API Response types
interface DeleteResponse {
  message: string;
}

/**
 * Get all comments for a specific project
 * @param projectId - MongoDB ObjectId of the project
 * @returns Array of comments for the project
 */
export const getCommentsByProjectId = async (
  projectId: string
): Promise<Comment[]> => {
  try {
    const response = await axios.get<Comment[]>(
      `${COMMENTS_BASE}/project/${projectId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Project not found');
      }
      throw new Error(
        error.response?.data?.message || 'Failed to fetch comments'
      );
    }
    throw error;
  }
};

/**
 * Create a new comment
 * @param comment - Comment data to create
 * @returns Created comment object
 */
export const createComment = async (
  comment: CommentCreatePayload
): Promise<Comment> => {
  try {
    const response = await axios.post<Comment>(
      COMMENTS_BASE,
      comment,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to create comment'
      );
    }
    throw error;
  }
};

/**
 * Delete a comment by MongoDB ObjectId
 * @param id - MongoDB ObjectId of the comment
 * @returns Success message
 */
export const deleteComment = async (id: string): Promise<string> => {
  try {
    const response = await axios.delete<DeleteResponse>(
      `${COMMENTS_BASE}/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Comment not found');
      }
      throw new Error(
        error.response?.data?.message || 'Failed to delete comment'
      );
    }
    throw error;
  }
};

/**
 * Update a comment by MongoDB ObjectId
 * @param id - MongoDB ObjectId of the comment
 * @param content - Updated comment content
 * @returns Updated comment object
 */
export const updateComment = async (
  id: string,
  content: string
): Promise<Comment> => {
  try {
    const response = await axios.put<Comment>(
      `${COMMENTS_BASE}/${id}`,
      { content },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Comment not found');
      }
      throw new Error(
        error.response?.data?.message || 'Failed to update comment'
      );
    }
    throw error;
  }
};

