import { useEffect, useState } from "react";
import { Store } from "@/types/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useFetchBanks,
  useResolveAccount,
  useUpsertStorePayout,
} from "@/modules/payment/queries/payment-hooks";
import { useUpdateStoreFees } from "@/modules/vendor-store/mutations/update-store-fees";
import useUserRole from "@/hooks/useUserRole";
import { FaSpinner } from "react-icons/fa";

interface StorePayoutSectionProps {
  store: Store;
}

const StorePayoutSection = ({ store }: StorePayoutSectionProps) => {
  const userType = useUserRole();
  const { data: banks = [], isLoading: banksLoading } = useFetchBanks();
  const { mutateAsync: resolveAccount, isPending: isResolving } =
    useResolveAccount();
  const { mutateAsync: savePayout, isPending: isSaving } = useUpsertStorePayout(
    String(store.id)
  );
  const { mutateAsync: saveFees, isPending: isSavingFees } = useUpdateStoreFees(
    String(store.id)
  );

  const [bankCode, setBankCode] = useState(store.bankCode ?? "");
  const [accountNumber, setAccountNumber] = useState(store.accountNumber ?? "");
  const [accountName, setAccountName] = useState(store.accountName ?? "");
  const [commissionPercent, setCommissionPercent] = useState(
    String(store.commissionPercent ?? "0")
  );
  const [bagFeeEnabled, setBagFeeEnabled] = useState(
    Boolean(store.bagFeeEnabled)
  );
  const [bagFeeAmount, setBagFeeAmount] = useState(
    String(store.bagFeeAmount ?? "0")
  );
  const [bagCommissionable, setBagCommissionable] = useState(
    Boolean(store.bagCommissionable)
  );
  const [surgeEnabled, setSurgeEnabled] = useState(Boolean(store.surgeEnabled));
  const [surgeType, setSurgeType] = useState<"flat" | "percent">(
    store.surgeType === "percent" ? "percent" : "flat"
  );
  const [surgeValue, setSurgeValue] = useState(String(store.surgeValue ?? "0"));

  useEffect(() => {
    setBankCode(store.bankCode ?? "");
    setAccountNumber(store.accountNumber ?? "");
    setAccountName(store.accountName ?? "");
    setCommissionPercent(String(store.commissionPercent ?? "0"));
    setBagFeeEnabled(Boolean(store.bagFeeEnabled));
    setBagFeeAmount(String(store.bagFeeAmount ?? "0"));
    setBagCommissionable(Boolean(store.bagCommissionable));
    setSurgeEnabled(Boolean(store.surgeEnabled));
    setSurgeType(store.surgeType === "percent" ? "percent" : "flat");
    setSurgeValue(String(store.surgeValue ?? "0"));
  }, [store]);

  const selectedBank = banks.find((bank) => bank.code === bankCode);

  const handleResolve = async () => {
    if (!bankCode || !accountNumber) return;
    const result = await resolveAccount({ bankCode, accountNumber });
    setAccountName(result.accountName);
    setAccountNumber(result.accountNumber);
  };

  const handleSave = async () => {
    if (!bankCode || !accountNumber) return;
    await savePayout({
      bankCode,
      bankName: selectedBank?.name,
      accountNumber,
      ...(userType === "IS_ADMIN"
        ? { commissionPercent: Number(commissionPercent) }
        : {}),
    });
  };

  const handleSaveFees = async () => {
    await saveFees({
      bagFeeEnabled,
      bagFeeAmount: Number(bagFeeAmount),
      bagCommissionable,
      surgeEnabled,
      surgeType,
      surgeValue: Number(surgeValue),
      ...(userType === "IS_ADMIN"
        ? { commissionPercent: Number(commissionPercent) }
        : {}),
    });
  };

  const status = store.paystackSubaccountStatus ?? "pending";

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-md border p-4">
        <div>
          <h3 className="font-semibold text-primary">Fee configuration</h3>
          <p className="text-sm text-muted-foreground">
            Bag fee, surge, and commission for checkout quotes.
          </p>
        </div>

        {userType === "IS_ADMIN" && (
          <div className="space-y-2">
            <Label>Commission percent</Label>
            <Input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={commissionPercent}
              onChange={(e) => setCommissionPercent(e.target.value)}
            />
          </div>
        )}

        {userType === "IS_VENDOR" && store.commissionPercent != null && (
          <p className="text-sm text-muted-foreground">
            Platform commission: {Number(store.commissionPercent)}%
          </p>
        )}

        <div className="flex items-start space-x-3 rounded-md border p-3">
          <Checkbox
            checked={bagFeeEnabled}
            onCheckedChange={(checked) => setBagFeeEnabled(Boolean(checked))}
            id="bag-fee-enabled"
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="bag-fee-enabled">Bag fee enabled</Label>
            <p className="text-xs text-muted-foreground">
              Charge a bag fee on delivery orders.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Bag fee amount</Label>
          <Input
            type="number"
            min={0}
            step={0.01}
            value={bagFeeAmount}
            onChange={(e) => setBagFeeAmount(e.target.value)}
            disabled={!bagFeeEnabled}
          />
        </div>

        <div className="flex items-start space-x-3 rounded-md border p-3">
          <Checkbox
            checked={bagCommissionable}
            onCheckedChange={(checked) =>
              setBagCommissionable(Boolean(checked))
            }
            id="bag-commissionable"
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="bag-commissionable">Bag fee commissionable</Label>
            <p className="text-xs text-muted-foreground">
              Include bag fee in commission base.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 rounded-md border p-3">
          <Checkbox
            checked={surgeEnabled}
            onCheckedChange={(checked) => setSurgeEnabled(Boolean(checked))}
            id="surge-enabled"
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="surge-enabled">Surge enabled</Label>
            <p className="text-xs text-muted-foreground">
              Apply surge pricing on delivery.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Surge type</Label>
            <Select
              value={surgeType}
              onValueChange={(value) =>
                setSurgeType(value as "flat" | "percent")
              }
              disabled={!surgeEnabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Surge type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="percent">Percent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Surge value</Label>
            <Input
              type="number"
              min={0}
              step={0.01}
              value={surgeValue}
              onChange={(e) => setSurgeValue(e.target.value)}
              disabled={!surgeEnabled}
            />
          </div>
        </div>

        <Button
          type="button"
          className="bg-orange-600 hover:bg-orange-700"
          disabled={isSavingFees}
          onClick={() => void handleSaveFees()}
        >
          {isSavingFees ? (
            <>
              Saving
              <FaSpinner className="ml-2 animate-spin" />
            </>
          ) : (
            "Save fee settings"
          )}
        </Button>
      </div>

      <div className="space-y-4 rounded-md border p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-primary">Payout / Paystack</h3>
            <p className="text-sm text-muted-foreground">
              Bank account used for store settlements.
            </p>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-sm capitalize ${
              status === "verified"
                ? "bg-emerald-100 text-emerald-800"
                : status === "disabled"
                  ? "bg-red-100 text-red-800"
                  : "bg-amber-100 text-amber-800"
            }`}
          >
            {status}
          </span>
        </div>

        {store.paystackSubaccountCode && (
          <p className="text-xs font-mono text-muted-foreground break-all">
            Subaccount: {store.paystackSubaccountCode}
          </p>
        )}

        <div className="space-y-2">
          <Label>Bank</Label>
          <Select
            value={bankCode}
            onValueChange={setBankCode}
            disabled={banksLoading}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={banksLoading ? "Loading banks…" : "Select bank"}
              />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank.code} value={bank.code}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Account number</Label>
          <div className="flex gap-2">
            <Input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="0123456789"
            />
            <Button
              type="button"
              variant="outline"
              disabled={!bankCode || !accountNumber || isResolving}
              onClick={() => void handleResolve()}
            >
              {isResolving ? <FaSpinner className="animate-spin" /> : "Resolve"}
            </Button>
          </div>
        </div>

        {accountName && (
          <div className="space-y-1">
            <Label>Account name</Label>
            <p className="text-sm font-medium">{accountName}</p>
          </div>
        )}

        <Button
          type="button"
          className="bg-orange-600 hover:bg-orange-700"
          disabled={!bankCode || !accountNumber || isSaving}
          onClick={() => void handleSave()}
        >
          {isSaving ? (
            <>
              Saving
              <FaSpinner className="ml-2 animate-spin" />
            </>
          ) : (
            "Save payout details"
          )}
        </Button>
      </div>
    </div>
  );
};

export default StorePayoutSection;
