import api from "@/utils/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export type ProductParams = {
  search?: string;
  limit: number;
  offset: number;
  sortBy?: string;
  sortOrder?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | boolean | undefined;
};

export const useFetchFilteredProductByStoreId = (
  storeId: string,
  params?: ProductParams
) => {
  return useQuery({
    queryKey: ["products", storeId, params],
    queryFn: async () => {
      const response = await api.get(`/products/store/${storeId}`, { params });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
