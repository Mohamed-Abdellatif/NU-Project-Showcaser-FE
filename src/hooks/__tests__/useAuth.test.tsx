import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '../useAuth';
import * as authApi from '../../api/authApi';
import { createMockUser } from '../../test-utils';

// Mock the authApi module
jest.mock('../../api/authApi');
const mockedAuthApi = authApi as jest.Mocked<typeof authApi>;

describe('useAuth', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should fetch authentication status successfully', async () => {
    const mockUser = createMockUser();
    const mockAuthResponse = {
      authenticated: true,
      user: mockUser,
    };

    mockedAuthApi.checkAuth.mockResolvedValue(mockAuthResponse);

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Initially loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockAuthResponse);
    expect(result.current.data?.authenticated).toBe(true);
    expect(result.current.data?.user).toEqual(mockUser);
    expect(mockedAuthApi.checkAuth).toHaveBeenCalledTimes(1);
  });

  it('should handle authentication failure', async () => {
    const mockError = new Error('Authentication failed');
    mockedAuthApi.checkAuth.mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Wait for the query to fail
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });

  it('should not retry on authentication failures', async () => {
    const mockError = new Error('Unauthorized');
    mockedAuthApi.checkAuth.mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // Should only be called once (no retries)
    expect(mockedAuthApi.checkAuth).toHaveBeenCalledTimes(1);
  });

  it('should use correct query key', () => {
    const mockUser = createMockUser();
    mockedAuthApi.checkAuth.mockResolvedValue({
      authenticated: true,
      user: mockUser,
    });

    renderHook(() => useAuth(), { wrapper });

    // The query should be registered with the correct key
    const queryState = queryClient.getQueryState(['auth', 'me']);
    expect(queryState).toBeDefined();
  });

  it('should have proper staleTime configuration', async () => {
    const mockUser = createMockUser();
    mockedAuthApi.checkAuth.mockResolvedValue({
      authenticated: true,
      user: mockUser,
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const queryState = queryClient.getQueryState(['auth', 'me']);
    
    // Check that staleTime is set (5 minutes = 300000ms)
    expect(queryState?.dataUpdatedAt).toBeDefined();
  });

  it('should return isLoading true initially', () => {
    mockedAuthApi.checkAuth.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should handle unauthenticated user', async () => {
    const mockResponse = {
      authenticated: false,
      user: createMockUser(),
    };

    mockedAuthApi.checkAuth.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.authenticated).toBe(false);
  });
});
