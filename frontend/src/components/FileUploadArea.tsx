import { useCallback, useState } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { validateFileType, validateFileSize, formatFileSize } from '@/lib/fileUtils';

interface FileUploadAreaProps {
    onFileSelect: (file: File | null) => void;
    selectedFile: File | null;
    error?: string;
    className?: string;
}

export const FileUploadArea = ({ onFileSelect, selectedFile, error, className }: FileUploadAreaProps) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    }, []);

    const handleFileValidation = useCallback(
        (file: File) => {
            if (!validateFileType(file)) {
                onFileSelect(null);
                return;
            }

            if (!validateFileSize(file)) {
                onFileSelect(null);
                return;
            }

            onFileSelect(file);
        },
        [onFileSelect]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragOver(false);

            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                const file = files[0];
                handleFileValidation(file);
            }
        },
        [handleFileValidation]
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            handleFileValidation(file);
        }
    };

    const removeFile = () => {
        onFileSelect(null);
    };

    const isValidFile = selectedFile && validateFileType(selectedFile) && validateFileSize(selectedFile);

    return (
        <div className={cn('space-y-4', className)}>
            <div
                className={cn(
                    'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
                    isDragOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-300 dark:border-gray-600',
                    error ? 'border-red-500' : '',
                    'hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950'
                )}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('resume-upload')?.click()}
            >
                <input
                    id='resume-upload'
                    type='file'
                    accept='.pdf,.doc,.docx'
                    onChange={handleFileChange}
                    className='hidden'
                />

                {!selectedFile ? (
                    <div className='space-y-2'>
                        <Upload className='mx-auto h-12 w-12 text-gray-400' />
                        <div>
                            <p className='text-lg font-medium'>Click to upload or drag and drop</p>
                            <p className='text-sm text-gray-500'>PDF or Word documents only (max 10MB)</p>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center space-x-3'>
                        <File className={cn('h-8 w-8', isValidFile ? 'text-green-600' : 'text-red-600')} />
                        <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium truncate'>{selectedFile.name}</p>
                            <p className='text-xs text-gray-500'>{formatFileSize(selectedFile.size)}</p>
                        </div>
                        <button
                            type='button'
                            onClick={e => {
                                e.stopPropagation();
                                removeFile();
                            }}
                            className='text-gray-500 hover:text-gray-700'
                        >
                            <X className='h-5 w-5' />
                        </button>
                    </div>
                )}
            </div>

            {error && (
                <div className='flex items-center space-x-2 text-red-600 text-sm'>
                    <AlertCircle className='h-4 w-4' />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};
