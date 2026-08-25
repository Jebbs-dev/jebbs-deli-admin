import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Store } from "@/types/store";

interface ProductStoreTableProps {
  data: Store;
}

const ProductStoreTableActions = ({ data }: ProductStoreTableProps) => {
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
            to="/product-store/$storeId"
            params={{ storeId: String(data.id) }}
          >
            View Store
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button>Delete Store</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductStoreTableActions;
