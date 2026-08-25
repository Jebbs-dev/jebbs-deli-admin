import { User } from "@/types/user";
import api from "@/utils/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const useCreateVendor = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (user: Omit<User, "id" | "role" | "store">) => {
      const response = await api.post("/admin/vendor/register", user);
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        void queryClient.invalidateQueries();
        toast({
          title: "Success",
          description: "Successfully Created Vendor Account!",
        });
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
};
