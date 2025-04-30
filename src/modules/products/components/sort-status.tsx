import { Product } from "@/types/products";

interface SortProductStatus {
  data: Product;
}

const SortProductStatus: React.FC<SortProductStatus> = ({ data }) => {
  return (
    <div>
      <div
        className={`
      px-3 py-1 flex flex-row shrink-0 space-x-3 items-center rounded-sm
      ${
        data.isAvailable
          ? "bg-green-200 text-green-700 text-opacity-90"
          : data.stock === 0
          ? "bg-red-200 text-red-700 text-opacity-90"
          : ""
      }
      
    `}
      >
        <p>{data.isAvailable ? "Available" : "Out of Stock"}</p>
      </div>
    </div>
  );
};

export default SortProductStatus;
