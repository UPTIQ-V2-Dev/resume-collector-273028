import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
];

export const applicationFormSchema = z.object({
    fullName: z
        .string()
        .min(2, 'Full name must be at least 2 characters')
        .max(100, 'Full name must not exceed 100 characters'),

    email: z.string().email('Please enter a valid email address'),

    phoneNumber: z
        .string()
        .optional()
        .refine(value => {
            if (!value) return true;
            return /^[+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-()]/g, ''));
        }, 'Please enter a valid phone number'),

    linkedinProfile: z
        .string()
        .optional()
        .refine(value => {
            if (!value) return true;
            return value.includes('linkedin.com') && (value.startsWith('http://') || value.startsWith('https://'));
        }, 'Please enter a valid LinkedIn profile URL'),

    portfolioWebsite: z
        .string()
        .optional()
        .refine(value => {
            if (!value) return true;
            return /^https?:\/\/.+/.test(value);
        }, 'Please enter a valid website URL'),

    jobPosition: z.string().min(1, 'Please select a job position'),

    additionalNotes: z
        .string()
        .optional()
        .refine(value => {
            if (!value) return true;
            return value.length <= 1000;
        }, 'Additional notes must not exceed 1000 characters'),

    resumeFile: z
        .instanceof(File)
        .refine(file => file.size <= MAX_FILE_SIZE, 'File size must not exceed 10MB')
        .refine(file => ACCEPTED_FILE_TYPES.includes(file.type), 'Only PDF and Word documents are allowed')
});

export const loginFormSchema = z.object({
    email: z.string().email('Please enter a valid email address'),

    password: z.string().min(6, 'Password must be at least 6 characters')
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
