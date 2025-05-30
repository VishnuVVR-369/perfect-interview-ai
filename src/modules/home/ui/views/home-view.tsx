'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

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
