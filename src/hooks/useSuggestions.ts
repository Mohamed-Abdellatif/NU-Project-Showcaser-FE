import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createSuggestion,
  getAllSuggestions,
  getSuggestionById,
} from '../api/suggestionsApi';
import type { Suggestion, SuggestionCreatePayload } from '../types';

// Query keys
export const suggestionKeys = {
  all: ['suggestions'] as const,
  lists: () => [...suggestionKeys.all, 'list'] as const,
  details: () => [...suggestionKeys.all, 'detail'] as const,
  detail: (id: string) => [...suggestionKeys.details(), id] as const,
};

/**
 * Hook to fetch all suggestions
 */
export const useAllSuggestions = () => {
  return useQuery<Suggestion[], Error>({
    queryKey: suggestionKeys.lists(),
    queryFn: getAllSuggestions,
  });
};

/**
 * Hook to get a suggestion by ID
 * @param id - Suggestion ID
 */
export const useGetSuggestionById = (id: string | undefined) => {
  return useQuery<Suggestion, Error>({
    queryKey: suggestionKeys.detail(id || ''),
    queryFn: () => {
      if (!id) {
        throw new Error('Suggestion ID is required');
      }
      return getSuggestionById(id);
    },
    enabled: !!id,
  });
};

/**
 * Hook to create a new suggestion
 */
export const useCreateSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation<Suggestion, Error, SuggestionCreatePayload>({
    mutationFn: createSuggestion,
    onSuccess: () => {
      // Invalidate and refetch suggestions list after creating
      queryClient.invalidateQueries({ queryKey: suggestionKeys.lists() });
    },
  });
};

