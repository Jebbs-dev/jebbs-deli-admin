import { columns as topProductColumns } from "@/modules/dashboard/components/columns/top-products";
import { DataTable } from "@/components/ui/data-table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { topProducts } from "@/modules/dashboard/data/top-products";
import Link from "next/link";
import { ChevronRight } from "lucide-react";


const TopProducts = () => {
  return (
    <div className=" px-3 md:px-10 py-2 border rounded-md bg-white dark:bg-background">
      <div className="flex mb-2 justify-between items-center">
        <h1 className="text-xl font-semibold">Top Products</h1>
        <Link href="/" className="flex flow-row items-center gap-x-2 text-green-600">
          <p className="text-sm">View more</p>
          <ChevronRight size={20}/>
        </Link>
      </div>
      <DataTable columns={topProductColumns} data={topProducts} columnFilterKey="product" />
    </div>
  );
};

export default TopProducts;
