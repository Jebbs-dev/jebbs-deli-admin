import { Product } from "./data/product-list-data";

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
        data.status === "Out of stock"
          ? "bg-red-200 text-red-700 text-opacity-90"
          : ""
      }
      ${
        data.status === "Available"
          ? "bg-green-200 text-green-700 text-opacity-90"
          : ""
      }
    `}
      >
        <span
          className={`
        rounded-full shrink-0 h-2 w-2
      ${data.status === "Out of stock" ? "bg-red-700" : ""}
      ${data.status === "Available" ? "bg-green-700" : ""}
    `}
        ></span>
        <p>{data.status}</p>
      </div>
    </div>
  );
};

export default SortProductStatus;
