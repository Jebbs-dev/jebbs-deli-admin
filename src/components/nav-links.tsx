"use client";

import {
  LayoutDashboard,
  LineChart,
  Sandwich,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Products", href: "/products", icon: Sandwich },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Customers", href: "/customers", icon: Users },
];

const NavLinks = () => {
  let slider;
  // const slideLeft = () => {
  //   slider = document.getElementById("slider");
  //   slider.scrollLeft = slider.scrollLeft - 1000;
  // };

  // const slideRight = () => {
  //   slider = document.getElementById("slider");
  //   slider.scrollLeft = slider.scrollLeft + 1000;
  // };

  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "hidden md:flex h-7 items-start px-6 text-sm border-l-4 border-transparent hover:text-[#2463EB] hover:text-opacity-90",
              {
                "text-[#2463EB] border-opacity-100 font-medium":
                  pathname === link.href,
              }
            )}
          >
            <div className="flex my-auto">
              <LinkIcon className="mr-3" size={20} />
              <p className="block">{link.name}</p>
            </div>
          </Link>
        );
      })}
{/* <div cl>

</div> */}
      <div
        id="slider"
        className="flex p-3 space-x-3 w-full auto-rows-fr overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide md:hidden"
      >
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "h-40 flex justify-center items-center rounded-md text-muted-foreground font-medium border border-[#2463EB] hover:bg-blue-500 hover:text-white md:hidden",
                {
                  "text-white bg-[#2463EB] font-medium":
                    pathname === link.href,
                }
              )}
            >
              <div className="flex flex-col w-[90vw] space-y-2 justify-center items-center">
                <LinkIcon size={40} />
                <p className="text-2xl">{link.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default NavLinks;
