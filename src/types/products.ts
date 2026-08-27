import { Store } from "./store";
import { User } from "./user";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  size?: string;
  stock?: number;
  storeTag?: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
  store?: Store;
  storeId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "confirmed"
  | "preparing"
  | "ready"
  | "picked_up"
  | "in_transit"
  | "delivered"
  | "cancelled"
  | "failed";

export type FulfillmentType = "delivery" | "pickup";

export type OrderItem = {
  id: string;
  storeId: string;
  orderId: string;
  productId: string;
  productName: string;
  unitPrice: number | string;
  quantity: number;
  product?: Product;
  store?: Store;
};

export type Payment = {
  id: string;
  status: string;
  amount?: number | string;
  reference?: string;
  channel?: string;
  createdAt?: string;
  paystackTransaction?: Record<string, unknown> | null;
};

export type Order = {
  id: string;
  userId: string;
  storeId: string;
  fulfillmentType?: FulfillmentType;
  serviceFee: number;
  deliveryFee: number;
  subTotal: number;
  totalPrice: number;
  vendorCommission?: number | string;
  vendorPayout?: number | string;
  vendorAddress: string;
  customerAddress: string;
  status: OrderStatus | string;
  paidAt?: string | null;
  createdAt: string;
  updatedAt?: string;
  user?: User;
  store?: Store;
  orderItems?: OrderItem[];
  payments?: Payment[];
  statusEvents?: Array<{
    id: string;
    status: string;
    at: string;
    note?: string | null;
  }>;
  assignment?: {
    id: string;
    status: string;
    riderId: string;
    rider?: User & { riderProfile?: { isAvailable: boolean } };
  } | null;
};
