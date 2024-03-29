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
              "flex h-7 items-start px-6 text-sm border-l-4 border-opacity-0 hover:text-[#2463EB] hover:text-opacity-90",
              {
                "text-[#2463EB] border-l-4 border-opacity-100 border-l-[#2463EB] font-medium":
                  pathname === link.href,
              }
            )}
          >
            <div className="flex my-auto">
              <LinkIcon className="mr-3" size={20} />
              <p className="hidden md:block">{link.name}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
