import { authClient } from '@/lib/auth-client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import GeneratedAvatar from '@/components/generated-avatar';
import { ChevronDownIcon, CreditCardIcon, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardUserButton() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  if (isPending || !data?.user) {
    return null;
  }

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden'>
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant='initials'
            className='size-9 mr-3'
          />
        )}
        <div className='flex flex-col gap-0.5 text-left overflow-hidden flex-1 pl-2 min-w-0'>
          <p className='text-sm truncate w-full'>{data.user.name}</p>
          <p className='text-xs truncate w-full'>{data.user.email}</p>
        </div>
        <ChevronDownIcon className='w-4 h-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' side='right' className='w-72'>
        <DropdownMenuLabel>
          <div className='flex flex-col gap-1'>
            <span className='truncate font-medium'>{data.user.name}</span>
            <span className='text-sm font-normal truncate text-muted-foreground'>
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer flex items-center justify-between'>
          Billing
          <CreditCardIcon className='size-4' />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className='cursor-pointer flex items-center justify-between'
        >
          Logout
          <LogOut className='size-4' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
