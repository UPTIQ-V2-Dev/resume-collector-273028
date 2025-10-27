export interface CreateApplicationRequest {
    fullName: string;
    email: string;
    phoneNumber?: string;
    linkedinProfile?: string;
    portfolioWebsite?: string;
    jobPosition: string;
    additionalNotes?: string;
    resumeFile: File;
}

export interface Application {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    linkedinProfile?: string;
    portfolioWebsite?: string;
    jobPosition: string;
    additionalNotes?: string;
    resumeFileName: string;
    resumeFileUrl: string;
    status: ApplicationStatus;
    submittedAt: string;
    updatedAt: string;
}

export interface AdminApplication extends Application {
    notes?: string;
    reviewedBy?: string;
    reviewedAt?: string;
}

export type ApplicationStatus = 'new' | 'reviewed' | 'shortlisted' | 'rejected';

export interface ApplicationFilters {
    status?: ApplicationStatus;
    jobPosition?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
}

export interface ApplicationsListResponse {
    applications: Application[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

export interface UpdateApplicationStatusRequest {
    status: ApplicationStatus;
    notes?: string;
}

export interface FileUploadResponse {
    fileUrl: string;
    fileName: string;
}
