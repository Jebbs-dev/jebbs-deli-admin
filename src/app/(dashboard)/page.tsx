interface DashboardPageProps {
  
}
 
const DashboardPage: React.FC<DashboardPageProps> = () => {
  return ( 
    <div>
      <h3 className="font-semibold text-2xl">Hi, Admin User</h3>
      <p className="text-sm text-muted-foreground">Welcome back to your Dashboard</p>
    </div>
   );
}
 
export default DashboardPage;