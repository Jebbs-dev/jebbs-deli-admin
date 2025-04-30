import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { UserParams } from "@/modules/customers/queries/fetch-filtered-customers";

export const useFetchFilteredVendors = (params: UserParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const response = await api.get("/users/admins/vendors", { params });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
