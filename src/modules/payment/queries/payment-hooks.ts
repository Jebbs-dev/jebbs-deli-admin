import { skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export type Bank = {
  name: string;
  code: string;
  slug?: string;
  country?: string;
  currency?: string;
  type?: string;
};

export const useFetchBanks = () => {
  const { isLoggedIn } = useAuthStore();
  const userType = useUserRole();

  return useQuery({
    queryKey: ["payment", "banks"],
    queryFn:
      isLoggedIn && (userType === "IS_ADMIN" || userType === "IS_VENDOR")
        ? async (): Promise<Bank[]> => {
            const response = await api.get("/payment/banks");
            return response.data;
          }
        : skipToken,
  });
};

export const useResolveAccount = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (payload: {
      bankCode: string;
      accountNumber: string;
    }) => {
      const response = await api.post("/payment/resolve-account", payload);
      return response.data as {
        accountNumber: string;
        accountName: string;
        bankId?: number;
      };
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Could not resolve account",
      });
    },
  });
};

export const useUpsertStorePayout = (storeId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (payload: {
      bankCode: string;
      bankName?: string;
      accountNumber: string;
      commissionPercent?: number;
    }) => {
      const response = await api.patch(
        `/payment/store/${storeId}/payout`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["vendor-store"] });
      void queryClient.invalidateQueries({ queryKey: ["store"] });
      toast({
        title: "Success",
        description: "Payout details saved.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save payout details",
      });
    },
  });
};
