import { describe, it, expect } from '@jest/globals';
import {
  isValidUrl,
  isValidLinkedInUrl,
  isValidGitHubUrl,
  isValidUniversityId,
  validateLinkedInUrl,
  validateGitHubUrl,
  validateUniversityId,
} from '../validation';

describe('validation utilities', () => {
  describe('isValidUrl', () => {
    it('should return true for valid HTTP URLs', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('http://www.example.com')).toBe(true);
      expect(isValidUrl('http://example.com/path')).toBe(true);
    });

    it('should return true for valid HTTPS URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('https://www.example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path/to/resource')).toBe(true);
    });

    it('should return true for empty strings', () => {
      expect(isValidUrl('')).toBe(true);
      expect(isValidUrl('   ')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('not a url')).toBe(false);
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl('//example.com')).toBe(false);
    });

    it('should return false for malformed URLs', () => {
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('https://')).toBe(false);
      // Note: 'http://.' is considered valid by URL constructor
    });
  });

  describe('isValidLinkedInUrl', () => {
    it('should return true for valid LinkedIn URLs', () => {
      expect(isValidLinkedInUrl('https://www.linkedin.com/in/johndoe')).toBe(true);
      expect(isValidLinkedInUrl('https://linkedin.com/in/janedoe')).toBe(true);
      expect(isValidLinkedInUrl('http://www.linkedin.com/company/test')).toBe(true);
    });

    it('should return true for empty strings', () => {
      expect(isValidLinkedInUrl('')).toBe(true);
      expect(isValidLinkedInUrl('   ')).toBe(true);
    });

    it('should return false for non-LinkedIn URLs', () => {
      expect(isValidLinkedInUrl('https://github.com/user')).toBe(false);
      expect(isValidLinkedInUrl('https://twitter.com/user')).toBe(false);
      expect(isValidLinkedInUrl('https://example.com')).toBe(false);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidLinkedInUrl('not a url')).toBe(false);
      expect(isValidLinkedInUrl('linkedin.com/in/user')).toBe(false);
    });
  });

  describe('isValidGitHubUrl', () => {
    it('should return true for valid GitHub URLs', () => {
      expect(isValidGitHubUrl('https://github.com/username')).toBe(true);
      expect(isValidGitHubUrl('https://www.github.com/username')).toBe(true);
      expect(isValidGitHubUrl('http://github.com/org/repo')).toBe(true);
    });

    it('should return true for empty strings', () => {
      expect(isValidGitHubUrl('')).toBe(true);
      expect(isValidGitHubUrl('   ')).toBe(true);
    });

    it('should return false for non-GitHub URLs', () => {
      expect(isValidGitHubUrl('https://linkedin.com/user')).toBe(false);
      expect(isValidGitHubUrl('https://gitlab.com/user')).toBe(false);
      expect(isValidGitHubUrl('https://example.com')).toBe(false);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidGitHubUrl('not a url')).toBe(false);
      expect(isValidGitHubUrl('github.com/user')).toBe(false);
    });
  });

  describe('isValidUniversityId', () => {
    it('should return true for valid numeric IDs', () => {
      expect(isValidUniversityId('123456')).toBe(true);
      expect(isValidUniversityId('2301234')).toBe(true);
      expect(isValidUniversityId('0')).toBe(true);
      expect(isValidUniversityId('999999999')).toBe(true);
    });

    it('should return true for empty strings', () => {
      expect(isValidUniversityId('')).toBe(true);
      expect(isValidUniversityId('   ')).toBe(true);
    });

    it('should return false for non-numeric IDs', () => {
      expect(isValidUniversityId('abc123')).toBe(false);
      expect(isValidUniversityId('123abc')).toBe(false);
      expect(isValidUniversityId('12-34')).toBe(false);
      expect(isValidUniversityId('12.34')).toBe(false);
    });

    it('should return false for IDs with spaces in the middle', () => {
      expect(isValidUniversityId('123 456')).toBe(false);
      // Note: Leading/trailing spaces are trimmed by the validation function
      expect(isValidUniversityId('   ')).toBe(true); // Empty after trim
    });
  });

  describe('validateLinkedInUrl', () => {
    it('should return empty string for valid LinkedIn URLs', () => {
      expect(validateLinkedInUrl('https://www.linkedin.com/in/johndoe')).toBe('');
      expect(validateLinkedInUrl('https://linkedin.com/in/janedoe')).toBe('');
    });

    it('should return empty string for empty input', () => {
      expect(validateLinkedInUrl('')).toBe('');
      expect(validateLinkedInUrl('   ')).toBe('');
    });

    it('should return error message for invalid LinkedIn URLs', () => {
      expect(validateLinkedInUrl('https://github.com/user')).toBe(
        'Please enter a valid LinkedIn profile URL'
      );
      expect(validateLinkedInUrl('not a url')).toBe(
        'Please enter a valid LinkedIn profile URL'
      );
      expect(validateLinkedInUrl('linkedin.com/in/user')).toBe(
        'Please enter a valid LinkedIn profile URL'
      );
    });
  });

  describe('validateGitHubUrl', () => {
    it('should return empty string for valid GitHub URLs', () => {
      expect(validateGitHubUrl('https://github.com/username')).toBe('');
      expect(validateGitHubUrl('https://www.github.com/org/repo')).toBe('');
    });

    it('should return empty string for empty input', () => {
      expect(validateGitHubUrl('')).toBe('');
      expect(validateGitHubUrl('   ')).toBe('');
    });

    it('should return error message for invalid GitHub URLs', () => {
      expect(validateGitHubUrl('https://linkedin.com/user')).toBe(
        'Please enter a valid GitHub profile URL'
      );
      expect(validateGitHubUrl('not a url')).toBe(
        'Please enter a valid GitHub profile URL'
      );
      expect(validateGitHubUrl('github.com/user')).toBe(
        'Please enter a valid GitHub profile URL'
      );
    });
  });

  describe('validateUniversityId', () => {
    it('should return empty string for valid university IDs', () => {
      expect(validateUniversityId('123456')).toBe('');
      expect(validateUniversityId('2301234')).toBe('');
    });

    it('should return empty string for empty input', () => {
      expect(validateUniversityId('')).toBe('');
      expect(validateUniversityId('   ')).toBe('');
    });

    it('should return error message for invalid university IDs', () => {
      expect(validateUniversityId('abc123')).toBe('University ID must be a number');
      expect(validateUniversityId('123abc')).toBe('University ID must be a number');
      expect(validateUniversityId('12-34')).toBe('University ID must be a number');
    });
  });
});
