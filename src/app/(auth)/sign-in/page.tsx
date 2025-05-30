import { SignInView } from '@/modules/auth/ui/views/sign-in-view';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Server component for the sign-in page that redirects authenticated users to the home page.
 *
 * If a user session exists, the user is redirected to the root path. Otherwise, the sign-in view is rendered.
 */
export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!!session) {
    redirect('/');
  }
  return <SignInView />;
}
