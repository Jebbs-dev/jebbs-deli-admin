import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { OrderParams } from "./fetch-filtered-orders-by store";

export const useFetchFilteredOrders = (
  params?: OrderParams
) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: async () => {
      const response = await api.get(`/orders`, { params });
      return response.data;
    },
    placeholderData: keepPreviousData
  });
};
