import DashboardMenu from "@/modules/dashboard/components/dashboard-menu";
import SideNav from "@/components/side-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen flex-row bg-primary/5">
      <div className="relative flex-none w-12 md:w-52 lg:w-64">
        {/* <div className="p-6 md:hidden">
          <DashboardMenu />
        </div> */}
        <SideNav />
      </div>
      <div className="flex-1 overflow-y-auto pt-7 md:p-10 lg:p-12">
        <div className="mb-3">
          <DashboardMenu />
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
