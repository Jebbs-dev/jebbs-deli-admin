import { DataTable } from "@/components/ui/data-table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { orders } from "@/components/dashboard/data/recent-orders";
import { columns as recentOrderColumns } from "@/components/dashboard/components/columns/recent-orders";


const RecentOrders = () => {
  return (
    <div className="mx-3 px-3 md:px-10 py-4 border rounded-md bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Recent Orders</h1>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Today</SelectItem>
              <SelectItem value="dark">This week</SelectItem>
              <SelectItem value="system">This month</SelectItem>
              <SelectItem value="system">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DataTable
          columns={recentOrderColumns}
          data={orders}
          showInput
          showPagination
        />
      </div>
  )
}

export default RecentOrders