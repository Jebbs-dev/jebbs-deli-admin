"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns as ProductListColumns } from "./columns/product-list-column";
import products from "../data/product-list-data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const ProductList = () => {
  const router = useRouter();

  return (
    <div className="mx-3 px-3 md:mx-0 md:px-10 py-4 border rounded-md bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">All Products</h1>
        <div className="flex flex-row space-x-3">
          <Select>
            <SelectTrigger className="w-[100px] md:w-[180px]">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Today</SelectItem>
              <SelectItem value="dark">This week</SelectItem>
              <SelectItem value="system">This month</SelectItem>
              <SelectItem value="system">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => router.push("/products/new")}>
            <span className="mr-0 md:mr-2">
              <Plus size={20} />
            </span>
            <p className="hidden md:block">Add Product</p>
          </Button>
        </div>
      </div>

      <DataTable
        columns={ProductListColumns}
        data={products}
        showInput
        showAdvancedPagination
        placeholder="Search for products..."
        columnFilterKey="name"
      />
    </div>
  );
};

export default ProductList;
