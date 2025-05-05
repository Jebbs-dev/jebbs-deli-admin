import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

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
  const { isLoggedIn } = useAuthStore();

  const userType = useUserRole();

  return useQuery({
    queryKey: ["orders", storeId, params],
    queryFn:
      isLoggedIn && userType === "IS_VENDOR"
        ? async () => {
            const response = await api.get(`/orders/store/${storeId}`, {
              params,
            });
            return response.data;
          }
        : skipToken,
    placeholderData: keepPreviousData,
  });
};
