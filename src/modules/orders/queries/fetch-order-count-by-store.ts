import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

export const useFetchStoreOrdersCount = (storeId: string) => {
  const { isLoggedIn } = useAuthStore();

  const userType = useUserRole();

  return useQuery({
    queryKey: ["orders"],
    queryFn:
      isLoggedIn && userType === "IS_VENDOR"
        ? async () => {
            const response = await api.get(`/orders/store/${storeId}/count`);
            return response.data;
          }
        : skipToken,
    placeholderData: keepPreviousData,
  });
};
