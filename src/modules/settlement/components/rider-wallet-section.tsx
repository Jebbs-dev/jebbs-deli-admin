import { FaSpinner } from "react-icons/fa";
import { useFetchRiderWallet } from "../queries/settlement-hooks";

function formatMoney(value: number | string | undefined) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(value ?? 0));
}

const RiderWalletSection = () => {
  const { data, isLoading, isError } = useFetchRiderWallet();

  return (
    <div className="space-y-3 rounded-md border bg-white dark:bg-background p-4">
      <div>
        <h3 className="font-semibold text-primary">Earnings</h3>
        <p className="text-sm text-muted-foreground">
          Your rider wallet balance.
        </p>
      </div>

      {isLoading ? (
        <FaSpinner className="animate-spin text-orange-600" />
      ) : isError ? (
        <p className="text-sm text-muted-foreground">Could not load earnings.</p>
      ) : (
        <>
          <p className="text-2xl font-semibold">
            {formatMoney(data?.balance)}
          </p>
          <div className="space-y-2">
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
              <p className="text-sm text-muted-foreground">No earnings yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RiderWalletSection;
