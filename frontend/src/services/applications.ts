import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import { mockApplications, jobPositions } from '@/data/mockData';
import type {
    CreateApplicationRequest,
    Application,
    ApplicationsListResponse,
    ApplicationFilters,
    UpdateApplicationStatusRequest,
    FileUploadResponse
} from '@/types/application';

export const applicationService = {
    submitApplication: async (applicationData: CreateApplicationRequest): Promise<Application> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: submitApplication ---', applicationData);
            await mockApiDelay();

            const newApplication: Application = {
                id: Math.random().toString(36).substr(2, 9),
                fullName: applicationData.fullName,
                email: applicationData.email,
                phoneNumber: applicationData.phoneNumber,
                linkedinProfile: applicationData.linkedinProfile,
                portfolioWebsite: applicationData.portfolioWebsite,
                jobPosition: applicationData.jobPosition,
                additionalNotes: applicationData.additionalNotes,
                resumeFileName: applicationData.resumeFile.name,
                resumeFileUrl: `/files/resumes/${applicationData.resumeFile.name}`,
                status: 'new',
                submittedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            return newApplication;
        }

        const formData = new FormData();
        formData.append('fullName', applicationData.fullName);
        formData.append('email', applicationData.email);
        if (applicationData.phoneNumber) formData.append('phoneNumber', applicationData.phoneNumber);
        if (applicationData.linkedinProfile) formData.append('linkedinProfile', applicationData.linkedinProfile);
        if (applicationData.portfolioWebsite) formData.append('portfolioWebsite', applicationData.portfolioWebsite);
        formData.append('jobPosition', applicationData.jobPosition);
        if (applicationData.additionalNotes) formData.append('additionalNotes', applicationData.additionalNotes);
        formData.append('resumeFile', applicationData.resumeFile);

        const response = await api.post('/applications', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    getApplications: async (
        filters?: ApplicationFilters,
        page = 1,
        pageSize = 10
    ): Promise<ApplicationsListResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getApplications ---', filters, page, pageSize);
            await mockApiDelay();

            let filteredApplications = [...mockApplications];

            if (filters?.status) {
                filteredApplications = filteredApplications.filter(app => app.status === filters.status);
            }

            if (filters?.jobPosition) {
                filteredApplications = filteredApplications.filter(app => app.jobPosition === filters.jobPosition);
            }

            if (filters?.search) {
                const searchLower = filters.search.toLowerCase();
                filteredApplications = filteredApplications.filter(
                    app =>
                        app.fullName.toLowerCase().includes(searchLower) ||
                        app.email.toLowerCase().includes(searchLower) ||
                        app.jobPosition.toLowerCase().includes(searchLower)
                );
            }

            const totalCount = filteredApplications.length;
            const totalPages = Math.ceil(totalCount / pageSize);
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const applications = filteredApplications.slice(startIndex, endIndex);

            return {
                applications,
                totalCount,
                totalPages,
                currentPage: page,
                pageSize
            };
        }

        const response = await api.get('/admin/applications', {
            params: {
                ...filters,
                page,
                pageSize
            }
        });
        return response.data;
    },

    getApplicationById: async (id: string): Promise<Application> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getApplicationById ---', id);
            await mockApiDelay();

            const application = mockApplications.find(app => app.id === id);
            if (!application) {
                throw new Error('Application not found');
            }
            return application;
        }

        const response = await api.get(`/admin/applications/${id}`);
        return response.data;
    },

    updateApplicationStatus: async (id: string, updateData: UpdateApplicationStatusRequest): Promise<Application> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: updateApplicationStatus ---', id, updateData);
            await mockApiDelay();

            const application = mockApplications.find(app => app.id === id);
            if (!application) {
                throw new Error('Application not found');
            }

            return {
                ...application,
                status: updateData.status,
                updatedAt: new Date().toISOString()
            };
        }

        const response = await api.put(`/admin/applications/${id}/status`, updateData);
        return response.data;
    },

    deleteApplication: async (id: string): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: deleteApplication ---', id);
            await mockApiDelay();
            return;
        }

        await api.delete(`/admin/applications/${id}`);
    },

    downloadResume: async (id: string): Promise<Blob> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: downloadResume ---', id);
            await mockApiDelay();

            return new Blob(['Mock resume content'], { type: 'application/pdf' });
        }

        const response = await api.get(`/files/resume/${id}`, {
            responseType: 'blob'
        });
        return response.data;
    },

    exportApplications: async (filters?: ApplicationFilters): Promise<Blob> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: exportApplications ---', filters);
            await mockApiDelay();

            const csvContent = [
                'Full Name,Email,Phone Number,LinkedIn Profile,Portfolio Website,Job Position,Status,Submitted At',
                ...mockApplications.map(
                    app =>
                        `"${app.fullName}","${app.email}","${app.phoneNumber || ''}","${app.linkedinProfile || ''}","${app.portfolioWebsite || ''}","${app.jobPosition}","${app.status}","${app.submittedAt}"`
                )
            ].join('\n');

            return new Blob([csvContent], { type: 'text/csv' });
        }

        const response = await api.get('/admin/export', {
            params: filters,
            responseType: 'blob'
        });
        return response.data;
    },

    getJobPositions: async (): Promise<string[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getJobPositions ---');
            await mockApiDelay();
            return jobPositions;
        }

        const response = await api.get('/job-positions');
        return response.data;
    },

    uploadFile: async (file: File): Promise<FileUploadResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: uploadFile ---', file.name);
            await mockApiDelay();

            return {
                fileUrl: `/files/resumes/${file.name}`,
                fileName: file.name
            };
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
};
