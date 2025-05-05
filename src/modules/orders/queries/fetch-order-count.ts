import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { OrderParams } from "./fetch-filtered-orders-by store";

export const useFetchOrdersCount = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get(`/orders/count`);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
