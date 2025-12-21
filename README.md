# NU Project Showcaser - Frontend Application

![React](https://img.shields.io/badge/React-19.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF)
![Material--UI](https://img.shields.io/badge/Material--UI-7.3-007FFF)
![License](https://img.shields.io/badge/License-MIT-yellow)

A modern, responsive frontend application for showcasing Nile University student projects. Built with React, TypeScript, and Material-UI, this platform provides an intuitive interface for students to submit, browse, and discover academic projects while offering administrators and teaching assistants powerful management tools.

🌐 **Live Application:** [https://nuprojectpodium.app/](https://nuprojectpodium.app/)

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Core Features Deep Dive](#core-features-deep-dive)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Internationalization](#internationalization)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Docker](#docker)
- [Testing](#testing)
- [Development Guidelines](#development-guidelines)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

## Features

### User Experience
- **🎨 Modern UI/UX** - Glass morphism design with smooth animations and transitions
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **🌍 Bilingual Support** - English and Arabic (RTL support included)
- **🌙 Consistent Theming** - Beautiful color schemes with CSS custom properties
- **♿ Accessibility** - ARIA labels and keyboard navigation support

### Authentication & User Management
- **Microsoft OAuth 2.0 Integration** - Seamless university SSO login
- **Profile Management** - Complete profile creation and editing with validation
- **Profile Completion Flow** - Guided multi-step onboarding for first-time users
- **Role-Based UI** - Dynamic interfaces based on user role (Student, Supervisor, Admin)
- **Session Persistence** - Secure cookie-based authentication
- **Account Settings** - User profile editing, social links, and account deactivation requests

### Project Discovery & Showcase
- **Advanced Search** - Real-time search with debouncing across titles, descriptions, and technologies
- **Smart Filtering** - Filter by school, major, course, technologies, and tags
- **Project Carousel** - Featured projects showcase with auto-rotation
- **Related Projects** - Intelligent recommendations based on technologies and tags
- **Project Details View** - Rich project pages with images, videos, team info, and downloads
- **Starring System** - Bookmark favorite projects for quick access
- **Pagination** - Efficient browsing with customizable items per page
- **Empty States** - Helpful messages and CTAs when no projects match filters

### Project Submission & Management
- **Multi-Step Submission Form** - Intuitive project creation wizard with validation
- **Rich Media Upload** - Support for multiple images and video uploads
- **Technology Tags** - Auto-suggest and custom technology tags
- **Team Management** - Add team leader and multiple team members
- **Course Association** - Link projects to specific courses
- **Draft Saving** - Save progress and continue later (local state)
- **Repository & Demo Links** - GitHub/GitLab integration and live demo URLs
- **Approval Workflow** - Teaching Assistant review and approval system
- **Status Tracking** - Monitor submission status (pending, approved, rejected)

### Interactive Features
- **💬 Comment System** - Discussion threads on project pages
- **⭐ Project Starring** - Favorite projects collection
- **🐛 Bug Reporting** - In-app bug reporting with screenshot annotation
- **📧 Email Notifications** - Automated notifications for project status updates
- **📤 Share Projects** - Social sharing and direct links

### Admin Dashboard
- **📊 Statistics Overview** - Real-time platform metrics and analytics
- **👥 User Management** - Full CRUD operations on user accounts
- **📁 Project Management** - Approve, reject, edit, or delete projects
- **📝 Comments Moderation** - Review and manage all comments
- **💡 Suggestions Review** - User feedback and feature requests management
- **🏫 Schools & Courses** - Manage academic structure (schools, majors, courses)
- **📈 Data Tables** - Advanced tables with search, sort, and pagination
- **🎯 Bulk Actions** - Efficient management of multiple records

### Teaching Assistant Features
- **📋 Project Requests Dashboard** - View pending projects requiring approval
- **✅ Quick Approval Actions** - Accept or reject projects with email notifications
- **👀 Detailed Review** - Full project information for informed decisions

### Additional Features
- **🔍 SEO Optimized** - Meta tags and semantic HTML for better discoverability
- **⚡ Performance Optimized** - Code splitting, lazy loading, and caching strategies
- **🛡️ Input Validation** - Client-side validation for all forms
- **🚨 Error Handling** - User-friendly error messages and fallbacks
- **📱 Progressive Web App Ready** - PWA configuration for installability
- **🎭 Skeleton Loaders** - Loading states for better perceived performance

## Technology Stack

### Core Framework
- **[React 19.1.1](https://react.dev/)** - Modern UI library with latest features
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Type-safe development
- **[Vite 7.1.7](https://vitejs.dev/)** - Lightning-fast build tool and dev server

### UI & Styling
- **[Material-UI 7.3.4](https://mui.com/)** - Comprehensive React component library
- **[@emotion/react](https://emotion.sh/)** - CSS-in-JS styling solution
- **[@emotion/styled](https://emotion.sh/)** - Styled components API
- **[@fontsource/inter](https://fontsource.org/)** - Modern sans-serif font
- **[@fontsource/poppins](https://fontsource.org/)** - Beautiful display font

### State Management & Data Fetching
- **[Jotai 2.15.0](https://jotai.org/)** - Primitive and flexible state management
- **[TanStack Query 5.90.6](https://tanstack.com/query)** - Powerful async state management
- **Axios 1.12.2** - Promise-based HTTP client

### Routing
- **[React Router 7.9.4](https://reactrouter.com/)** - Declarative routing for React

### Internationalization
- **[react-i18next 16.2.0](https://react.i18next.com/)** - i18n framework for React
- **[i18next](https://www.i18next.com/)** - Internationalization framework

### Additional Libraries
- **[html2canvas 1.4.1](https://html2canvas.hertzen.com/)** - Screenshot capture for bug reporting
- **[markerjs3 2.29.1](https://markerjs.com/)** - Image annotation for bug reports
- **[Material Icons](https://mui.com/material-ui/material-icons/)** - Comprehensive icon set

### Development Tools
- **ESLint 9.36.0** - Linting and code quality
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - React Fast Refresh and JSX support

### Deployment
- **[Vercel](https://vercel.com/)** - Production hosting platform

## Project Structure

```
NU-Project-Showcaser-FE/
├── public/                          # Static assets
│   └── Icon.svg                     # App icon
│
├── src/
│   ├── main.tsx                     # Application entry point
│   ├── App.tsx                      # Root component with routing
│   ├── index.css                    # Global styles & CSS variables
│   │
│   ├── assets/                      # Images and media
│   │   ├── Fahd.jpg
│   │   ├── Mohamed.jpg
│   │   ├── Omar.jpg
│   │   ├── Zeyad.jpg
│   │   └── NU Header Background.png
│   │
│   ├── api/                         # API integration layer
│   │   ├── adminApi.ts              # Admin operations
│   │   ├── authApi.ts               # Authentication
│   │   ├── commentsApi.ts           # Comments CRUD
│   │   ├── coursesApi.ts            # Courses data
│   │   ├── notifyApi.ts             # Email notifications
│   │   ├── projectsApi.ts           # Projects CRUD
│   │   ├── schoolsApi.ts            # Schools data
│   │   ├── suggestionsApi.ts        # User suggestions
│   │   ├── uploadApi.ts             # File uploads
│   │   └── userApi.ts               # User operations
│   │
│   ├── atoms/                       # Jotai state atoms
│   │   ├── adminAtom.ts             # Admin state
│   │   ├── authAtom.ts              # Authentication state
│   │   └── languageAtom.ts          # Language preference
│   │
│   ├── components/                  # Reusable components
│   │   ├── Navbar/                  # Navigation bar
│   │   ├── ProjectCard/             # Project card display
│   │   ├── ProjectFilters/          # Filter controls
│   │   ├── ProjectsList/            # Projects grid/list
│   │   ├── SearchBox/               # Search functionality
│   │   ├── Comments/                # Comment section
│   │   ├── AdminSidebar/            # Admin navigation
│   │   ├── AdminTable/              # Data tables for admin
│   │   ├── BugReportButton/         # Bug reporting feature
│   │   ├── GlassCard/               # Glassmorphism card
│   │   ├── GradientButton/          # Styled button
│   │   ├── LanguageSelector/        # Language switcher
│   │   ├── Toast/                   # Notification system
│   │   ├── LoadingState/            # Loading skeletons
│   │   ├── ErrorState/              # Error displays
│   │   └── ... (50+ components)
│   │
│   ├── contexts/                    # React contexts
│   │   └── ToastContext.tsx         # Toast notification provider
│   │
│   ├── hoc/                         # Higher-order components
│   │   ├── RequireCompleteProfile.tsx  # Profile completion guard
│   │   ├── RequireProfileExists.tsx    # Auth guard
│   │   └── RequireRole.tsx             # Role-based access guard
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.ts               # Authentication logic
│   │   ├── useProjects.ts           # Projects data & mutations
│   │   ├── useUser.ts               # User data operations
│   │   ├── useComments.ts           # Comments operations
│   │   ├── useAdmin.ts              # Admin operations
│   │   ├── useCourses.ts            # Courses data
│   │   ├── useSchools.ts            # Schools data
│   │   ├── useSuggestions.ts        # Suggestions operations
│   │   ├── useMedia.ts              # Media upload operations
│   │   ├── useNotify.ts             # Email notifications
│   │   └── useToast.ts              # Toast notifications
│   │
│   ├── i18n/                        # Internationalization
│   │   ├── config.ts                # i18next configuration
│   │   └── locales/
│   │       ├── en/
│   │       │   └── translation.json # English translations
│   │       └── ar/
│   │           └── translation.json # Arabic translations
│   │
│   ├── layouts/                     # Layout components
│   │   └── MainLayout.tsx           # Main app layout with navbar
│   │
│   ├── pages/                       # Page components (routes)
│   │   ├── Home.tsx                 # Landing page
│   │   ├── Projects.tsx             # Projects listing page
│   │   ├── ViewProject.tsx          # Single project details
│   │   ├── SubmissionPage.tsx       # Project submission form
│   │   ├── UserProfile.tsx          # User profile page
│   │   ├── StarredProjectsPage.tsx  # Starred projects
│   │   ├── CompleteProfile.tsx      # Profile completion
│   │   ├── editProfile.tsx          # Profile editing
│   │   ├── AdminPanel.tsx           # Admin dashboard
│   │   ├── AcceptProject.tsx        # TA project approval
│   │   ├── AboutUs.tsx              # Team information
│   │   └── LearnMore.tsx            # About the platform
│   │
│   ├── routes/                      # Routing configuration
│   │   └── index.tsx                # Route definitions
│   │
│   ├── types/                       # TypeScript type definitions
│   │   └── index.ts                 # Shared types & interfaces
│   │
│   └── utils/                       # Utility functions
│       ├── constants.tsx            # App constants & config
│       ├── helperfunctions.ts       # Helper utilities
│       └── validation.ts            # Form validation
│
├── .github/
│   └── workflows/
│       └── frontend-build.yml       # GitHub Actions CI/CD
│
├── package.json                     # Dependencies & scripts
├── vite.config.ts                   # Vite configuration
├── vercel.json                      # Vercel deployment config
├── tsconfig.json                    # TypeScript base config
├── tsconfig.app.json                # App TypeScript config
├── tsconfig.node.json               # Node TypeScript config
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
└── README.md                        # This file
```

## Getting Started

### Prerequisites

- **Node.js** v18.x or higher
- **npm** v9.x or higher
- Backend API running (see [Backend Repository](https://github.com/Mohamed-Abdellatif/NU-Project-Showcaser-BE))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mohamed-Abdellatif/NU-Project-Showcaser-FE.git
   cd NU-Project-Showcaser-FE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE=http://localhost:3000
   ```
   
   For production:
   ```env
   VITE_API_BASE=https://nuprojectpodium-0348c7352ec2.herokuapp.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will start at `http://localhost:5173`

5. **Open in browser**
   
   Navigate to `http://localhost:5173` to see the application

### Building for Production

```bash
# Type check and build
npm run build

# Preview production build locally
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment.

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE` | Backend API base URL | `http://localhost:3000` (dev)<br/>`https://nuprojectpodium-0348c7352ec2.herokuapp.com` (prod) |

### Development vs Production

**Development (`.env.development`):**
```env
VITE_API_BASE=http://localhost:3000
```

**Production (`.env.production` or Vercel Environment Variables):**
```env
VITE_API_BASE=https://nuprojectpodium-0348c7352ec2.herokuapp.com
```

> **Note:** Vite exposes environment variables to your client-side code by prefixing them with `VITE_`. Access them using `import.meta.env.VITE_VARIABLE_NAME`.

## Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server with hot reload

# Production Build
npm run build            # Type check + build for production
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint to check code quality

# Type Checking
npm run type-check       # Run TypeScript compiler (check only)

# Testing
npm run test             # Run all tests once
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run test:ci          # Run tests in CI mode (with coverage)
```

### Script Details

- **`dev`** - Starts the Vite development server on `http://localhost:5173` with Hot Module Replacement (HMR)
- **`build`** - Compiles TypeScript (`tsc -b`) and bundles the app using Vite for production
- **`lint`** - Runs ESLint across the codebase to identify code quality issues
- **`preview`** - Serves the production build locally for testing before deployment

## Core Features Deep Dive

### Authentication Flow

The application uses **Microsoft OAuth 2.0** for university authentication:

1. User clicks "Login with Microsoft" button
2. Redirects to Azure AD login page
3. User authenticates with university credentials
4. Azure AD redirects back to application with auth code
5. Backend exchanges code for user profile and generates JWT
6. JWT stored in HTTP-only cookie for security
7. Frontend reads authentication state from cookie

**New User Flow:**
- First-time users are redirected to `/complete-profile`
- Must provide: university ID, school, major, social links
- Profile completion required before accessing protected routes

**Persistent Sessions:**
- Authentication state managed with Jotai atoms
- Automatic token refresh on API requests
- Logout clears cookies and redirects to home

### Project Discovery

**Search Implementation:**
```typescript
// Real-time search with 300ms debounce
const [searchQuery, setSearchQuery] = useState('');
const debouncedSearch = useMemo(
  () => debounce(setSearchQuery, 300),
  []
);

// Searches across: title, description, technologies, tags
```

**Filter System:**
- **School Filter** - Filter by faculty/school
- **Major Filter** - Filter by major (dependent on school)
- **Course Filter** - Filter by course code
- **Technology Tags** - Multi-select technology filtering
- **Status Filter** (Admin only) - pending, approved, rejected

**Pagination:**
- Configurable items per page (6, 12, 24, 48)
- Smart pagination controls
- URL state preservation for shareable links

### Project Submission

Multi-step form with validation:

1. **Basic Information**
   - Title, description
   - Course selection
   - Technology tags (auto-suggest + custom)

2. **Team Details**
   - Team leader (name, email)
   - Team members (multiple)
   - Supervisor name

3. **Media Upload**
   - Multiple image upload (drag & drop)
   - Video upload
   - Repository URL (GitHub/GitLab)
   - Live demo URL

4. **Review & Submit**
   - Preview all information
   - Select Teaching Assistant for review
   - Submit for approval

**Validation:**
- Email format validation
- Required field checking
- URL format validation
- File type and size restrictions

### Admin Dashboard

Comprehensive admin interface with:

**Statistics Cards:**
- Total projects (with growth percentage)
- Total users (with growth percentage)
- Pending approvals
- Total comments

**Management Sections:**
- **Projects** - CRUD operations, bulk actions, status changes
- **Users** - User management, role assignment, account activation
- **Comments** - Comment moderation and deletion
- **Suggestions** - Review user feedback and feature requests
- **Schools** - Manage schools and majors
- **Courses** - Manage course catalog

**Data Tables:**
- Server-side pagination
- Search functionality
- Sortable columns
- Quick action buttons (Edit, Delete, View)
- Bulk selection and actions

### Bug Reporting System

Innovative in-app bug reporting:

1. **FAB (Floating Action Button)** - Always accessible
2. **Screenshot Capture** - Uses html2canvas to capture current view
3. **Image Annotation** - MarkerJS integration for marking issues
4. **Form Details** - Title, description, severity selection
5. **Submission** - Sends to suggestions API with annotated screenshot

**User Benefits:**
- No need to leave the app
- Visual bug reporting
- Quick and easy submission

### Comment System

Real-time commenting on projects:

- **Add Comments** - Authenticated users can comment
- **Edit Comments** - Users can edit their own comments
- **Delete Comments** - Users can delete their own comments
- **Author Attribution** - Full name and email displayed
- **Timestamp** - Relative time display (e.g., "2 hours ago")
- **Moderation** - Admins can delete any comment

### Internationalization (i18n)

Full bilingual support:

**Languages:**
- English (en) - LTR
- Arabic (ar) - RTL with full layout mirroring

**Features:**
- Language selector in navbar
- Persistent language preference (localStorage)
- Right-to-left layout support
- Translated UI elements, messages, and content
- Date/time localization

**Implementation:**
```typescript
// Usage in components
const { t } = useTranslation();
<Typography>{t('projects.title')}</Typography>
```

**Translation Files:**
- `src/i18n/locales/en/translation.json` - English
- `src/i18n/locales/ar/translation.json` - Arabic

## Component Architecture

### Design Patterns

**Atomic Design Methodology:**
- **Atoms** - Basic building blocks (GradientButton, GlassInput)
- **Molecules** - Simple component groups (SearchBox, FilterRow)
- **Organisms** - Complex components (Navbar, ProjectCard)
- **Templates** - Page layouts (MainLayout)
- **Pages** - Complete views (Home, Projects, AdminPanel)

**Component Structure:**
```
ComponentName/
├── ComponentName.tsx       # Main component
├── components/             # Sub-components (if needed)
│   ├── SubComponent1.tsx
│   └── SubComponent2.tsx
└── index.ts               # Optional: re-export
```

### Key Components

**GlassCard** - Reusable glassmorphism card component
```typescript
<GlassCard elevation={3} blur={10}>
  <CardContent>...</CardContent>
</GlassCard>
```

**ProjectCard** - Project display card with hover effects
- Image carousel
- Technology tags
- Star count and action
- Quick view button

**AdminTable** - Generic data table for admin
- Column configuration
- Search and filter
- Pagination
- Actions (edit, delete, view)

**Toast System** - Global notification system
- Success, error, info, warning types
- Auto-dismiss
- Action buttons
- Queue management

## State Management

### Jotai Atoms

**Global State:**
```typescript
// authAtom.ts - Authentication state
export const authAtom = atom<AuthState>({
  isAuthenticated: false,
  user: null,
  loading: true
});

// languageAtom.ts - Language preference
export const languageAtom = atom<string>('en');

// adminAtom.ts - Admin-specific state
export const adminStatsAtom = atom<AdminStats | null>(null);
```

**Benefits:**
- Minimal boilerplate
- TypeScript support
- Atomic updates
- Derived state support
- DevTools integration

### TanStack Query (React Query)

**Data Fetching & Caching:**
```typescript
// useProjects hook
export const useProjects = (filters: ProjectFilters) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => fetchProjects(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Mutations for CRUD operations
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
```

**Features:**
- Automatic caching
- Background refetching
- Optimistic updates
- Request deduplication
- Garbage collection

## Internationalization

### Configuration

```typescript
// src/i18n/config.ts
i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations }
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
```

### Usage Examples

**In Components:**
```typescript
const { t, i18n } = useTranslation();

// Simple translation
<Typography>{t('welcome.message')}</Typography>

// With variables
<Typography>{t('user.greeting', { name: user.name })}</Typography>

// Change language
i18n.changeLanguage('ar');
```

**RTL Support:**
```typescript
// Automatic direction change
document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

// RTL-aware styling
<Box sx={{ 
  marginLeft: i18n.language === 'ar' ? 0 : 2,
  marginRight: i18n.language === 'ar' ? 2 : 0 
}}>
```

### Translation Structure

```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "submit": "Submit Project",
    "login": "Login"
  },
  "projects": {
    "title": "Discover Projects",
    "search": "Search projects...",
    "filter": "Filter",
    "noResults": "No projects found"
  }
}
```

## API Integration

### Axios Configuration

```typescript
// Base configuration
const API_BASE = import.meta.env.VITE_API_BASE;

axios.defaults.withCredentials = true; // Include cookies
axios.defaults.headers.common['Content-Type'] = 'application/json';
```

### API Modules

All API calls are organized into modules:

**Example - projectsApi.ts:**
```typescript
export const projectsApi = {
  // Get all projects with filters
  getAll: (filters: ProjectFilters) => 
    axios.get(`${API_BASE}/project`, { params: filters }),
  
  // Get single project
  getById: (id: string) => 
    axios.get(`${API_BASE}/project/${id}`),
  
  // Create project
  create: (data: ProjectData) => 
    axios.post(`${API_BASE}/project`, data),
  
  // Update project
  update: (id: string, data: Partial<ProjectData>) => 
    axios.put(`${API_BASE}/project/${id}`, data),
  
  // Delete project
  delete: (id: string) => 
    axios.delete(`${API_BASE}/project/${id}`),
  
  // Star/unstar project
  toggleStar: (id: string) => 
    axios.put(`${API_BASE}/project/star/${id}`)
};
```

### Error Handling

Centralized error handling with user-friendly messages:

```typescript
try {
  const response = await projectsApi.create(data);
  showSuccess('Project created successfully!');
} catch (error) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || 'An error occurred';
    showError(message);
  }
}
```

## Deployment

### Vercel Deployment (Recommended)

The application is deployed on [Vercel](https://vercel.com/) for optimal performance.

**Production URL:** [https://nuprojectpodium.app/](https://nuprojectpodium.app/)

#### Automatic Deployment

1. **Connect Repository**
   - Link GitHub repository to Vercel
   - Auto-deploy on push to `main` branch

2. **Environment Variables**
   - Add `VITE_API_BASE` in Vercel dashboard
   - Value: `https://nuprojectpodium-0348c7352ec2.herokuapp.com`

3. **Build Configuration**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

#### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variable
vercel env add VITE_API_BASE production
```

### Vercel Configuration

**vercel.json:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes work correctly with React Router's client-side routing.

### Alternative Deployment Options

#### Netlify

```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### GitHub Pages

Not recommended due to routing complexities, but possible with hash routing.

### Docker

The application can be containerized using Docker for consistent deployment across environments.

**Prerequisites:**
- Docker installed on your system
- Docker Compose (optional, for easier management)

**Build the Docker Image:**

```bash
# Build with default API URL (localhost:3000)
docker build -t nu-project-showcaser-fe .

# Build with custom API URL
docker build --build-arg VITE_API_BASE=https://your-api-url.com -t nu-project-showcaser-fe .
```

**Run the Container:**

```bash
# Run on port 80
docker run -d -p 80:80 --name nu-project-showcaser-fe nu-project-showcaser-fe

# Run on custom port (e.g., 3000)
docker run -d -p 3000:80 --name nu-project-showcaser-fe nu-project-showcaser-fe
```

**Using Docker Compose:**

1. **Set environment variable** (optional, defaults to `http://localhost:3000`):
   ```bash
   # Create .env file or export variable
   export VITE_API_BASE=https://your-api-url.com
   ```

2. **Build and run:**
   ```bash
   docker-compose up -d
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop the container:**
   ```bash
   docker-compose down
   ```

**Environment Variables:**

The `VITE_API_BASE` environment variable must be provided at **build time** (not runtime) because Vite embeds environment variables during the build process. 

- **Development:** `VITE_API_BASE=http://localhost:3000`
- **Production:** `VITE_API_BASE=https://nuprojectpodium-0348c7352ec2.herokuapp.com`

See `.env.example` for the template.

**Docker Image Features:**

- Multi-stage build for optimized image size (~20MB final image)
- nginx for efficient static file serving
- Non-root user for enhanced security
- SPA routing support (React Router)
- Health check endpoint at `/health`
- Gzip compression enabled
- Security headers configured
- Static asset caching

**Production Deployment:**

The Docker image can be:
- Pushed to container registries (Docker Hub, AWS ECR, Azure Container Registry)
- Deployed to container platforms (Kubernetes, Docker Swarm, AWS ECS, Azure Container Instances)
- Used in CI/CD pipelines for automated deployments

### Production Checklist

- [ ] Set `VITE_API_BASE` to production backend URL
- [ ] Test authentication flow with production backend
- [ ] Verify all API endpoints are accessible
- [ ] Test image and video uploads to Supabase
- [ ] Check responsive design on multiple devices
- [ ] Test RTL layout for Arabic language
- [ ] Verify SEO meta tags
- [ ] Test error boundaries and fallbacks
- [ ] Check performance metrics (Lighthouse)
- [ ] Verify CORS settings with backend
- [ ] Test all user roles (Student, Supervisor, Admin)

### Performance Optimization

**Implemented Optimizations:**
- Code splitting with React.lazy
- Image optimization (lazy loading)
- Debounced search inputs
- Memoized expensive computations
- TanStack Query caching
- Vite's automatic chunk splitting
- Tree-shaking unused code

**Lighthouse Scores (Target):**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

## Development Guidelines

### Code Style

**TypeScript:**
- Use strict mode
- Explicit return types for functions
- Prefer interfaces over types for objects
- Use enums for constants with multiple values

**React:**
- Functional components with hooks
- Custom hooks for reusable logic
- Props destructuring
- Avoid inline functions in JSX (use useCallback)

**Naming Conventions:**
- Components: PascalCase (`ProjectCard.tsx`)
- Files: camelCase (`useProjects.ts`)
- Constants: UPPER_SNAKE_CASE (`API_BASE`)
- CSS classes: kebab-case

### Component Guidelines

```typescript
// Good component structure
interface ProjectCardProps {
  project: Project;
  onStar?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onStar 
}) => {
  // Hooks at the top
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Event handlers
  const handleClick = useCallback(() => {
    navigate(`/projects/${project.id}`);
  }, [navigate, project.id]);
  
  // Render
  return (
    <Card onClick={handleClick}>
      {/* JSX */}
    </Card>
  );
};
```

### State Management Best Practices

**When to use Jotai:**
- Global app state (auth, language, theme)
- Cross-component state
- State that persists across route changes

**When to use TanStack Query:**
- Server state (API data)
- Cached data
- Background updates
- Optimistic updates

**When to use useState:**
- Component-local state
- Form inputs
- UI state (modals, dropdowns)

## Testing

The project uses **Jest** and **React Testing Library** for comprehensive testing of components, hooks, API functions, and utilities.

### Test Framework

- **[Jest 30.2.0](https://jestjs.io/)** - JavaScript testing framework
- **[React Testing Library 16.3.1](https://testing-library.com/react)** - React component testing utilities
- **[@testing-library/jest-dom](https://github.com/testing-library/jest-dom)** - Custom Jest matchers for DOM elements
- **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro)** - User interaction simulation

### Running Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode (with coverage, optimized for CI environments)
npm run test:ci
```

### Test Structure

Tests are organized alongside the code they test:

```
src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.tsx
│   │   └── __tests__/
│   │       └── Navbar.test.tsx
│   └── ProjectCard/
│       ├── ProjectCard.tsx
│       └── __tests__/
│           └── ProjectCard.test.tsx
├── hooks/
│   ├── useAuth.ts
│   └── __tests__/
│       ├── useAuth.test.tsx
│       └── useProjects.test.tsx
├── api/
│   ├── authApi.ts
│   └── __tests__/
│       ├── authApi.test.ts
│       └── projectsApi.test.ts
├── utils/
│   ├── validation.ts
│   └── __tests__/
│       ├── validation.test.ts
│       └── helperfunctions.test.ts
└── test-utils/
    └── index.tsx          # Testing utilities and helpers
```

### Test Utilities

The project includes a custom test utilities file (`src/test-utils/index.tsx`) that provides:

**Custom Render Function:**
- Wraps components with all necessary providers (QueryClient, BrowserRouter, I18nextProvider)
- Ensures consistent test environment setup

**Mock Data Factories:**
- `createMockUser()` - Creates mock user objects
- `createMockProject()` - Creates mock project objects
- `createMockMember()` - Creates mock team member objects

**Example Usage:**
```typescript
import { render, screen, createMockUser, createMockProject } from '../../test-utils';
import { ProjectCard } from '../ProjectCard';

describe('ProjectCard', () => {
  it('renders project title', () => {
    const mockProject = createMockProject({ title: 'My Test Project' });
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('My Test Project')).toBeInTheDocument();
  });
});
```

### Test Examples

**Component Testing:**
```typescript
import { render, screen, fireEvent } from '../../test-utils';
import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    render(<Navbar />);
    const searchBox = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchBox, { target: { value: 'test query' } });
    expect(searchBox).toHaveValue('test query');
  });
});
```

**Hook Testing:**
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '../useAuth';
import * as authApi from '../../api/authApi';

jest.mock('../../api/authApi');

describe('useAuth', () => {
  it('fetches user data on mount', async () => {
    const mockUser = createMockUser();
    (authApi.getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });
  });
});
```

**API Testing:**
```typescript
import axios from 'axios';
import { projectsApi } from '../projectsApi';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('projectsApi', () => {
  it('fetches all projects', async () => {
    const mockProjects = [createMockProject()];
    mockedAxios.get.mockResolvedValue({ data: mockProjects });

    const result = await projectsApi.getAll({});

    expect(result.data).toEqual(mockProjects);
    expect(mockedAxios.get).toHaveBeenCalledWith('/project', { params: {} });
  });
});
```

**Utility Function Testing:**
```typescript
import { validateEmail, validateUrl } from '../validation';

describe('validation', () => {
  it('validates email addresses', () => {
    expect(validateEmail('test@nu.edu.eg')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  it('validates URLs', () => {
    expect(validateUrl('https://github.com/user/repo')).toBe(true);
    expect(validateUrl('not-a-url')).toBe(false);
  });
});
```

### Test Configuration

**Jest Configuration (`jest.config.ts`):**
- TypeScript support via `ts-jest`
- jsdom environment for React component testing
- Module name mapping for CSS and assets
- Coverage thresholds and reporting
- Custom setup file (`jest.setup.ts`)

**Jest Setup (`jest.setup.ts`):**
- Configures `@testing-library/jest-dom` matchers
- Mocks browser APIs (matchMedia, IntersectionObserver, scrollTo)
- Sets up Vite environment variables for tests
- Polyfills for TextEncoder/TextDecoder

### Coverage

The project tracks test coverage with the following thresholds:

- **Lines:** 8% (target: 70%)
- **Branches:** 6% (target: 65%)
- **Functions:** 7% (target: 70%)
- **Statements:** 8% (target: 70%)

Coverage reports are generated in multiple formats:
- **Text** - Console output
- **LCOV** - For CI/CD integration
- **HTML** - Interactive report in `coverage/` directory

View the HTML coverage report:
```bash
npm run test:coverage
# Open coverage/index.html in your browser
```

### Testing Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on what users see and interact with
   - Avoid testing internal component state

2. **Use Accessible Queries**
   - Prefer `getByRole`, `getByLabelText`, `getByText`
   - Use `data-testid` as a last resort

3. **Mock External Dependencies**
   - Mock API calls, external libraries, and browser APIs
   - Use `jest.mock()` for module mocking

4. **Test User Interactions**
   - Use `@testing-library/user-event` for realistic interactions
   - Test complete user flows, not just isolated actions

5. **Keep Tests Isolated**
   - Each test should be independent
   - Use `beforeEach`/`afterEach` for cleanup
   - Don't rely on test execution order

6. **Write Descriptive Test Names**
   - Use clear, descriptive test descriptions
   - Follow the pattern: "should [expected behavior] when [condition]"

### Current Test Coverage

The project includes tests for:

- ✅ **Components:** Navbar, ProjectCard
- ✅ **Hooks:** useAuth, useProjects
- ✅ **API Functions:** authApi, projectsApi
- ✅ **Utilities:** validation, helperfunctions

### Adding New Tests

When adding new features, follow these steps:

1. **Create test file** in `__tests__/` directory next to the component/function
2. **Import testing utilities** from `test-utils`
3. **Write test cases** covering:
   - Happy paths
   - Edge cases
   - Error handling
   - User interactions
4. **Run tests** to ensure they pass
5. **Check coverage** to identify untested code paths

**Example: Adding a test for a new component**
```typescript
// src/components/NewComponent/__tests__/NewComponent.test.tsx
import { render, screen } from '../../../test-utils';
import { NewComponent } from '../NewComponent';

describe('NewComponent', () => {
  it('renders correctly', () => {
    render(<NewComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Git Workflow

**Branch Naming:**
- Features: `feature/feature-name`
- Fixes: `fix/bug-description`
- Hotfixes: `hotfix/critical-bug`
- Refactoring: `refactor/component-name`

**Commit Messages:**
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add project starring functionality
fix: resolve mobile nav menu overlap
docs: update README with deployment steps
style: format code with Prettier
refactor: extract common table logic to hook
test: add unit tests for ProjectCard
chore: update dependencies
```

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] No console.log statements
- [ ] Proper TypeScript typing
- [ ] No any types (except when absolutely necessary)
- [ ] Proper error handling
- [ ] Loading and error states handled
- [ ] Responsive design tested
- [ ] Accessibility considered (ARIA labels, keyboard navigation)
- [ ] i18n keys added for new text
- [ ] No hardcoded strings
- [ ] Comments for complex logic

## Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/NU-Project-Showcaser-FE.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow the coding guidelines
   - Add/update tests if applicable

4. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide a clear description
   - Link any related issues
   - Request review from maintainers

### Contribution Ideas

**Good First Issues:**
- Add unit tests for components
- Improve accessibility (ARIA labels)
- Add more translations
- Fix responsive design issues
- Improve error messages

**Advanced Contributions:**
- Implement dark mode
- Add more admin analytics
- Optimize performance
- Add PWA features
- Implement real-time notifications

### Pull Request Guidelines

**PR Title Format:**
```
<type>: <description>

Examples:
feat: add dark mode toggle
fix: resolve mobile menu bug
docs: update installation instructions
```

**PR Description Template:**
```markdown
## What does this PR do?
Brief description of changes

## Why is this needed?
Context and motivation

## How was this tested?
Testing steps and screenshots

## Screenshots (if applicable)
Before / After images

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

## Team

This project was built by a talented team of students from **Nile University**:

### Founding Members

<table>
  <tr>
    <td align="center">
      <img src="src/assets/Mohamed.jpg" width="100px;" alt="Mohamed Abdellatif"/><br />
      <sub><b>Mohamed Abdellatif</b></sub><br />
      <sub>Full Stack Developer</sub><br />
      <a href="mailto:m.abdellatif2319@nu.edu.eg">Email</a> •
      <a href="https://github.com/Mohamed-Abdellatif">GitHub</a> •
      <a href="https://www.linkedin.com/in/mohamed-abdellatif-6060371b0/">LinkedIn</a>
    </td>
    <td align="center">
      <img src="src/assets/Fahd.jpg" width="100px;" alt="Fahd Khater"/><br />
      <sub><b>Fahd Khater</b></sub><br />
      <sub>Frontend Developer</sub><br />
      <a href="mailto:f.essameldin2333@nu.edu.eg">Email</a> •
      <a href="https://github.com/FahdKhater">GitHub</a> •
      <a href="https://www.linkedin.com/in/fahd-khater-8698a02b0/">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="src/assets/Zeyad.jpg" width="100px;" alt="Zeyad Ahmed"/><br />
      <sub><b>Zeyad Ahmed</b></sub><br />
      <sub>Frontend Developer</sub><br />
      <a href="mailto:z.ahmed2310@nu.edu.eg">Email</a> •
      <a href="https://github.com/Zeyad-Ahmed2005">GitHub</a> •
      <a href="https://www.linkedin.com/in/zeyad-ahmed-b57019278/">LinkedIn</a>
    </td>
    <td align="center">
      <img src="src/assets/Omar.jpg" width="100px;" alt="Omar Abouhussein"/><br />
      <sub><b>Omar Abouhussein</b></sub><br />
      <sub>Backend Developer</sub><br />
      <a href="mailto:o.tamer2391@nu.edu.eg">Email</a> •
      <a href="https://github.com/Lark01">GitHub</a> •
      <a href="https://www.linkedin.com/in/omar-abouhussein-a371592b7/">LinkedIn</a>
    </td>
  </tr>
</table>

## Related Repositories

- **Backend API:** [NU-Project-Showcaser-BE](https://github.com/Mohamed-Abdellatif/NU-Project-Showcaser-BE)
- **Production App:** [nuprojectpodium.app](https://nuprojectpodium.app/)
- **Backend API:** [nuprojectpodium-0348c7352ec2.herokuapp.com](https://nuprojectpodium-0348c7352ec2.herokuapp.com/)

## Support & Contact

- **Issues:** [GitHub Issues](https://github.com/Mohamed-Abdellatif/NU-Project-Showcaser-FE/issues)
- **Email:** m.abdellatif2319@nu.edu.eg
- **University:** [Nile University](https://nu.edu.eg/)

For bug reports, please use the in-app bug reporting feature or create a GitHub issue.

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 NU Project Showcaser Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Acknowledgments

- **Nile University** - For supporting this project and providing resources
- **Microsoft** - For Azure AD OAuth integration
- **Material-UI Team** - For the excellent component library
- **Vercel** - For the amazing hosting platform
- **Open Source Community** - For the incredible tools and libraries

---

**Built with ❤️ by students, for students at Nile University**

[⬆ Back to top](#nu-project-showcaser---frontend-application)
