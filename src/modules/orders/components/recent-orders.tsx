"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { orders } from "@/modules/dashboard/data/recent-orders";
import { columns as recentOrderColumns } from "@/modules/orders/columns/store-orders-columns";
import TableFilters from "@/components/date-filters";
import useAuthStore from "@/state-store/auth";
import { useQueryParamaters } from "@/state-store/use-query-params";
import { useFetchFilteredOrderByStore } from "@/modules/orders/queries/fetch-filtered-orders-by store";
import { useDebounce } from "@/hooks/use-debounce";
import { DataTable } from "../columns/order-datatable";
import { ProductListSkeleton } from "@/modules/products/components/product-list";

import useUserRole from "@/hooks/useUserRole";
import { useFetchFilteredOrders } from "../queries/fetch-filtered-orders";

const RecentOrders = () => {
  const { vendor } = useAuthStore();
  const {
    querykey,
    setQueryKey,
    backendPagination,
    dateFilter,
    setDateFilter,
  } = useQueryParamaters();

  const debouncedQuery = useDebounce(querykey, 1000);

  const { data: ordersByStore, isLoading } = useFetchFilteredOrderByStore(
    String(vendor?.store.id),
    {
      ...backendPagination,
      search: debouncedQuery,
      startDate: dateFilter.startDate,
      endDate: dateFilter.endDate,
    }
  );

  const { data: allOrders, isLoading: isAllOrdersLoading } =
    useFetchFilteredOrders({
      ...backendPagination,
      search: debouncedQuery,
      startDate: dateFilter.startDate,
      endDate: dateFilter.endDate,
    });

  const userType = useUserRole();

  if (isLoading || isAllOrdersLoading) {
    return <ProductListSkeleton />;
  }

  return (
    <div className="mx-3 px-3 md:mx-0 md:px-10 py-4 border rounded-md bg-white dark:bg-background">
      <TableFilters title="Recent Orders" canAddNew={false} />

      {userType === "IS_VENDOR" ? (
        <DataTable
          columns={recentOrderColumns}
          data={ordersByStore?.orders}
          total={ordersByStore?.total}
          limit={ordersByStore?.limit}
          offset={ordersByStore?.offset}
          showInput
          showAdvancedPagination
          placeholder="Search for orders..."
          columnFilterKey="name"
        />
      ) : (
        <DataTable
          columns={recentOrderColumns}
          data={allOrders?.orders}
          total={allOrders?.total}
          limit={allOrders?.limit}
          offset={allOrders?.offset}
          showInput
          showAdvancedPagination
          placeholder="Search for orders..."
          columnFilterKey="name"
        />
      )}
    </div>
  );
};

export default RecentOrders;
