import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchVendor = (vendorId: string) => {
  return useQuery({
    queryKey: ["vendor"],
    queryFn: async () => {
      const response = await api.get(`/vendor/${vendorId}`);
      return response.data;
    },
  });
};
