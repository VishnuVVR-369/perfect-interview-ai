import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/modules/dashboard/ui/components/dashboard-sidebar';

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <main className='flex flex-col h-screen w-screen bg-muted'>
        <DashboardSidebar />
        {children}
      </main>
    </SidebarProvider>
  );
}
