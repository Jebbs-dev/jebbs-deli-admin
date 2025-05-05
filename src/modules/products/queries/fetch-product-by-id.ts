import useUserRole from "@/hooks/useUserRole";
import useAuthStore from "@/state-store/auth";
import api from "@/utils/api";
import { skipToken, useQuery } from "@tanstack/react-query";

export const useFetchProductById = (productId: string, storeId: string) => {
  const { isLoggedIn } = useAuthStore();

  return useQuery({
    queryKey: ["products", productId],
    queryFn: isLoggedIn
      ? async () => {
          const response = await api.get(
            `/products/${productId}/store/${storeId}`
          );
          return response.data;
        }
      : skipToken,
  });
};
