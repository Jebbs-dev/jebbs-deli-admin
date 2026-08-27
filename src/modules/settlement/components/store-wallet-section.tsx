import { FaSpinner } from "react-icons/fa";
import { useFetchStoreWallet } from "../queries/settlement-hooks";

function formatMoney(value: number | string | undefined) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(value ?? 0));
}

const StoreWalletSection = ({ storeId }: { storeId: string }) => {
  const { data, isLoading, isError } = useFetchStoreWallet(storeId);

  return (
    <div className="space-y-3 rounded-md border p-4">
      <div>
        <h3 className="font-semibold text-primary">Store wallet</h3>
        <p className="text-sm text-muted-foreground">
          Settlement balance for this store.
        </p>
      </div>

      {isLoading ? (
        <FaSpinner className="animate-spin text-orange-600" />
      ) : isError ? (
        <p className="text-sm text-muted-foreground">Could not load wallet.</p>
      ) : (
        <>
          <p className="text-2xl font-semibold">
            {formatMoney(data?.balance)}
          </p>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Recent activity
            </p>
            {(data?.transactions ?? []).slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between gap-2 text-sm border-b border-border/60 pb-2 last:border-0"
              >
                <div>
                  <p className="capitalize">{tx.type.replace(/_/g, " ")}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(tx.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="font-medium">{formatMoney(tx.amount)}</p>
              </div>
            ))}
            {!data?.transactions?.length && (
              <p className="text-sm text-muted-foreground">No transactions yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StoreWalletSection;
