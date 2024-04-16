import SalesData from "@/components/dashboard/sales-data";
import SummaryData from "@/components/dashboard/summary-data";

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = () => {
  return (

      <div className="flex flex-col space-y-5 py-6 w-full">
        <SummaryData />
        <SalesData/>
      </div>
  );
};

export default DashboardPage;
