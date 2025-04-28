import { Store } from "./store";

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