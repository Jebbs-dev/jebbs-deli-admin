import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react";
import Chart1 from "@/../../public/chart1.png";
import Chart2 from "@/../../public/chart2.png";
import Chart3 from "@/../../public/chart3.png";
import Chart4 from "@/../../public/chart4.png";
import { StaticImageData } from "next/image";


interface SummaryProps {
  item: string;
  total: number;
  percentage: number;
  symbol: string;
  indicator: LucideIcon;
  chartLine: StaticImageData;
  color: string;
}

export const summaryData: SummaryProps[] = [
  {
    item: "Income",
    total: 520162,
    percentage: 20,
    symbol: "+",
    indicator: ArrowUp,
    chartLine: Chart1,
    color: "green",
  },
  {
    item: "Sales",
    total: 900,
    percentage: 14.2,
    symbol: "-",
    indicator: ArrowDown,
    chartLine: Chart2,
    color: "red",
  },
  {
    item: "Customers",
    total: 2522,
    percentage: 12.4,
    symbol: "+",
    indicator: ArrowUp,
    chartLine: Chart3,
    color: "green",
  },
  {
    item: "Orders",
    total: 7590,
    percentage: 13.7,
    symbol: "+",
    indicator: ArrowUp,
    chartLine: Chart4,
    color: "green",
  },
];



