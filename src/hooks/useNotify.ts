import { useMutation } from '@tanstack/react-query';
import { sendMail, type SendMailPayload, type SendMailResponse } from '../api/notifyApi';

// Query keys for notify operations
export const notifyKeys = {
  all: ['notify'] as const,
  sendMail: () => [...notifyKeys.all, 'send-mail'] as const,
};

/**
 * Hook to send an email using the notify service
 * @returns Mutation object with sendMail function
 * 
 * @example
 * ```tsx
 * const sendEmail = useSendMail();
 * 
 * const handleSendEmail = async () => {
 *   try {
 *     const result = await sendEmail.mutateAsync({
 *       to: 'user@example.com',
 *       subject: 'Welcome',
 *       html: '<h1>Welcome!</h1>'
 *     });
 *     console.log('Email sent:', result.messageId);
 *   } catch (error) {
 *     console.error('Failed to send email:', error);
 *   }
 * };
 * ```
 */
export const useSendMail = () => {
  return useMutation<SendMailResponse, Error, SendMailPayload>({
    mutationFn: sendMail,
    mutationKey: notifyKeys.sendMail(),
  });
};

