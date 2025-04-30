import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { ProductParams } from "./fetch-filtered-products-by-storeid";

export const useFetchFilteredProducts = (params: ProductParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await api.get("/products", { params });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
