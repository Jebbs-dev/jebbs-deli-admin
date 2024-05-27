import RecentOrders from "@/modules/dashboard/components/recent-orders";
import SalesData from "@/modules/dashboard/components/sales-chart";
import SummaryData from "@/modules/dashboard/components/summary-data";

import TopProducts from "@/modules/dashboard/components/top-products";

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
