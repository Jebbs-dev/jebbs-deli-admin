import { Product } from "./products";

export type StoreCreate = {
  name: string;
  email: string;
  address: string;
};

export type StorePayoutStatus = "pending" | "verified" | "disabled";

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
  commissionPercent?: number | string;
  bagFeeEnabled?: boolean;
  bagFeeAmount?: number | string;
  bagCommissionable?: boolean;
  surgeEnabled?: boolean;
  surgeType?: "flat" | "percent" | string;
  surgeValue?: number | string;
  bankCode?: string | null;
  bankName?: string | null;
  accountNumber?: string | null;
  accountName?: string | null;
  paystackSubaccountCode?: string | null;
  paystackSubaccountStatus?: StorePayoutStatus;
};
