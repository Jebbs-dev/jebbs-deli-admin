import { Admin } from "@/types/user";
import api from "@/utils/api";

import { useMutation } from "@tanstack/react-query";

export const useLoginVendor = () => {
  return useMutation({
    mutationFn: async (
      vendor: Omit<Admin, "id" | "name" | "role" | "store">
    ) => {
      const response = await api.post("/auth/vendor/login", vendor);
      return response.data;
    },
  });
};
