/**
 * Validation helper functions for form inputs
 */

/**
 * Validates if a string is a valid URL
 * @param url - The URL string to validate
 * @returns true if valid URL, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  if (!url.trim()) return true; // Empty is valid (optional field)
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
};

/**
 * Validates if a string is a valid LinkedIn profile URL
 * @param url - The LinkedIn URL string to validate
 * @returns true if valid LinkedIn URL, false otherwise
 */
export const isValidLinkedInUrl = (url: string): boolean => {
  if (!url.trim()) return true; // Empty is valid (optional field)
  if (!isValidUrl(url)) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("linkedin.com");
  } catch {
    return false;
  }
};

/**
 * Validates if a string is a valid GitHub profile URL
 * @param url - The GitHub URL string to validate
 * @returns true if valid GitHub URL, false otherwise
 */
export const isValidGitHubUrl = (url: string): boolean => {
  if (!url.trim()) return true; // Empty is valid (optional field)
  if (!isValidUrl(url)) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("github.com");
  } catch {
    return false;
  }
};

/**
 * Validates if a string is a valid university ID (numeric only)
 * @param id - The university ID string to validate
 * @returns true if valid university ID, false otherwise
 */
export const isValidUniversityId = (id: string): boolean => {
  if (!id.trim()) return true; // Empty is valid (optional field)
  return /^\d+$/.test(id.trim());
};

/**
 * Validates LinkedIn URL and returns error message
 * @param url - The LinkedIn URL string to validate
 * @returns Error message string, or empty string if valid
 */
export const validateLinkedInUrl = (url: string): string => {
  if (!url.trim()) return ""; // Empty is valid (optional field)
  if (!isValidLinkedInUrl(url)) {
    return "Please enter a valid LinkedIn profile URL";
  }
  return "";
};

/**
 * Validates GitHub URL and returns error message
 * @param url - The GitHub URL string to validate
 * @returns Error message string, or empty string if valid
 */
export const validateGitHubUrl = (url: string): string => {
  if (!url.trim()) return ""; // Empty is valid (optional field)
  if (!isValidGitHubUrl(url)) {
    return "Please enter a valid GitHub profile URL";
  }
  return "";
};

/**
 * Validates University ID and returns error message
 * @param id - The university ID string to validate
 * @returns Error message string, or empty string if valid
 */
export const validateUniversityId = (id: string): string => {
  if (!id.trim()) return ""; // Empty is valid (optional field)
  if (!isValidUniversityId(id)) {
    return "University ID must be a number";
  }
  return "";
};

