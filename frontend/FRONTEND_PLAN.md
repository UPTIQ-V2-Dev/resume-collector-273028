# Resume Collector App - Frontend Implementation Plan

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **shadcn/ui** components
- **React Hook Form** + **Zod** for form validation
- **React Router DOM** for navigation
- **Axios** for API calls
- **React Query** for data fetching

## Page-by-Page Implementation Plan

### 1. Home/Application Form Page (`/`)

**Components:**

- `ResumeSubmissionForm` - Main application form
- `FileUploadArea` - Drag & drop resume upload
- `FormField` components (name, email, phone, etc.)

**Utils:**

- `fileValidation.ts` - PDF/Word validation, size limits
- `formValidation.ts` - Zod schemas for form data

**Types:**

- `Application.ts` - Application form data interface
- `FileUpload.ts` - File upload types

**API Endpoints:**

- `POST /api/applications` - Submit application
- `POST /api/upload` - Upload resume file

### 2. Success Page (`/success`)

**Components:**

- `SuccessMessage` - Thank you confirmation
- `ApplicationSummary` - Show submitted details

### 3. Admin Login Page (`/admin/login`)

**Components:**

- `LoginForm` - Email/password authentication
- `LoginLayout` - Simple centered layout

**Utils:**

- `authValidation.ts` - Login form validation

**Types:**

- `Auth.ts` - Login credentials interface

**API Endpoints:**

- `POST /api/auth/login` - Admin authentication

### 4. Admin Dashboard Page (`/admin/dashboard`)

**Components:**

- `DashboardLayout` - Main admin layout with sidebar
- `ApplicationsList` - Paginated applications table
- `SearchFilters` - Filter by name, date, position
- `StatusBadge` - Application status indicator
- `BulkActions` - Export, bulk operations
- `StatsCards` - Application statistics

**Utils:**

- `dateUtils.ts` - Date formatting helpers
- `exportUtils.ts` - CSV/Excel export functions
- `statusHelpers.ts` - Status management utilities

**Types:**

- `AdminApplication.ts` - Extended application with admin fields
- `FilterOptions.ts` - Search/filter interfaces

**API Endpoints:**

- `GET /api/admin/applications` - Fetch applications with pagination/filters
- `PUT /api/admin/applications/:id/status` - Update application status
- `DELETE /api/admin/applications/:id` - Delete application
- `GET /api/admin/export` - Export applications data

### 5. Application Detail Page (`/admin/applications/:id`)

**Components:**

- `ApplicationDetails` - Full applicant information display
- `ResumeViewer` - Resume preview/download
- `StatusActions` - Update application status
- `ContactActions` - Email applicant (optional)
- `NotesSection` - Admin notes/comments

**Utils:**

- `resumeUtils.ts` - Resume download/preview helpers

**API Endpoints:**

- `GET /api/admin/applications/:id` - Fetch single application
- `GET /api/files/resume/:id` - Download resume file
- `POST /api/admin/applications/:id/notes` - Add admin notes
- `POST /api/admin/applications/:id/email` - Send email to applicant

## Common Components & Features

### Layout Components

- `AdminLayout` - Sidebar navigation for admin pages
- `PublicLayout` - Simple layout for public pages
- `Sidebar` - Admin navigation menu
- `Header` - Common header component

### UI Components (using existing shadcn/ui)

- `Button`, `Input`, `Textarea`, `Select`, `Checkbox`
- `Card`, `Badge`, `Table`, `Dialog`, `AlertDialog`
- `Dropdown`, `Sheet`, `Toast` (Sonner)
- `Form` components with React Hook Form integration

### Utilities

- `api.ts` - Axios configuration and interceptors
- `constants.ts` - Application constants (file types, statuses)
- `utils.ts` - General utility functions
- `auth.ts` - Authentication helpers and guards

### Types

- `api.ts` - API response/request interfaces
- `user.ts` - User/admin types
- `common.ts` - Shared type definitions

### Hooks

- `useAuth.ts` - Authentication state management
- `useApplications.ts` - Applications data fetching
- `useFileUpload.ts` - File upload functionality
- `useDebounce.ts` - Search debouncing

## Routing Structure

```
/ - Home/Application Form
/success - Success page after submission
/admin/login - Admin authentication
/admin/dashboard - Main admin dashboard
/admin/applications/:id - Individual application details
```

## Key Implementation Notes

1. **File Upload**: Use FormData with progress tracking, validate file types/sizes client-side
2. **Authentication**: JWT tokens, protected routes with redirect logic
3. **Form Validation**: Comprehensive Zod schemas with real-time validation
4. **State Management**: React Query for server state, Context for auth state
5. **Error Handling**: Global error boundary, toast notifications for user feedback
6. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
7. **Accessibility**: ARIA labels, keyboard navigation, screen reader support
8. **Security**: File upload restrictions, admin route protection, input sanitization

## Optional Features for Future Phases

- Email notifications integration
- Dark mode toggle
- Advanced search/filtering
- Application analytics dashboard
- Team member assignment
- Bulk status updates
