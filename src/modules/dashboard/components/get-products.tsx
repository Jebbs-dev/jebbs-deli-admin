import { Order } from "../data/recent-orders";
import Image from "next/image";

interface GetProductsProps {
  data: Order;
}

const GetProducts: React.FC<GetProductsProps> = ({ data }) => {
  return (
    <div className="flex flex-row space-x-3 items-center">
      <span className="h-3 w-3 shrink-0">
        <Image src={data.productImage} alt="product image" width={20} height={20}/>
      </span>
      <div>{data.product}</div>
    </div>
  );
};

export default GetProducts;
