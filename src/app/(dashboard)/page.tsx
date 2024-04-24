import RecentOrders from "@/components/dashboard/recent-orders";
import SalesData from "@/components/dashboard/sales-chart";
import SummaryData from "@/components/dashboard/summary-data";

import TopProducts from "@/components/dashboard/top-products";

const DashboardPage = () => {
  return (
    <div className="flex flex-col space-y-7 py-6 w-full">
      <SummaryData />
      <div className="grid grid-cols-1 gap-2 mx-3 md:mx-0 md:grid-cols-2 md:gap-4">
        <SalesData />
        <TopProducts/>
      </div>
      <RecentOrders/>
      
    </div>
  );
};

export default DashboardPage;
