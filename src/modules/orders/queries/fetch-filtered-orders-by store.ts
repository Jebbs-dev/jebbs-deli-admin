import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

export type OrderParams = {
  search?: string;
  limit: number;
  offset: number;
  sortBy?: string;
  sortOrder?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | boolean | undefined;
};

export const useFetchFilteredOrderByStore = (
  storeId: string,
  params?: OrderParams
) => {
  return useQuery({
    queryKey: ["orders", storeId, params],
    queryFn: async () => {
      const response = await api.get(`/orders/store/${storeId}`, { params });
      return response.data;
    },
    placeholderData: keepPreviousData
  });
};
