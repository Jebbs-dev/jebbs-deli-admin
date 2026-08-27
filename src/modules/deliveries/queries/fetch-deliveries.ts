import { skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

export const useFetchClaimableDeliveries = () => {
  const { isLoggedIn } = useAuthStore();
  const userType = useUserRole();

  return useQuery({
    queryKey: ["deliveries", "claimable"],
    queryFn:
      isLoggedIn && userType === "IS_RIDER"
        ? async () => {
            const response = await api.get("/deliveries/claimable");
            return response.data;
          }
        : skipToken,
    refetchInterval: 15000,
  });
};

export const useFetchMyDeliveries = (history = false) => {
  const { isLoggedIn } = useAuthStore();
  const userType = useUserRole();

  return useQuery({
    queryKey: ["deliveries", "mine", history],
    queryFn:
      isLoggedIn && userType === "IS_RIDER"
        ? async () => {
            const response = await api.get("/deliveries/mine", {
              params: history ? { history: "true" } : undefined,
            });
            return response.data;
          }
        : skipToken,
    refetchInterval: history ? false : 15000,
  });
};
