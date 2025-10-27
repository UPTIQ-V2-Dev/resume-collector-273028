import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUploadArea } from '@/components/FileUploadArea';

import { applicationFormSchema, type ApplicationFormData } from '@/lib/validations';
import { applicationService } from '@/services/applications';

export const ResumeSubmissionForm = () => {
    const navigate = useNavigate();

    const form = useForm<ApplicationFormData>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            linkedinProfile: '',
            portfolioWebsite: '',
            jobPosition: '',
            additionalNotes: ''
        }
    });

    const { data: jobPositions = [], isLoading: isLoadingJobPositions } = useQuery({
        queryKey: ['jobPositions'],
        queryFn: applicationService.getJobPositions
    });

    const submitApplicationMutation = useMutation({
        mutationFn: applicationService.submitApplication,
        onSuccess: () => {
            toast.success('Application submitted successfully!');
            navigate('/success');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to submit application');
        }
    });

    const onSubmit = (data: ApplicationFormData) => {
        submitApplicationMutation.mutate({
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            linkedinProfile: data.linkedinProfile,
            portfolioWebsite: data.portfolioWebsite,
            jobPosition: data.jobPosition,
            additionalNotes: data.additionalNotes,
            resumeFile: data.resumeFile
        });
    };

    const isSubmitting = submitApplicationMutation.isPending;

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-2xl mx-auto'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Submit Your Application</h1>
                    <p className='mt-2 text-gray-600 dark:text-gray-300'>
                        We&apos;d love to hear from you! Please fill out the form below to apply for a position at our
                        company.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Application Form</CardTitle>
                        <CardDescription>
                            Please provide your details and upload your resume. All required fields are marked with *.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-6'
                            >
                                <FormField
                                    control={form.control}
                                    name='fullName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Enter your full name'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='email'
                                                    placeholder='Enter your email address'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='phoneNumber'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Enter your phone number'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='linkedinProfile'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>LinkedIn Profile</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='https://linkedin.com/in/yourprofile'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='portfolioWebsite'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Portfolio/Personal Website</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='https://yourwebsite.com'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='jobPosition'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Job Position *</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select a job position' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {isLoadingJobPositions ? (
                                                        <SelectItem
                                                            value=''
                                                            disabled
                                                        >
                                                            Loading positions...
                                                        </SelectItem>
                                                    ) : (
                                                        jobPositions.map(position => (
                                                            <SelectItem
                                                                key={position}
                                                                value={position}
                                                            >
                                                                {position}
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='resumeFile'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Resume *</FormLabel>
                                            <FormControl>
                                                <FileUploadArea
                                                    onFileSelect={file => field.onChange(file)}
                                                    selectedFile={field.value}
                                                    error={form.formState.errors.resumeFile?.message}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='additionalNotes'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Additional Notes</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us more about yourself or anything else you'd like us to know"
                                                    className='resize-none'
                                                    rows={4}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='pt-4'>
                                    <Button
                                        type='submit'
                                        disabled={isSubmitting}
                                        className='w-full'
                                        size='lg'
                                    >
                                        {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                                        {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
