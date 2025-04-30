import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { UserParams } from "@/modules/customers/queries/fetch-filtered-customers";

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
  return useQuery({
    queryKey: ["store", params],
    queryFn: async () => {
      const response = await api.get("/store", { params });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
