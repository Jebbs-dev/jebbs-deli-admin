import Image from "next/image";
import { Loader } from "lucide-react";
import { useFetchCustomerCount } from "@/modules/customers/queries/fetch-customer-count";
import { useFetchOrdersCount } from "@/modules/orders/queries/fetch-order-count";
import { Order } from "@/types/products";
import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react";
import Chart1 from "@/../../public/chart1.png";
import Chart2 from "@/../../public/chart2.png";
import Chart3 from "@/../../public/chart3.png";
import Chart4 from "@/../../public/chart4.png";
import useUserRole from "@/hooks/useUserRole";
import { useFetchProductsCountByStore } from "@/modules/products/queries/fetch-products-count";
import useAuthStore from "@/state-store/auth";
import { useFetchStoreOrdersCount } from "@/modules/orders/queries/fetch-order-count-by-store";

const SummaryData = () => {
  const { user } = useAuthStore();

  const { data: orders, isLoading: isOrdersLoading } = useFetchOrdersCount();
  const { data: customersCount, isLoading: isCustomersLoading } =
    useFetchCustomerCount();
  const { data: vendorProductsCount, isLoading: isVendorProductsLoading } =
    useFetchProductsCountByStore(String(user?.store?.id));
  const { data: storeOrders, isLoading: isStoreOrderCountLoading } =
    useFetchStoreOrdersCount(String(user?.store?.id));

  const userType = useUserRole();

  // if (
  //   isOrdersLoading ||
  //   isCustomersLoading ||
  //   isVendorProductsLoading ||
  //   isStoreOrderCountLoading
  // ) {
  //   return (
  //     <div className="flex justify-center items-center">
  //       <Loader className="animate-spin" />
  //     </div>
  //   );
  // }

  const totalOrders = orders?.orders;
  const totalVendorOrders = orders?.orders;

  const totalSales = totalOrders?.filter(
    (order: Order) => order.status === "delivered"
  );
  const totalSalesCount = totalSales?.length;

  let totalVendorSum = 0;
  let totalSum = 0;

  const totalVendorAmount = totalVendorOrders?.map(
    (order: Order) => order.subTotal
  );

  totalVendorAmount?.forEach((num: number) => {
    totalVendorSum += num;
  });

  const totalAmountMade = totalOrders?.map((order: Order) => order.totalPrice);

  totalAmountMade?.forEach((num: number) => {
    totalSum += num;
  });

  const totalCount = orders?.totalOrders;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-2 mx-3 md:mx-0 lg:grid-cols-4 md:gap-4 md:w-full">
        <div className="flex md:w-full flex-col space-y-2 bg-white dark:bg-background border p-3 rounded-md">
          <div className="flex flex-row space-x-4 justify-between items-center ]">
            <p className="text-xs font-normal text-muted-foreground">
              Total income
            </p>
            <div
              className={`flex space-x-1 items-center border dark:border-0 px-1  bg-opacity-20 rounded-sm`}
            >
              <p className={`text-[8px] font-light text-green-400`}>
                {" "}
                <span>+</span>
                100%
              </p>
              {/*  */}
            </div>
          </div>
          <div className="flex justify-between items-center">
            {userType === "IS_ADMIN" ? (
              <p className="text-lg font-medium">₦{totalSum || 0}</p>
            ) : (
              <p className="text-lg font-medium">₦{totalVendorSum || 0}</p>
            )}
            <Image src={Chart1} alt="chartline" className="w-12 h-3" />
          </div>
        </div>

        <div className="flex md:w-full flex-col space-y-2 bg-white dark:bg-background border p-3 rounded-md">
          <div className="flex flex-row space-x-4 justify-between items-center ]">
            <p className="text-xs font-normal text-muted-foreground">
              Total sales
            </p>
            <div
              className={`flex space-x-1 items-center border dark:border-0 px-1  bg-opacity-20 rounded-sm`}
            >
              <p className={`text-[8px] font-light text-gray-50`}>
                {" "}
                <span>+</span>
                0%
              </p>
              {/*  */}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">{totalSalesCount || 0}</p>
            <Image src={Chart1} alt="chartline" className="w-12 h-3" />
          </div>
        </div>

        <div className="flex md:w-full flex-col space-y-2 bg-white dark:bg-background border p-3 rounded-md">
          <div className="flex flex-row space-x-4 justify-between items-center ]">
            <p className="text-xs font-normal text-muted-foreground">
              Total{" "}
              <span> {userType === "IS_ADMIN" ? "customers" : "products"}</span>
            </p>

            <div
              className={`flex space-x-1 items-center border dark:border-0 px-1  bg-opacity-20 rounded-sm`}
            >
              <p className={`text-[8px] font-light text-green-400`}>
                {" "}
                <span>+</span>
                100%
              </p>
              {/*  */}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">
              {userType === "IS_ADMIN"
                ? customersCount?.totalCustomers
                : userType === "IS_VENDOR"
                ? vendorProductsCount?.totalProducts
                : 0}
            </p>
            <Image src={Chart3} alt="chartline" className="w-12 h-3" />
          </div>
        </div>

        <div className="flex md:w-full flex-col space-y-2 bg-white dark:bg-background border p-3 rounded-md">
          <div className="flex flex-row space-x-4 justify-between items-center ]">
            <p className="text-xs font-normal text-muted-foreground">
              Total orders
            </p>
            <div
              className={`flex space-x-1 items-center border dark:border-0 px-1  bg-opacity-20 rounded-sm`}
            >
              <p className={`text-[8px] font-light text-green-400`}>
                {" "}
                <span>+</span>
                100%
              </p>
              {/*  */}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">
              {userType === "IS_ADMIN"
                ? totalCount
                : userType === "IS_VENDOR"
                ? storeOrders?.totalOrders
                : 0}
            </p>
            <Image src={Chart4} alt="chartline" className="w-12 h-3" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryData;
