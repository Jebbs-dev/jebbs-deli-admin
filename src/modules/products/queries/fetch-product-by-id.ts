import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchProductById = (productId: string, storeId: string) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      const response = await api.get(`/products/${productId}/store/${storeId}`);
      return response.data;
    },
  });
};
