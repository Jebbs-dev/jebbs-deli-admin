import useUserRole from "@/hooks/useUserRole";
import useAuthStore from "@/state-store/auth";
import api from "@/utils/api";
import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";

export type ProductParams = {
  q?: string;
  search?: string;
  limit: number;
  offset: number;
  sort?: string;
  sortBy?: string;
  sortOrder?: string;
  createdFrom?: string;
  createdTo?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  available?: boolean;
  featured?: boolean;
};

function toProductListParams(params?: ProductParams) {
  if (!params) return undefined;
  return {
    limit: params.limit,
    offset: params.offset,
    q: params.q ?? params.search,
    sort:
      params.sort ??
      (params.sortBy ? `${params.sortBy}:${params.sortOrder ?? "desc"}` : undefined),
    createdFrom: params.createdFrom ?? params.startDate,
    createdTo: params.createdTo ?? params.endDate,
    category: params.category,
    available: params.available,
    featured: params.featured,
  };
}

export const useFetchFilteredProductByStoreId = (
  storeId: string,
  params?: ProductParams
) => {
  const { isLoggedIn } = useAuthStore();

  const userType = useUserRole();
  const queryParams = toProductListParams(params);

  return useQuery({
    queryKey: ["products", storeId, queryParams],
    queryFn:
      isLoggedIn && userType === "IS_VENDOR"
        ? async () => {
            const response = await api.get(
              `/v1/stores/${storeId}/products`,
              { params: queryParams }
            );
            return response.data;
          }
        : skipToken,
    placeholderData: keepPreviousData,
  });
};
