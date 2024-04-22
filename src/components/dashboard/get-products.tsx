import { Order } from "./data/orders";

interface GetProductsProps {
  data: Order;
}

const GetProducts: React.FC<GetProductsProps> = ({ data }) => {
  return (
    <div className="flex flex-row space-x-3">
      <span className="h-3 w-3">
        <img src={data.productImage} alt="product image"/>
      </span>
      <div>{data.product}</div>
    </div>
  );
};

export default GetProducts;
