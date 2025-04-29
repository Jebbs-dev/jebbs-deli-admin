"use client";

import VendorStoreForm from "@/modules/vendor-store/components/vendor-store-form";
import { useFetchVendorStore } from "@/modules/vendor-store/queries/fetch-vendor-store-by-id";
import useAuthStore from "@/state-store/auth";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const VendorStoreInfo = () => {
  const { vendor } = useAuthStore();

  const { storeId } = useParams();

  const router = useRouter();

  const { data: vendorStoreData, isLoading } = useFetchVendorStore(
    String(storeId),
    String(vendor?.id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-y-hidden">
      <div className="mx-3 px-3 md:mx-0 md:px-10 py-4 border rounded-md bg-white dark:bg-background overflow-hidden">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-semibold">Store Information</h1>
          <p
            className="flex flex-row text-sm justify-center items-center"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft size={18} />
            <span className="ml-2">Back</span>
          </p>
          {/* <div className="flex flex-col"></div> */}
        </div>
        <div className="overflow-auto text-sm md:text-base">
          <VendorStoreForm vendorStoreData={vendorStoreData} />
        </div>
      </div>
    </div>
  );
};

export default VendorStoreInfo;
