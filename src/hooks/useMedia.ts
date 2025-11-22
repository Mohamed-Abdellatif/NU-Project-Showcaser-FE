import { useMutation } from '@tanstack/react-query';
import {
  uploadImage,
  uploadVideo,
  type UploadImageSingleResponse,
  type UploadImageMultipleResponse,
  type UploadVideoResponse,
} from '../api/uploadApi';

// Query keys
export const mediaKeys = {
  all: ['media'] as const,
  uploads: () => [...mediaKeys.all, 'upload'] as const,
  image: () => [...mediaKeys.uploads(), 'image'] as const,
  video: () => [...mediaKeys.uploads(), 'video'] as const,
};

/**
 * Hook to upload a single image or multiple images (up to 10)
 * @returns Mutation object for uploading images
 */
export const useUploadImage = () => {
  return useMutation<
    UploadImageSingleResponse | UploadImageMultipleResponse,
    Error,
    File | File[]
  >({
    mutationFn: uploadImage,
    mutationKey: mediaKeys.image(),
  });
};

/**
 * Hook to upload a single video file
 * @returns Mutation object for uploading videos
 */
export const useUploadVideo = () => {
  return useMutation<UploadVideoResponse, Error, File>({
    mutationFn: uploadVideo,
    mutationKey: mediaKeys.video(),
  });
};

