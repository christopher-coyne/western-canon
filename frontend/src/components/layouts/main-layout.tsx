import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar";

type MainLayoutProps = {
  children: any;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full border-2 border-red-500 flex flex-between">
        {/* sidebar */}
        <AppSidebar />
        <div className="px-4 w-full">
          {children}
        </div>

      </div>
    </SidebarProvider>
  )
}