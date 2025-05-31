'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCommand from './dashboard-command';
import { useEffect, useState } from 'react';

export default function DashboardNavbar() {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);
  return (
    <>
      <DashboardCommand open={open} setOpen={setOpen} />
      <nav className='flex px-4 gap-x-2 items-center py-3 border-b bg-background'>
        Navbar
        <Button className='size-9' variant='outline' onClick={toggleSidebar}>
          {state === 'collapsed' || isMobile ? (
            <PanelLeftIcon className='size-4' />
          ) : (
            <PanelLeftCloseIcon className='size-4' />
          )}
        </Button>
        <Button
          className='h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground'
          variant='outline'
          size='sm'
          onClick={() => setOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
            <span className='text-xs'>&#8984;K</span>
          </kbd>
        </Button>
      </nav>
    </>
  );
}
