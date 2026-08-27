import { skipToken, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";

export type SettlementLedgerTx = {
  id: string;
  type: string;
  amount: number | string;
  balanceAfter: number | string;
  status: string;
  description?: string | null;
  createdAt: string;
};

export type SettlementWallet = {
  id: string;
  balance: number | string;
  currency: string;
  transactions?: SettlementLedgerTx[];
};

export const useFetchStoreWallet = (storeId?: string) => {
  const { isLoggedIn } = useAuthStore();
  const userType = useUserRole();

  return useQuery({
    queryKey: ["store-wallet", storeId],
    queryFn:
      isLoggedIn &&
      storeId &&
      (userType === "IS_ADMIN" || userType === "IS_VENDOR")
        ? async (): Promise<SettlementWallet> => {
            const response = await api.get(`/store/${storeId}/wallet`);
            return response.data;
          }
        : skipToken,
  });
};

export const useFetchRiderWallet = () => {
  const { isLoggedIn } = useAuthStore();
  const userType = useUserRole();

  return useQuery({
    queryKey: ["rider-wallet"],
    queryFn:
      isLoggedIn && (userType === "IS_RIDER" || userType === "IS_ADMIN")
        ? async (): Promise<SettlementWallet> => {
            const response = await api.get("/riders/me/wallet");
            return response.data;
          }
        : skipToken,
  });
};

export const useRunPayouts = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (party: "VENDOR" | "RIDER") => {
      const response = await api.post("/payouts/run", { party });
      return response.data;
    },
    onSuccess: (_data, party) => {
      void queryClient.invalidateQueries({ queryKey: ["store-wallet"] });
      void queryClient.invalidateQueries({ queryKey: ["rider-wallet"] });
      toast({
        title: "Payout started",
        description: `${party === "VENDOR" ? "Vendor" : "Rider"} payout run triggered.`,
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Payout failed",
        description: error.message || "Could not run payouts",
      });
    },
  });
};
