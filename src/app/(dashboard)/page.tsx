import { Order } from "@/components/dashboard/data/orders";
import { columns } from "@/components/dashboard/components/columns";
import { data } from "@/components/dashboard/data/sales";
import SalesData from "@/components/dashboard/sales-chart";
import SummaryData from "@/components/dashboard/summary-data";
import { DataTable } from "@/components/ui/data-table";
import { orders } from "@/components/dashboard/data/orders";


const DashboardPage = () => {
  return (

      <div className="flex flex-col space-y-7 py-6 w-full">
        <SummaryData />
        <SalesData/>
        <DataTable columns={columns} data={orders}/>
      </div>
  );
};

export default DashboardPage;
