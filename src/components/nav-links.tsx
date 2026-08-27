import {
  LineChart,
  ShoppingBag,
  Users,
  Home,
  Package,
  ShoppingCart,
  ShoppingBasket,
  Bike,
  History,
} from "lucide-react";

import { Link, useRouterState } from "@tanstack/react-router";
import clsx from "clsx";
import useUserRole from "@/hooks/useUserRole";

const links = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Deliveries", href: "/deliveries", icon: Bike },
  { name: "History", href: "/deliveries/history", icon: History },
  { name: "Products", href: "/products", icon: Package },
  { name: "VendorStore", href: "/vendor-store", icon: ShoppingBag },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Vendors", href: "/vendors", icon: ShoppingBasket },
  { name: "ProductStore", href: "/product-store", icon: ShoppingBag },
] as const;

const NavLinks = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const userType = useUserRole();

  const filteredLinks = links.filter((link) => {
    if (userType === "IS_RIDER") {
      return (
        link.name === "Dashboard" ||
        link.name === "Deliveries" ||
        link.name === "History"
      );
    }
    if (userType === "IS_VENDOR") {
      return (
        link.name !== "Customers" &&
        link.name !== "Vendors" &&
        link.name !== "ProductStore" &&
        link.name !== "Deliveries" &&
        link.name !== "History"
      );
    }
    if (userType === "IS_ADMIN") {
      return (
        link.name !== "Products" &&
        link.name !== "VendorStore" &&
        link.name !== "Deliveries" &&
        link.name !== "History"
      );
    }
    return true;
  });

  return (
    <>
      {filteredLinks.map((link) => {
        const LinkIcon = link.icon;
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));
        return (
          <Link
            key={link.name}
            to={link.href}
            className={clsx(
              "flex gap-0 px-1 md:px-5 items-center justify-center md:justify-start text-sm text-primary hover:text-orange-600 hover:text-opacity-90"
            )}
          >
            <span
              className={clsx(
                "flex justify-center md:justify-start my-auto md:my-0 px-2 md:px-3 py-2 rounded-lg w-full",
                {
                  "border-opacity-100 font-medium bg-orange-600/20 rounded-lg":
                    isActive,
                }
              )}
            >
              <LinkIcon className="sm:mr-0 md:mr-3" size={20} />
              <p className="hidden md:block">{link.name}</p>
            </span>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
