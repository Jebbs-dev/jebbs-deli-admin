import { skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

export type AnalyticsRange = "1d" | "1w" | "1m" | "1y";

export type AnalyticsSummary = {
  range: AnalyticsRange;
  storeId: string | null;
  summary: {
    revenue: number;
    orderCount: number;
    deliveredCount: number;
    averageOrderValue: number;
    revenueChangePct: number;
    orderCountChangePct: number;
  };
  series: Array<{ label: string; value: number; count: number }>;
  topProducts: Array<{
    productId: string;
    name: string;
    quantity: number;
    orders: number;
  }>;
};

export const useFetchAnalyticsSummary = (range: AnalyticsRange = "1w") => {
  const { isLoggedIn } = useAuthStore();
  const userType = useUserRole();

  return useQuery({
    queryKey: ["analytics", "summary", range],
    queryFn:
      isLoggedIn && (userType === "IS_ADMIN" || userType === "IS_VENDOR")
        ? async (): Promise<AnalyticsSummary> => {
            const response = await api.get("/analytics/summary", {
              params: { range },
            });
            return response.data;
          }
        : skipToken,
  });
};
