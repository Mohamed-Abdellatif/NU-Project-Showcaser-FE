import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCommentsByProjectId,
  createComment,
  deleteComment,
  updateComment,
} from '../api/commentsApi';
import type { Comment, CommentCreatePayload } from '../api/commentsApi';

// Query keys
export const commentKeys = {
  all: ['comments'] as const,
  lists: () => [...commentKeys.all, 'list'] as const,
  list: (projectId: string) => [...commentKeys.lists(), projectId] as const,
};

/**
 * Hook to fetch all comments for a specific project
 * @param projectId - MongoDB ObjectId of the project
 */
export const useComments = (projectId: string) => {
  return useQuery<Comment[], Error>({
    queryKey: commentKeys.list(projectId),
    queryFn: () => getCommentsByProjectId(projectId),
    enabled: !!projectId, // Only fetch if projectId is provided
  });
};

/**
 * Hook to create a new comment
 */
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, CommentCreatePayload>({
    mutationFn: createComment,
    onSuccess: (data: Comment) => {
      // Invalidate and refetch comments for the project after creating
      queryClient.invalidateQueries({
        queryKey: commentKeys.list(data.projectId),
      });
    },
  });
};

/**
 * Hook to delete a comment
 */
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, { id: string; projectId: string }>({
    mutationFn: ({ id }: { id: string; projectId: string }) => deleteComment(id),
    onSuccess: (_data: string, variables: { id: string; projectId: string }) => {
      // Invalidate and refetch comments for the project after deleting
      queryClient.invalidateQueries({
        queryKey: commentKeys.list(variables.projectId),
      });
    },
  });
};

/**
 * Hook to update a comment
 */
export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Comment,
    Error,
    { id: string; content: string; projectId: string }
  >({
    mutationFn: ({ id, content }: { id: string; content: string; projectId: string }) =>
      updateComment(id, content),
    onSuccess: (data: Comment) => {
      // Invalidate and refetch comments for the project after updating
      queryClient.invalidateQueries({
        queryKey: commentKeys.list(data.projectId),
      });
    },
  });
};

