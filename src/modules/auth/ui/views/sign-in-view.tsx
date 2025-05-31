'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { OctagonAlertIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { authClient } from '@/lib/auth-client';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setIsPending] = useState(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setIsPending(true);
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          setIsPending(false);
          router.push('/');
        },
        onError: ({ error }) => {
          setError(error.message);
          setIsPending(false);
        },
      },
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-bold'>Welcome Back</h1>
                  <p className='text-muted-foreground text-balance'>
                    Login to your account
                  </p>
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder='Enter your email'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder='Enter your password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className='bg-destructive/10 border-none'>
                    <OctagonAlertIcon className='h-4 w-4 !text-destructive' />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button
                  type='submit'
                  className='w-full cursor-pointer'
                  disabled={pending}
                >
                  Login
                </Button>
                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:justify-center after:border-t'>
                  <span className='text-muted-foreground bg-card relative z-10 px-2'>
                    Or continue with
                  </span>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <Button
                    disabled={pending}
                    variant='outline'
                    type='button'
                    className='w-full cursor-pointer'
                    onClick={() =>
                      authClient.signIn.social({
                        provider: 'google',
                        callbackURL: '/',
                      })
                    }
                  >
                    <FaGoogle className='mr-2 h-4 w-4' />
                  </Button>
                  <Button
                    disabled={pending}
                    onClick={() =>
                      authClient.signIn.social({
                        provider: 'github',
                        callbackURL: '/',
                      })
                    }
                    variant='outline'
                    type='button'
                    className='w-full cursor-pointer'
                  >
                    <FaGithub className='mr-2 h-4 w-4' />
                  </Button>
                </div>
                <div className='text-center text-sm'>
                  Don&apos;t have an account?{' '}
                  <Link
                    href='/sign-up'
                    className='underline underline-offset-4'
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className='bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center'>
            <Image
              src='/logo.svg'
              alt='Logo'
              width={92}
              height={92}
              className='h-[92px] w-[92px]'
            />
            <p className='text-2xl font-semibold text-white'>
              Perfect Interview AI
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
