import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import type { User, Project, Member } from '../types';

// Initialize i18n for tests
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  resources: {
    en: {
      translation: {},
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

// Create a custom render function that includes all providers
interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { customRender as render };

// Mock data factories
export const createMockUser = (overrides?: Partial<User>): User => ({
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
  ...overrides,
});

export const createMockMember = (overrides?: Partial<Member>): Member => ({
  name: 'Jane Smith',
  email: 'jane.smith@nu.edu.eg',
  ...overrides,
});

export const createMockProject = (overrides?: Partial<Project>): Project => ({
  _id: 'proj123',
  title: 'Test Project',
  description: 'A test project description',
  technologies: ['React', 'TypeScript', 'Node.js'],
  teamLeader: createMockMember({ name: 'Team Leader', email: 'leader@nu.edu.eg' }),
  teamMembers: [
    createMockMember({ name: 'Member 1', email: 'member1@nu.edu.eg' }),
    createMockMember({ name: 'Member 2', email: 'member2@nu.edu.eg' }),
  ],
  supervisor: 'Dr. John Smith',
  stars: 0,
  tags: ['web', 'fullstack'],
  images: [],
  videos: [],
  createdAt: new Date('2024-01-01').toISOString(),
  course: 'CS101',
  repoUrl: 'https://github.com/test/project',
  teachingAssistant: 'TA Name',
  ...overrides,
});

// Helper to create a new QueryClient for tests
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

// Mock axios helpers
export const mockAxiosSuccess = (data: any) => {
  return Promise.resolve({ data });
};

export const mockAxiosError = (message: string, status = 400) => {
  const error: any = new Error(message);
  error.response = {
    data: { message },
    status,
  };
  error.isAxiosError = true;
  return Promise.reject(error);
};
