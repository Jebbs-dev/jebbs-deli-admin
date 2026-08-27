import { Image } from "@unpic/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import { useFetchStore } from "@/modules/vendor-store/queries/fetch-vendor-store";
import StorePayoutSection from "@/modules/vendor-store/components/store-payout-section";
import StoreWalletSection from "@/modules/settlement/components/store-wallet-section";
import StorePaymentHistory from "@/modules/settlement/components/store-payment-history";
import { requireRoles } from "@/utils/require-roles";

export const Route = createFileRoute("/_dashboard/product-store/$storeId")({
  beforeLoad: requireRoles(["IS_ADMIN"]),
  component: StoreInformationPage,
});

function StoreInformationPage() {
  const { storeId } = Route.useParams();
  const router = useRouter();

  const { data: vendorStoreData, isLoading } = useFetchStore(String(storeId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-3 my-10 px-3 md:mx-0 md:px-10 py-6 border rounded-md bg-white dark:bg-primary/30  overflow-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-semibold">Store Information</h1>
        <p
          className="flex flex-row text-sm justify-center items-center cursor-pointer"
          onClick={() => {
            router.history.back();
          }}
        >
          <ArrowLeft size={18} />
          <span className="ml-2">Back</span>
        </p>
      </div>

      <section>
        <div className="my-5 flex flex-col gap-2">
          <h3 className="md:text-lg font-semibold">Billboard</h3>
          <div className="w-full h-48 rounded-lg">
            {vendorStoreData?.billboard ? (
              <Image
                src={vendorStoreData?.billboard}
                alt="billboard"
                width={500}
                height={250}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="bg-gray-400 flex justify-center items-center h-full rounded-lg">
                <p className="text-xl text-gray-600">No Image</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between text-sm md:text-base">
          <div className="flex flex-col gap-4 w-1/2">
            <div>
              <p className="font-semibold">Name</p>
              <p className="text-black">
                {vendorStoreData?.name || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Email Address</p>
              <p className="text-black">
                {vendorStoreData?.email || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-black">
                {vendorStoreData?.address || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Joining Date</p>
              <p className="text-black">
                {dayjs(vendorStoreData?.createdAt).format("MMMM D, YYYY") || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Logo</p>
              <span>
                {vendorStoreData?.logo ? (
                  <Image
                    src={vendorStoreData?.logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="rounded-full h-10 w-10"
                  />
                ) : (
                  <span className=" h-10 w-10 rounded-full flex justify-center items-center bg-gray-300">
                    <Image
                      src="/image-placeholder.png"
                      alt="placeholder"
                      width={40}
                      height={40}
                      className="h-7 w-7 opacity-60"
                    />
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <div>
              <p className="font-semibold">Telephone</p>
              <p className="text-black">
                {vendorStoreData?.telephone || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Opening Time</p>
              <p className="text-black">
                {vendorStoreData?.openingTime || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Closing Time</p>
              <p className="text-black">
                {vendorStoreData?.closingTime || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Preparation Time</p>
              <p className="text-black">
                {vendorStoreData?.preparationTime || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Tags</p>
              {vendorStoreData?.tags && vendorStoreData.tags.length > 0 ? (
                <p className="text-black">{vendorStoreData.tags.join(", ")}</p>
              ) : (
                <p className="text-gray-500">No information added</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {vendorStoreData?.id && (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <StoreWalletSection storeId={String(vendorStoreData.id)} />
            <StorePaymentHistory storeId={String(vendorStoreData.id)} />
          </div>
          <StorePayoutSection store={vendorStoreData} />
        </div>
      )}
    </div>
  );
}
