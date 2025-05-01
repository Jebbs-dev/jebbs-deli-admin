"use client";

import { Button } from "@/components/ui/button";
import VendorStoreForm from "@/modules/vendor-store/components/vendor-store-form";
import { useFetchVendorStore } from "@/modules/vendor-store/queries/fetch-vendor-store-by-id";
import useAuthStore from "@/state-store/auth";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { useFetchVendor } from "@/modules/vendor-store/queries/fetch-vendor";
import { useFetchStore } from "@/modules/vendor-store/queries/fetch-vendor-store";

const VendorStore = () => {
  const { vendor } = useAuthStore();

  const vendorStore = vendor?.store;

  const { data: vendorStoreData, isLoading } = useFetchStore(
    String(vendorStore?.id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(vendorStoreData);

  return (
    <div className="mx-3 my-10 px-3 md:mx-0 md:px-10 py-6 border rounded-md bg-white dark:bg-background overflow-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold mb-3">
          Store Information
        </h1>
        <div className="flex flex-col"></div>
      </div>

      <Button asChild>
        <Link href={`/vendor-store/${vendorStore?.id}`} passHref>
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
                  <p className="text-gray-500">No infomation added</p>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Email Address</p>
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.email || (
                  <p className="text-gray-500">No infomation added</p>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.address || (
                  <p className="text-gray-500">No infomation added</p>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Joining Date</p>
              <p className="text-black dark:text-gray-300">
                {dayjs(vendorStoreData?.createdAt).format("MMMM D, YYYY") || (
                  <p className="text-gray-500">No infomation added</p>
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
                  <p className=" h-10 w-10 rounded-full flex justify-center items-center bg-gray-300">
                    <Image
                      src="/image-placeholder.png"
                      alt="placeholder"
                      width={40}
                      height={40}
                      className="h-7 w-7 opacity-60"
                    />
                  </p>
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <div>
              <p className="font-semibold">Telephone</p>
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.telephone || (
                  <p className="text-gray-500">No infomation added</p>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Opening Time</p>
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.openingTime || (
                  <p className="text-gray-500">No infomation added</p>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Closing Time</p>
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.closingTime || (
                  <p className="text-gray-500">No infomation added</p>
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Preparation Time</p>
              <p className="text-black dark:text-gray-300">
                {vendorStoreData?.preparationTime || (
                  <p className="text-gray-500">No infomation added</p>
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
      {/* <VendorStoreForm vendorStoreData={vendorStoreData} /> */}
    </div>
  );
};

export default VendorStore;
