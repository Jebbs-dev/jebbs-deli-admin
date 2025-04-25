import { User } from "@/types/user";
import api from "@/utils/api";

import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/state-store/auth";
import { useToast } from "@/hooks/use-toast";
import { useStoreModal } from "@/state-store/vendor-store";
import useUserRole from "@/hooks/useUserRole";
import { useEffect } from "react";
import { useFetchVendorStore } from "@/modules/vendor-store/queries/fetch-vendor-store-by-id";

export const useLoginUser = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const { toast } = useToast();


  return useMutation({
    mutationFn: async (user: Omit<User, "id" | "name" | "role">) => {
      const response = await api.post("/auth/admin/login", user);
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        // Store tokens in localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
        // Update auth store with user data

        console.log(data.user);
        login(data.user);
        router.push("/");
        // Move the cart handling logic here
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
