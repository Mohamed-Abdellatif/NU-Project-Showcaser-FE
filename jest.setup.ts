// Add custom jest matchers from jest-dom
import '@testing-library/jest-dom';
import { jest, beforeAll, afterAll } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder/TextDecoder (required by React Router 7+)
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock scrollTo
window.scrollTo = jest.fn();

// Mock import.meta.env for Vite environment variables
// This must be done before any imports that use import.meta
if (typeof (globalThis as any).import === 'undefined') {
  Object.defineProperty(globalThis, 'import', {
    value: {
      meta: {
        env: {
          VITE_API_BASE: 'http://localhost:3000/api',
          MODE: 'test',
          DEV: false,
          PROD: false,
          SSR: false,
        },
      },
    },
    writable: false,
    configurable: true,
  });
}

// Suppress console errors in tests (optional - remove if you want to see them)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('Not implemented: HTMLFormElement.prototype.submit') ||
        args[0].includes('Not implemented: navigation'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
