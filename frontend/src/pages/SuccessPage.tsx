import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const SuccessPage = () => {
    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full'>
                <Card className='text-center'>
                    <CardHeader className='pb-4'>
                        <div className='mx-auto mb-4'>
                            <CheckCircle className='h-16 w-16 text-green-500' />
                        </div>
                        <CardTitle className='text-2xl font-bold text-gray-900 dark:text-white'>
                            Application Submitted!
                        </CardTitle>
                        <CardDescription className='text-lg'>
                            Thank you for your interest in joining our team.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='bg-green-50 dark:bg-green-950 rounded-lg p-4'>
                            <p className='text-sm text-green-700 dark:text-green-300'>
                                We&apos;ve received your application and resume. Our team will review your submission
                                and get back to you soon.
                            </p>
                        </div>

                        <div className='space-y-2 text-sm text-gray-600 dark:text-gray-300'>
                            <p>
                                <strong>What happens next?</strong>
                            </p>
                            <ul className='list-disc list-inside space-y-1 text-left'>
                                <li>Our HR team will review your application</li>
                                <li>You&apos;ll receive an email confirmation shortly</li>
                                <li>If selected, we&apos;ll contact you for an interview</li>
                            </ul>
                        </div>

                        <div className='pt-4'>
                            <Button
                                asChild
                                className='w-full'
                            >
                                <Link to='/'>
                                    <ArrowLeft className='mr-2 h-4 w-4' />
                                    Submit Another Application
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
