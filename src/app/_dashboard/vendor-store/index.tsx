import { Button } from "@/components/ui/button";
import { Image } from "@unpic/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import useAuthStore from "@/state-store/auth";
import { useFetchStore } from "@/modules/vendor-store/queries/fetch-vendor-store";

export const Route = createFileRoute("/_dashboard/vendor-store/")({
  component: VendorStore,
});

function VendorStore() {
  const { user } = useAuthStore();
  const vendorStore = user?.store;

  const { data: vendorStoreData, isLoading } = useFetchStore(
    String(vendorStore?.id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-3 my-10 px-3 md:mx-0 md:px-10 py-6 border rounded-md bg-white dark:bg-background overflow-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold mb-3">
          Store Information
        </h1>
        <div className="flex flex-col"></div>
      </div>

      <Button asChild>
        <Link
          to="/vendor-store/$storeId"
          params={{ storeId: String(vendorStore?.id) }}
        >
          Edit Store Information
        </Link>
      </Button>

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
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.name || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Email Address</p>
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.email || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.address || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Joining Date</p>
              <p className="text-black dark:text-gray-300">
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
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.telephone || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Opening Time</p>
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.openingTime || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Closing Time</p>
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.closingTime || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Preparation Time</p>
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.preparationTime || (
                  <span className="text-gray-500">No infomation added</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Tags</p>
              {vendorStoreData?.tags && vendorStoreData.tags.length > 0 ? (
                <p className="text-black dark:text-gray-300">
                  {vendorStoreData.tags.join(", ")}
                </p>
              ) : (
                <p className="text-gray-500">No information added</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
