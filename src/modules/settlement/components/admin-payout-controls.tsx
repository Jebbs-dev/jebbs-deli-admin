import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { useRunPayouts } from "../queries/settlement-hooks";
import useUserRole from "@/hooks/useUserRole";

const AdminPayoutControls = () => {
  const userType = useUserRole();
  const { mutateAsync: runPayout, isPending } = useRunPayouts();

  if (userType !== "IS_ADMIN") return null;

  return (
    <div className="space-y-3 rounded-md border p-4">
      <div>
        <h3 className="font-semibold text-primary">Run payouts</h3>
        <p className="text-sm text-muted-foreground">
          Trigger vendor or rider settlement batches.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          className="bg-orange-600 hover:bg-orange-700"
          disabled={isPending}
          onClick={() => void runPayout("VENDOR")}
        >
          {isPending ? <FaSpinner className="animate-spin" /> : "Run vendor payouts"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => void runPayout("RIDER")}
        >
          {isPending ? <FaSpinner className="animate-spin" /> : "Run rider payouts"}
        </Button>
      </div>
    </div>
  );
};

export default AdminPayoutControls;
