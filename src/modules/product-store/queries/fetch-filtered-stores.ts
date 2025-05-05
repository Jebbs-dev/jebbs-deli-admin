import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { UserParams } from "@/modules/customers/queries/fetch-filtered-customers";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

export type StoreParams = {
  search?: string;
  limit: number;
  offset: number;
  sortBy?: string;
  sortOrder?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | boolean | undefined;
};

export const useFetchFilteredStores = (params: StoreParams) => {
  const { isLoggedIn } = useAuthStore();

  const userType = useUserRole();

  return useQuery({
    queryKey: ["store", params],
    queryFn:
      isLoggedIn && userType === "IS_ADMIN"
        ? async () => {
            const response = await api.get("/store", { params });
            return response.data;
          }
        : skipToken,
    placeholderData: keepPreviousData,
  });
};
