// Common interfaces and types for the project

export interface Project {
  id: number;
  title: string;
  course: string;
  image: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  msId: string;
  firstName: string;
  lastName: string;
}

export interface Language {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
}

// Add more types as needed
