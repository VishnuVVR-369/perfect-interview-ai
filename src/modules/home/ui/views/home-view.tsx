'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

/**
 * Displays the home view with user session awareness and sign-out functionality.
 *
 * Shows the logged-in user's name and a sign-out button if a session exists; otherwise, displays only the application title.
 */
export function HomeView() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center h-screen text-3xl font-bold text-green-400'>
      {!!session ? (
        <>
          Logged in as {session?.user?.name}
          <br />
          Perfect Interview AI
          <Button
            className='cursor-pointer'
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push('/sign-in');
                  },
                },
              })
            }
          >
            Sign out
          </Button>
        </>
      ) : (
        <>Perfect Interview AI</>
      )}
    </div>
  );
}
