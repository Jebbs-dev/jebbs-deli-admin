import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/types/products";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ProductTableInterface {
  data: Product;
}

const ProductTableActions = ({ data }: ProductTableInterface) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none  focus:ring-0 hover:bg-none">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={`/products/${data.id}`}>Edit Product</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/products/${data.id}`}>Delete Product</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductTableActions;
