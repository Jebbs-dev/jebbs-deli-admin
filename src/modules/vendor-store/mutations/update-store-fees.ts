import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export type StoreFeePayload = {
  bagFeeEnabled?: boolean;
  bagFeeAmount?: number;
  bagCommissionable?: boolean;
  surgeEnabled?: boolean;
  surgeType?: "flat" | "percent";
  surgeValue?: number;
  commissionPercent?: number;
};

export const useUpdateStoreFees = (storeId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (payload: StoreFeePayload) => {
      const response = await api.patch(`/v1/stores/${storeId}`, payload);
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["vendor-store"] });
      void queryClient.invalidateQueries({ queryKey: ["store"] });
      toast({
        title: "Success",
        description: "Fee settings saved.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save fee settings",
      });
    },
  });
};
