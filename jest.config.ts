import type { Config } from 'jest';

const config: Config = {
  // Use ts-jest preset for TypeScript support
  preset: 'ts-jest',

  // Use jsdom environment for React component testing
  testEnvironment: 'jsdom',

  // Setup files to run after Jest is initialized
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Module paths
  roots: ['<rootDir>/src'],

  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],

  // Transform files with babel to handle import.meta
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', {}],
  },

  // Module name mapper for absolute imports and asset mocking
  moduleNameMapper: {
    // CSS modules
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    
    // Image and asset files
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/src/__mocks__/fileMock.ts',
    
    // Handle absolute imports if needed
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/types/**',
    '!src/**/__tests__/**',
    '!src/utils/constants.tsx', // Exclude email templates with JSX
  ],

  coverageThreshold: {
    global: {
      lines: 8, // Baseline - increase as more tests are added (target: 70%)
      branches: 6, // Baseline - increase as more tests are added (target: 65%)
      functions: 7, // Baseline - increase as more tests are added (target: 70%)
      statements: 8, // Baseline - increase as more tests are added (target: 70%)
    },
  },

  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Verbose output
  verbose: true,

  // Handle ESM modules from node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)',
  ],

  // Global variables
  globals: {
    'import.meta': {
      env: {
        VITE_API_BASE: 'http://localhost:3000/api',
        MODE: 'test',
        DEV: false,
        PROD: false,
        SSR: false,
      },
    },
  },
};

export default config;