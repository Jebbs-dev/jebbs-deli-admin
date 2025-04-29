"use client";

import {
  LayoutDashboard,
  LineChart,
  Sandwich,
  ShoppingBag,
  Users,
  Bell,
  CircleUser,
  Home,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  ShoppingBasket,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import useUserRole from "@/hooks/useUserRole";

const links = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Products", href: "/products", icon: Package },
  { name: "VendorStore", href: "/vendor-store", icon: ShoppingBag },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Vendors", href: "/vendors", icon: ShoppingBasket },
  { name: "ProductStore", href: "/product-store", icon: ShoppingBag },
];

const NavLinks = () => {
  const pathname = usePathname();
  const userType = useUserRole();

  // Filter links based on user role
  const filteredLinks = links.filter((link) => {
    // If user is a vendor, hide Analytics and Customers
    if (userType === "IS_VENDOR") {
      return (
        link.name !== "Analytics" &&
        link.name !== "Customers" &&
        link.name !== "Vendors" &&
        link.name !== "ProductStore"
      );
    }
    if (userType === "IS_ADMIN") {
      return link.name !== "Products" && link.name !== "VendorStore";
    }
    // Show all links for other user types
    return true;
  });

  return (
    <>
      {filteredLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex gap-0 px-1 md:px-5 items-center justify-center md:justify-start text-sm text-primary hover:text-orange-600 hover:text-opacity-90"
            )}
          >
            <span
              className={clsx(
                "flex justify-center md:justify-start my-auto md:my-0 px-2 md:px-3 py-2 rounded-lg w-full",
                {
                  "border-opacity-100 font-medium bg-orange-600/20 rounded-lg":
                    pathname === link.href,
                }
              )}
            >
              <LinkIcon className="sm:mr-0 md:mr-3" size={20} />
              <p className="hidden md:block">{link.name}</p>
            </span>
          </Link>
        );
      })}

      {/* <div
        id="slider"
        className="flex p-3 space-x-3 w-full auto-rows-fr overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide md:hidden"
      >
        {filteredLinks.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "h-40 flex justify-center items-center rounded-md text-muted-foreground font-medium border border-primary hover:bg-blue-500 hover:text-white md:hidden",
                {
                  "text-white bg-primary font-medium": pathname === link.href,
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
      </div> */}
    </>
  );
};

export default NavLinks;
