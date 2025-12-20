import DashboardSideBar from "@/components/DashboardSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSideBar />
      <main className="flex flex-col h-screen w-screen bg-muted ">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
