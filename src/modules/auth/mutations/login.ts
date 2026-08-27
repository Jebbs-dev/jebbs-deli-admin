import { User } from "@/types/user";
import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import useAuthStore from "@/state-store/auth";
import { useToast } from "@/hooks/use-toast";

type LoginCredentials = Omit<User, "id" | "name" | "role">;
type LoginRole = "ADMIN" | "VENDOR" | "RIDER";

const loginEndpoints: Record<LoginRole, string> = {
  ADMIN: "/auth/admin/login",
  VENDOR: "/auth/vendor/login",
  RIDER: "/auth/rider/login",
};

/** Tries admin → vendor → rider until one succeeds (role detection). */
export const useLoginWithRoleDetection = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const roles: LoginRole[] = ["ADMIN", "VENDOR", "RIDER"];
      let lastError: unknown;

      for (const role of roles) {
        try {
          const response = await api.post(loginEndpoints[role], credentials);
          return response.data;
        } catch (error) {
          lastError = error;
        }
      }

      throw lastError ?? new Error("Invalid credentials");
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
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Invalid credentials",
      });
    },
  });
};
