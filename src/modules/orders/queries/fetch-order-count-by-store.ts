import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

export const useFetchStoreOrdersCount = (storeId: string) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get(`/orders/store/${storeId}/count`);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
