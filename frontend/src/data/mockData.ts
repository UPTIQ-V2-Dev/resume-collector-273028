import type { PaginatedResponse } from '@/types/api';
import type { AuthResponse, User } from '@/types/user';
import type { Application, ApplicationsListResponse } from '@/types/application';

export const mockUser: User = {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    role: 'USER',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockAdminUser: User = {
    id: 2,
    email: 'admin@example.com',
    name: 'Jane Smith',
    role: 'ADMIN',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockUsers: User[] = [mockUser, mockAdminUser];

export const mockAuthResponse: AuthResponse = {
    user: mockUser,
    tokens: {
        access: {
            token: 'mock-access-token',
            expires: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        },
        refresh: {
            token: 'mock-refresh-token',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    }
};

export const mockPaginatedUsers: PaginatedResponse<User> = {
    results: mockUsers,
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 2
};

export const mockApplications: Application[] = [
    {
        id: '1',
        fullName: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        phoneNumber: '+1-555-0123',
        linkedinProfile: 'https://linkedin.com/in/alice-johnson',
        portfolioWebsite: 'https://alicejohnson.dev',
        jobPosition: 'Frontend Developer',
        additionalNotes: 'I have 3 years of experience in React and TypeScript.',
        resumeFileName: 'alice_johnson_resume.pdf',
        resumeFileUrl: '/files/resumes/alice_johnson_resume.pdf',
        status: 'new',
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '2',
        fullName: 'Bob Smith',
        email: 'bob.smith@email.com',
        phoneNumber: '+1-555-0456',
        jobPosition: 'Backend Developer',
        additionalNotes: 'Experienced with Node.js, Python, and cloud technologies.',
        resumeFileName: 'bob_smith_resume.pdf',
        resumeFileUrl: '/files/resumes/bob_smith_resume.pdf',
        status: 'reviewed',
        submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '3',
        fullName: 'Carol Williams',
        email: 'carol.williams@email.com',
        phoneNumber: '+1-555-0789',
        linkedinProfile: 'https://linkedin.com/in/carol-williams',
        jobPosition: 'Full Stack Developer',
        additionalNotes: 'Proficient in both frontend and backend technologies. Looking for new challenges.',
        resumeFileName: 'carol_williams_resume.pdf',
        resumeFileUrl: '/files/resumes/carol_williams_resume.pdf',
        status: 'shortlisted',
        submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '4',
        fullName: 'David Brown',
        email: 'david.brown@email.com',
        phoneNumber: '+1-555-0321',
        portfolioWebsite: 'https://davidbrown.portfolio.com',
        jobPosition: 'UI/UX Designer',
        additionalNotes: 'Creative designer with 5 years of experience in user interface design.',
        resumeFileName: 'david_brown_resume.pdf',
        resumeFileUrl: '/files/resumes/david_brown_resume.pdf',
        status: 'rejected',
        submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '5',
        fullName: 'Emma Davis',
        email: 'emma.davis@email.com',
        phoneNumber: '+1-555-0654',
        linkedinProfile: 'https://linkedin.com/in/emma-davis',
        portfolioWebsite: 'https://emmadavis.com',
        jobPosition: 'Frontend Developer',
        additionalNotes: 'Passionate about creating accessible and performant web applications.',
        resumeFileName: 'emma_davis_resume.pdf',
        resumeFileUrl: '/files/resumes/emma_davis_resume.pdf',
        status: 'new',
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
];

export const mockApplicationsListResponse: ApplicationsListResponse = {
    applications: mockApplications,
    totalCount: mockApplications.length,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10
};

export const jobPositions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'DevOps Engineer',
    'Data Scientist',
    'Product Manager',
    'Quality Assurance Engineer'
];
