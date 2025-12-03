import axios from 'axios';

const NOTIFY_BASE = `${import.meta.env.VITE_API_BASE}/notify`;

/**
 * Request payload for sending an email
 */
export interface SendMailPayload {
  to: string; // Required: Recipient email address
  subject: string; // Required: Email subject line
  text?: string; // Optional: Plain text version
  html?: string; // Optional: HTML version (takes precedence over text)
}

/**
 * Success response from send-mail endpoint
 */
export interface SendMailResponse {
  message: string;
  messageId: string;
}

/**
 * Error response from send-mail endpoint
 */
export interface SendMailErrorResponse {
  error: string;
}

/**
 * Send an email using the notify service
 * @param payload - Email data (to, subject, text/html)
 * @returns Success response with message and messageId
 */
export const sendMail = async (
  payload: SendMailPayload
): Promise<SendMailResponse> => {
  try {
    // Validate required fields
    if (!payload.to || !payload.subject) {
      throw new Error('Missing required fields: to and subject are required');
    }

    const response = await axios.post<SendMailResponse>(
      `${NOTIFY_BASE}/send-mail`,
      payload,
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
      const errorMessage =
        (error.response?.data as SendMailErrorResponse)?.error ||
        error.response?.data?.message ||
        'Failed to send email';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

