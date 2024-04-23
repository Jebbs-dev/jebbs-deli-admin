import Link from "next/link";
import NavLinks from "./nav-links";
import { Settings } from "lucide-react";
import { LogOut } from "lucide-react";

const SideNav = () => {

  const sizeVariants = ["small", "large"]

  return (
    <div className="flex flex-col md:h-full border bg-white text-muted-foreground ">
      <Link className="hidden md:flex items-start px-8 py-10" href="/">
        <p className="text-[#2463EB]">deli</p>
      </Link>

      <div className="relative flex mx-auto md:mx-0 md:max-w-none w-full md:grow md:justify-between md:flex-col md:space-x-0 md:space-y-5">
        <NavLinks />
        <div className="hidden h-auto w-full grow md:block"></div>
        <div className="hidden md:flex flex-col pb-10">
          <Link
            className="flex items-start px-8 py-7 text-sm border-l-4 border-transparent hover:text-[#2463EB] hover:text-opacity-90"
            href="/dashboard/settings"
          >
            <div className="flex my-auto">
              <Settings className="mr-3" size={20} />
              <p className="block">Settings</p>
            </div>
          </Link>
          <button className="flex items-start px-8 text-sm border-l-4 border-transparent">
          <div className="flex my-auto">
              <LogOut className="mr-3" size={20} />
              <p className="hidden md:block">Logout</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
