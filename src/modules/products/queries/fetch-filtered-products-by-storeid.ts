import useUserRole from "@/hooks/useUserRole";
import useAuthStore from "@/state-store/auth";
import api from "@/utils/api";
import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";

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
  const { isLoggedIn } = useAuthStore();

  const userType = useUserRole();

  return useQuery({
    queryKey: ["products", storeId, params],
    queryFn:
      isLoggedIn && userType === "IS_VENDOR"
        ? async () => {
            const response = await api.get(`/products/store/${storeId}`, {
              params,
            });
            return response.data;
          }
        : skipToken,
    placeholderData: keepPreviousData,
  });
};
