import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "@/types/products";
import { MoreHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useDeleteOrder } from "../mutations/delete-order";
import { useToast } from "@/hooks/use-toast";
import useUserRole from "@/hooks/useUserRole";

interface OrderTableInterface {
  data: Order;
}

const OrderTableActions = ({ data }: OrderTableInterface) => {
  const { mutateAsync: deleteOrder, isPending } = useDeleteOrder();
  const { toast } = useToast();
  const userType = useUserRole();

  const handleDelete = async () => {
    if (!window.confirm("Delete this order? This cannot be undone.")) return;
    try {
      await deleteOrder(String(data.id));
      toast({
        title: "Success",
        description: "Order deleted successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "Failed to delete order",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-0 hover:bg-none">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to="/orders/$orderId" params={{ orderId: String(data.id) }}>
            View order details
          </Link>
        </DropdownMenuItem>
        {userType === "IS_ADMIN" && (
          <DropdownMenuItem
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              void handleDelete();
            }}
            className="text-red-600 focus:text-red-600"
          >
            Delete order
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderTableActions;
