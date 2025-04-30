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
          <Link href={`/product-store/${data.id}`}>View Store</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button>Delete Store</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductStoreTableActions;
