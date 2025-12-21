import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import axios from 'axios';
import { checkAuth } from '../authApi';
import type { User } from '../../types';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('authApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkAuth', () => {
    const mockUser: User = {
      _id: '123456789',
      name: 'John Doe',
      email: 'john.doe@nu.edu.eg',
      firstName: 'John',
      lastName: 'Doe',
      msId: 'ms123456',
      role: 'student',
      school: 'Engineering',
      major: 'Computer Science',
      universityId: '2301234',
      linkedInUrl: 'https://linkedin.com/in/johndoe',
      githubUrl: 'https://github.com/johndoe',
      starredProjects: [],
      deactivated: false,
      deactivateRequested: false,
    };

    it('should successfully check authentication and return user', async () => {
      const mockResponse = {
        data: {
          authenticated: true,
          user: mockUser,
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await checkAuth();

      expect(result).toEqual({
        authenticated: true,
        user: mockUser,
      });
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/auth/me'),
        expect.objectContaining({
          withCredentials: true,
        })
      );
    });

    it('should call the correct endpoint', async () => {
      const mockResponse = {
        data: {
          authenticated: true,
          user: mockUser,
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      await checkAuth();

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      const callArgs = mockedAxios.get.mock.calls[0];
      expect(callArgs[0]).toMatch(/\/auth\/me$/);
    });

    it('should include withCredentials: true in request config', async () => {
      const mockResponse = {
        data: {
          authenticated: true,
          user: mockUser,
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      await checkAuth();

      const callArgs = mockedAxios.get.mock.calls[0];
      expect(callArgs[1]).toHaveProperty('withCredentials', true);
    });

    it('should throw error with message from response on axios error', async () => {
      const errorMessage = 'Authentication failed';
      const axiosError = {
        isAxiosError: true,
        response: {
          data: {
            message: errorMessage,
          },
        },
      };

      mockedAxios.get.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError = jest.fn().mockReturnValue(true) as any;

      await expect(checkAuth()).rejects.toThrow(errorMessage);
    });

    it('should throw default error message when response has no message', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          data: {},
        },
      };

      mockedAxios.get.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError = jest.fn().mockReturnValue(true) as any;

      await expect(checkAuth()).rejects.toThrow('Failed to check authentication');
    });

    it('should rethrow non-axios errors', async () => {
      const genericError = new Error('Network error');

      mockedAxios.get.mockRejectedValue(genericError);
      mockedAxios.isAxiosError = jest.fn().mockReturnValue(false) as any;

      await expect(checkAuth()).rejects.toThrow('Network error');
    });
  });
});
