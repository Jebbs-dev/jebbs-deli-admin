import { Order } from "../data/recent-orders";

interface SortOrdersStatusProps {
  data: Order;
}

const SortOrdersStatus: React.FC<SortOrdersStatusProps> = ({ data }) => {
  return (
    <div
      className={`
      px-3 py-1 flex flex-row shrink-0 space-x-3 items-center rounded-sm
      ${
        data.status === "Pending payment"
          ? "bg-yellow-100 text-yellow-700 text-opacity-90"
          : ""
      }
      ${
        data.status === "Payment successful"
          ? "bg-blue-100 text-blue-700 text-opacity-90"
          : ""
      }
      ${
        data.status === "Product delivered"
          ? "bg-green-200 text-green-700 text-opacity-90"
          : ""
      }
    `}
    >
      <div>{data.status}</div>
    </div>
  );
};

export default SortOrdersStatus;
