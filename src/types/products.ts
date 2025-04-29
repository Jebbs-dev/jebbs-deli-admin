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
}

export type Order = {
  id: string;
  userId: string;
  storeId: string;
  serviceFee: number;
  deliveryFee: number;
  subTotal: number;
  totalPrice: number;
  vendorAddress: string;
  customerAddress: string;
  status: string;
  createdAt: string;
  user?: User;
  store?: Store;
};
