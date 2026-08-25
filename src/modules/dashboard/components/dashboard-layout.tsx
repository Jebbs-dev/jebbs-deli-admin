import { Outlet } from "@tanstack/react-router";
import DashboardMenu from "@/modules/dashboard/components/dashboard-menu";
import SideNav from "@/components/side-nav";

export function DashboardLayout() {
  return (
    <div className="flex w-full min-h-screen flex-row bg-primary/5 dark:bg-background">
      <div className="relative flex-none w-12 md:w-52 lg:w-64">
        <SideNav />
      </div>
      <div className="flex-1 overflow-y-auto pt-7 md:p-10 lg:p-12">
        <div className="mb-3">
          <DashboardMenu />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
