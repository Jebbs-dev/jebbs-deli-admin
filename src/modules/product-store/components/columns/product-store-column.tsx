"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";
import { Store } from "@/types/store";

export const columns: ColumnDef<Store>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <Image
        src={row.getValue("logo") || 
          "/assets/svg/placeholder.svg"}
         alt={row.getValue("name")}
        width={40}
        height={40}
        className="w-8 h-8 object-cover rounded-full border border-gray-400"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Store Name",
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "telephone",
    header: "Phone No",
  },

  {
    accessorKey: "createdAt",
    header: "Date Joined",
    cell: ({ row }) => dayjs(row.getValue("createdAt")).format("MMMM D, YYYY"),
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div>
        <EllipsisVertical size={15} />
      </div>
    ),
  },
];
