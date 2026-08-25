import { User } from "@/types/user";
import api from "@/utils/api";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import useAuthStore from "@/state-store/auth";
import { useToast } from "@/hooks/use-toast";

export const useLoginUser = () => {
  const navigate = useNavigate();
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
        login(data.user);
        navigate({ to: "/" });
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
