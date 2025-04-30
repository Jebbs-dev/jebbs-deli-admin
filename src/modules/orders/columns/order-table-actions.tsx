import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "@/types/products";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React from "react";

interface OrderTableInterface {
  data: Order;
}

const OrderTableActions = ({ data }: OrderTableInterface) => {
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
          <Link href={`/products/${data.id}`}>View order details</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/products/${data.id}`}>Delete order</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderTableActions;
