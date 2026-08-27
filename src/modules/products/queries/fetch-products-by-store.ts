import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

export const useFetchProductByStore = (storeId: string) => {
  return useQuery({
    queryKey: ["products", storeId],
    queryFn: async () => {
      const response = await api.get(`/v1/stores/${storeId}/products`);
      return response.data;
    },
  });
};