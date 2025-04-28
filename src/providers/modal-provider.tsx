"use client";

import StoreModal from "@/modules/vendor-store/components/modals/store-modal";
import useAuthStore from "@/state-store/auth";
import { getUserRole } from "@/utils/get-user-role";
import { useEffect, useState } from "react";
import useUserRole from "@/hooks/useUserRole";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  const userType = useUserRole();

  useEffect(() => {
    if (userType === "IS_VENDOR") setIsMounted(true);
  }, [userType]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
