import SideNav from "@/components/side-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
 
const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
  return ( 
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-[#f7f8fa]">
      <div className="w-full flex-none md:w-48">
        <SideNav/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
 
export default DashboardLayout;