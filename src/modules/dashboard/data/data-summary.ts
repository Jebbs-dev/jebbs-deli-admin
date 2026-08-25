import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react";

interface SummaryProps {
  item: string;
  total: number;
  percentage: number;
  symbol: string;
  indicator: LucideIcon;
  chartLine: string;
  color: string;
}

export const summaryData: SummaryProps[] = [
  {
    item: "Income",
    total: 520162,
    percentage: 20,
    symbol: "+",
    indicator: ArrowUp,
    chartLine: "/chart1.png",
    color: "green",
  },
  {
    item: "Sales",
    total: 900,
    percentage: 14.2,
    symbol: "-",
    indicator: ArrowDown,
    chartLine: "/chart2.png",
    color: "red",
  },
  {
    item: "Customers",
    total: 2522,
    percentage: 12.4,
    symbol: "+",
    indicator: ArrowUp,
    chartLine: "/chart3.png",
    color: "green",
  },
  {
    item: "Orders",
    total: 7590,
    percentage: 13.7,
    symbol: "+",
    indicator: ArrowUp,
    chartLine: "/chart4.png",
    color: "green",
  },
];
