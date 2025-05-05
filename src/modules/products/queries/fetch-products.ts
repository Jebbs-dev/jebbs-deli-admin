import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { ProductParams } from "./fetch-filtered-products-by-storeid";
import useAuthStore from "@/state-store/auth";

export const useFetchFilteredProducts = (params: ProductParams) => {
  const { isLoggedIn } = useAuthStore();

  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await api.get("/products", { params });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
