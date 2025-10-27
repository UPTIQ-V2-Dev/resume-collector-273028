import { formatDistanceToNow, format, isValid, parseISO } from 'date-fns';

export const formatDate = (date: string | Date, formatString = 'MMM dd, yyyy'): string => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        if (!isValid(dateObj)) return 'Invalid date';
        return format(dateObj, formatString);
    } catch {
        return 'Invalid date';
    }
};

export const formatDateTime = (date: string | Date): string => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        if (!isValid(dateObj)) return 'Invalid date';
        return format(dateObj, 'MMM dd, yyyy HH:mm');
    } catch {
        return 'Invalid date';
    }
};

export const formatRelativeTime = (date: string | Date): string => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        if (!isValid(dateObj)) return 'Invalid date';
        return formatDistanceToNow(dateObj, { addSuffix: true });
    } catch {
        return 'Invalid date';
    }
};

export const formatDateForInput = (date: string | Date): string => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        if (!isValid(dateObj)) return '';
        return format(dateObj, 'yyyy-MM-dd');
    } catch {
        return '';
    }
};
