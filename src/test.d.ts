/// <reference types="@jest/globals" />
/// <reference types="@testing-library/jest-dom" />

// This file ensures TypeScript recognizes jest-dom matchers.
// The actual import of '@testing-library/jest-dom' happens in jest.setup.ts
// which is loaded via setupFilesAfterEnv in jest.config.ts.
// The @testing-library/jest-dom package automatically provides type definitions
// that extend @jest/expect when included in tsconfig.test.json's types array.

export {};
