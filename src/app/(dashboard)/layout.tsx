import DashboardMenu from "@/components/dashboard/dashboard-menu";
import SideNav from "@/components/side-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-[#f7f8fa]">
      <div className="flex-none w-full md:w-48">
        <div className="flex-grow p-6 md:hidden">
          <DashboardMenu />
        </div>
        <SideNav />
      </div>
      <div className="flex-grow md:w-full md:overflow-y-auto md:p-12">
        <div className="hidden md:block md:mb-3">
          <DashboardMenu />
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
