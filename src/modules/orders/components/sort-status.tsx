import { Order } from "@/types/products";

interface SortOrdersStatusProps {
  data: Order;
}

function capitalizeWords(str: string): string {
  return str
    .toLowerCase() // Convert the entire string to lowercase
    .split(/[\s,_-]/) // Split the string into words using spaces, commas, underscores, and hyphens as delimiters
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the capitalized words back into a string with spaces
}

const SortOrdersStatus = ({ data }: SortOrdersStatusProps) => {
  return (
    <div
      className={`
      px-3 py-1 flex flex-row shrink-0 space-x-3 items-center rounded-sm 
      ${
        data.status === "pending"
          ? "bg-yellow-100 text-yellow-700 text-opacity-90"
          : ""
      }
      ${
        data.status === "delivered"
          ? "bg-blue-100 text-blue-700 text-opacity-90"
          : ""
      }
      ${
        data.status === "cancelled"
          ? "bg-red-200 text-red-700 text-opacity-90"
          : ""
      }
    `}
    >
      <div>{capitalizeWords(data.status)}</div>
    </div>
  );
};

export default SortOrdersStatus;
