import { Product } from "./products";

export type StoreCreate = {
  name: string;
  email: string;
  address: string;
};

export type Store = StoreCreate & {
  id: string;
  createdAt: string;
  telephone: string;

  logo: string;
  isActive: boolean;
  updatedAt?: string;
  billboard?: string;
  openingTime?: string;
  closingTime?: string;
  rating?: number;
  preparationTime?: string;
  totalReviews?: number;
  tags?: string[];
  products: Product[];
};
