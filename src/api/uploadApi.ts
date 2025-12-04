import axios from 'axios';

const UPLOAD_BASE = `${import.meta.env.VITE_API_BASE}/upload`;

// Response types
export interface UploadImageSingleResponse {
  url: string;
}

export interface UploadImageMultipleResponse {
  urls: string[];
}

export interface UploadVideoResponse {
  url: string;
}

export interface UploadErrorResponse {
  error: string;
}

/**
 * Upload a single image or multiple images (up to 10)
 * @param file - Single File object or array of File objects (max 10)
 * @returns Single file: { url: string }, Multiple files: { urls: string[] }
 */
export const uploadImage = async (
  file: File | File[]
): Promise<UploadImageSingleResponse | UploadImageMultipleResponse> => {
  try {
    const formData = new FormData();
    
    // Handle single file or multiple files
    if (Array.isArray(file)) {
      // Multiple files - append each with the same field name 'file'
      file.forEach((f) => {
        formData.append('file', f);
      });
    } else {
      // Single file
      formData.append('file', file);
    }

    const response = await axios.post<
      UploadImageSingleResponse | UploadImageMultipleResponse
    >(`${UPLOAD_BASE}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        (error.response?.data as UploadErrorResponse)?.error ||
          'Failed to upload image'
      );
    }
    throw error;
  }
};

/**
 * Upload a single video file
 * @param file - Single File object containing the video
 * @returns { url: string }
 */
export const uploadVideo = async (
  file: File
): Promise<UploadVideoResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<UploadVideoResponse>(
      `${UPLOAD_BASE}/video`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        (error.response?.data as UploadErrorResponse)?.error ||
          'Failed to upload video'
      );
    }
    throw error;
  }
};

/**
 * Upload a single suggestion image
 * @param file - File object containing the suggestion image
 * @returns { url: string }
 */
export const uploadSuggestionImage = async (
  file: File
): Promise<UploadImageSingleResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<UploadImageSingleResponse>(
      `${UPLOAD_BASE}/suggestion-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        (error.response?.data as UploadErrorResponse)?.error ||
          'Failed to upload suggestion image'
      );
    }
    throw error;
  }
};

