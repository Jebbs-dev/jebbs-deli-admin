"use client";

import Link from "next/link";
import NavLinks from "./nav-links";
import { Settings } from "lucide-react";
import { LogOut } from "lucide-react";
import useAuthStore from "@/state-store/auth";

const SideNav = () => {
  const { isLoggedIn, logout } = useAuthStore();

  return (
    <>
      <div className="flex flex-col fixed h-[100vh] bg-white dark:bg-background text-muted-foreground overflow-auto w-12 md:w-52 lg:w-64">
        <Link
          className="flex items-center justify-center md:justify-start px-2 py-6 md:px-7 md:py-10"
          href="/"
        >
          <p className="hidden md:block text-black dark:text-white text-xl md:text-3xl ">
            deli<span className="text-primary text-2xl md:text-5xl">.</span>
          </p>
          <p className="md:hidden text-black dark:text-white text-3xl ">
            d<span className="text-primary text-2xl md:text-5xl">.</span>
          </p>
        </Link>

        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-1 mt-4">
            <NavLinks />
          </div>
          <div className="mt-auto flex flex-col sm:px-0 sm:items-center md:items-start md:px-7 pb-10">
            <Link
              className="flex items-center justify-center md:justify-start py-5 text-sm text-primary hover:text-orange-600 hover:text-opacity-90"
              href="/dashboard/settings"
            >
              <div className="flex">
                <Settings className="sm:mr-0 md:mr-3" size={20} />
                <p className="hidden md:block">Settings</p>
              </div>
            </Link>
            <button
              className="flex items-center justify-center md:justify-start py-3 text-sm text-primary hover:text-orange-600 hover:text-opacity-90"
              onClick={logout}
            >
              <div className="flex">
                <LogOut className="sm:mr-0 md:mr-3" size={20} />
                <p className="hidden md:block">Logout</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
