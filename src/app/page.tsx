import { auth } from '@/lib/auth';
import { HomeView } from '@/modules/home/ui/views/home-view';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Renders the home page, redirecting unauthenticated users to the sign-in page.
 *
 * Retrieves the current user session from the request headers. If the user is not authenticated, performs a server-side redirect to the sign-in page. Otherwise, renders the {@link HomeView} component.
 */
export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/sign-in');
  }
  return <HomeView />;
}
