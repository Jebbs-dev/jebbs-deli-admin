import { skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";
import { FaSpinner } from "react-icons/fa";

type StorePayment = {
  id: string;
  amount: number | string;
  status: string;
  paymentMethod?: string | null;
  reference: string;
  createdAt: string;
};

function formatMoney(value: number | string | undefined) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(value ?? 0));
}

export function useFetchStorePayments(storeId?: string) {
  const { isLoggedIn } = useAuthStore();
  const userType = useUserRole();

  return useQuery({
    queryKey: ["store-payments", storeId],
    queryFn:
      isLoggedIn &&
      storeId &&
      (userType === "IS_ADMIN" || userType === "IS_VENDOR")
        ? async (): Promise<StorePayment[]> => {
            const response = await api.get(`/payment/store/${storeId}`, {
              params: { page: 1, limit: 20 },
            });
            const data = response.data;
            if (Array.isArray(data)) return data;
            if (Array.isArray(data?.data)) return data.data;
            if (Array.isArray(data?.items)) return data.items;
            return [];
          }
        : skipToken,
  });
}

const StorePaymentHistory = ({ storeId }: { storeId: string }) => {
  const { data, isLoading, isError } = useFetchStorePayments(storeId);

  return (
    <div className="space-y-3 rounded-md border p-4">
      <div>
        <h3 className="font-semibold text-primary">Payment history</h3>
        <p className="text-sm text-muted-foreground">
          Customer payments received for this store.
        </p>
      </div>

      {isLoading ? (
        <FaSpinner className="animate-spin text-orange-600" />
      ) : isError ? (
        <p className="text-sm text-muted-foreground">Could not load payments.</p>
      ) : (
        <div className="space-y-2">
          {(data ?? []).slice(0, 10).map((payment) => (
            <div
              key={payment.id}
              className="flex justify-between gap-2 text-sm border-b border-border/60 pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">{formatMoney(payment.amount)}</p>
                <p className="text-xs text-muted-foreground">
                  {payment.paymentMethod ?? "paystack"} · {payment.status}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(payment.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="text-xs text-muted-foreground truncate max-w-[8rem]">
                {payment.reference}
              </p>
            </div>
          ))}
          {!data?.length && (
            <p className="text-sm text-muted-foreground">No payments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StorePaymentHistory;
