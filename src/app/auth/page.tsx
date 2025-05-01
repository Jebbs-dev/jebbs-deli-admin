"use client";


import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthPage = () => {

  return (
    <>
      <Button className="w-full bg-green-600" asChild>
        <Link href="/auth/vendor">Click here to sign in as a vendor</Link>
      </Button>
    </>
  );
};

export default AuthPage;
