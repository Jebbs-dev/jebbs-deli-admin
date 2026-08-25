import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "@/types/products";
import { MoreHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
          <Link
            to="/products/$productId"
            params={{ productId: String(data.id) }}
          >
            View order details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/products/$productId"
            params={{ productId: String(data.id) }}
          >
            Delete order
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderTableActions;
