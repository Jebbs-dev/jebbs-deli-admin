"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const VendorAuthPage = () => {


  return (
    <>
      <Button className="w-full bg-green-700 hover:bg-green-800 ring-0 focus-visible:ring-0" asChild>
        <Link href="/auth">Click here to sign in as an admin</Link>
      </Button>
    </>
  );
};

export default VendorAuthPage;
