import { User } from "@/types/user";
import api from "@/utils/api";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAuthStore from "@/state-store/auth";
import { useToast } from "@/hooks/use-toast";

export const useCreateAdmin = () => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationFn: async (user: Omit<User, "id" | "role" | "store">) => {
      const response = await api.post("/admin/register", user);
      return response.data;
    },
    onSuccess: (data) => {
      setTimeout(() => {
        router.refresh();
      }, 300);
      if (data) {
        // toast({
        //   title: "Success",
        //   description: "Successfully Created Vendor Account!",
        // });
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: error.message,
      // });
    },
  });
};
