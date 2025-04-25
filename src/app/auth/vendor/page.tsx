"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const VendorAuthPage = () => {


  return (
    <>
      <Button className="w-full" asChild>
        <Link href="/auth">Click here to sign in as an admin</Link>
      </Button>
    </>
  );
};

export default VendorAuthPage;
