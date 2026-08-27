import { ColumnDef } from "@tanstack/react-table";

export type AnalyticsTopProduct = {
  rank: number;
  name: string;
  unitsSold: number;
  orders: number;
};

export const columns: ColumnDef<AnalyticsTopProduct>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "unitsSold",
    header: "Units Sold",
  },
  {
    accessorKey: "orders",
    header: "Orders",
  },
];
