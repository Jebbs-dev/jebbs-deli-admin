import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

export const useFetchProductsCountByStore = (storeId: string) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get(`/products/store/${storeId}/count`);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
