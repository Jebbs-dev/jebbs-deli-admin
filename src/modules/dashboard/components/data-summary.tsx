import {
  AnalyticsRange,
  useFetchAnalyticsSummary,
} from "@/modules/analytics/queries/fetch-analytics-summary";
import { useFetchCustomerCount } from "@/modules/customers/queries/fetch-customer-count";
import { useFetchProductsCountByStore } from "@/modules/products/queries/fetch-products-count";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";
import { useState } from "react";

function ChangePct({ value }: { value?: number }) {
  const pct = value ?? 0;
  const positive = pct >= 0;
  return (
    <div className="flex space-x-1 items-center border dark:border-0 px-1 bg-opacity-20 rounded-sm">
      <p
        className={`text-[8px] font-light ${
          positive ? "text-green-500" : "text-red-500"
        }`}
      >
        <span>{positive ? "+" : ""}</span>
        {pct}%
      </p>
    </div>
  );
}

const SummaryData = () => {
  const { user } = useAuthStore();
  const userType = useUserRole();
  const [range] = useState<AnalyticsRange>("1w");

  const { data: analytics } = useFetchAnalyticsSummary(range);
  const { data: customersCount } = useFetchCustomerCount();
  const { data: vendorProductsCount } = useFetchProductsCountByStore(
    String(user?.store?.id)
  );

  if (userType === "IS_RIDER") {
    return null;
  }

  const summary = analytics?.summary;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-2 mx-3 md:mx-0 lg:grid-cols-4 md:gap-4 md:w-full">
        <div className="flex md:w-full flex-col space-y-2 bg-white dark:bg-background border p-3 rounded-md">
          <div className="flex flex-row space-x-4 justify-between items-center">
            <p className="text-xs font-normal text-muted-foreground">
              Total income
            </p>
            <ChangePct value={summary?.revenueChangePct} />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">
              ₦{Number(summary?.revenue ?? 0).toLocaleString()}
            </p>
            <img src="/chart1.png" alt="chartline" className="w-12 h-3" />
          </div>
        </div>

        <div className="flex md:w-full flex-col space-y-2 bg-white dark:bg-background border p-3 rounded-md">
          <div className="flex flex-row space-x-4 justify-between items-center">
            <p className="text-xs font-normal text-muted-foreground">
              Total sales
            </p>
            <ChangePct value={summary?.orderCountChangePct} />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">
              {summary?.deliveredCount ?? 0}
            </p>
            <img src="/chart1.png" alt="chartline" className="w-12 h-3" />
          </div>
        </div>

        <div className="flex md:w-full flex-col space-y-2 bg-white dark:bg-background border p-3 rounded-md">
          <div className="flex flex-row space-x-4 justify-between items-center">
            <p className="text-xs font-normal text-muted-foreground">
              Total{" "}
              <span>
                {userType === "IS_ADMIN" ? "customers" : "products"}
              </span>
            </p>
            <ChangePct value={0} />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">
              {userType === "IS_ADMIN"
                ? customersCount?.totalCustomers ?? 0
                : userType === "IS_VENDOR"
                  ? vendorProductsCount?.totalProducts ?? 0
                  : 0}
            </p>
            <img src="/chart3.png" alt="chartline" className="w-12 h-3" />
          </div>
        </div>

        <div className="flex md:w-full flex-col space-y-2 bg-white dark:bg-background border p-3 rounded-md">
          <div className="flex flex-row space-x-4 justify-between items-center">
            <p className="text-xs font-normal text-muted-foreground">
              Total orders
            </p>
            <ChangePct value={summary?.orderCountChangePct} />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">{summary?.orderCount ?? 0}</p>
            <img src="/chart4.png" alt="chartline" className="w-12 h-3" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryData;
