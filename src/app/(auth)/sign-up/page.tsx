import { SignUpView } from '@/modules/auth/ui/views/sign-up-view';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Server-side React component for the sign-up page that redirects authenticated users to the home page.
 *
 * If a user session is detected, the user is redirected to the root path (`'/'`). Otherwise, the sign-up interface is rendered.
 */
export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!!session) {
    redirect('/');
  }
  return <SignUpView />;
}
