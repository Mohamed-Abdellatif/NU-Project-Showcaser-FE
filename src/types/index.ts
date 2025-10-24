// Common interfaces and types for the project

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Add more types as needed
