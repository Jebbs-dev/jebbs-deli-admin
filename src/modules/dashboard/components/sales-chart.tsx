"use client";

import { useState, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";

import { dailySales } from "../data/dummy-sales-data";
import { weeklySales } from "../data/dummy-sales-data";
import { monthlySales } from "../data/dummy-sales-data";
import { yearlySales } from "../data/dummy-sales-data";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart } from "lucide-react";

const chartConfig = {
  views: {
    label: "No of Sales",
  },
  daily: {
    label: "Daily Sales",
    color: "#ea580c",
  },
  weekly: {
    label: "Weekly Sales",
    color: "#ea580c",
  },
  monthly: {
    label: "Monthly Sales",
    color: "#ea580c",
  },
  yearly: {
    label: "Yearly Sales",
    color: "#ea580c",
  },
} satisfies ChartConfig;

 const SalesData =()=> {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("daily");

  const [salesData, setSalesData] = useState(dailySales);
  const [selectLineChart, setSelectLineChart] = useState(false);

  const total = useMemo(
    () => ({
      daily: dailySales.reduce((acc, curr) => acc + curr.value, 0),
      weekly: weeklySales.reduce((acc, curr) => acc + curr.value, 0),
      monthly: monthlySales.reduce((acc, curr) => acc + curr.value, 0),
      yearly: yearlySales.reduce((acc, curr) => acc + curr.value, 0),
    }),
    []
  );

  return (
    <Tabs defaultValue="daily">
      <Card className="">
        <CardHeader className="grid grid-cols-3 space-y-0 p-0">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle className="text-primary">Sales Data</CardTitle>
            <CardDescription>Showing total sales</CardDescription>
          </div>
          <div className="py-5 px-6">
            <TabsList className="flex w-[125px] relative h-8 mb-4">
              <TabsTrigger
                className="px-2 py-1 text-xs font-medium"
                value="daily"
                onClick={() => {
                  setActiveChart("daily");
                  setSalesData(dailySales);
                }}
              >
                1d
              </TabsTrigger>
              <TabsTrigger
                className="px-2 py-1 text-xs font-medium"
                value="weekly"
                onClick={() => {
                  setActiveChart("weekly");
                  setSalesData(weeklySales);
                }}
              >
                1w
              </TabsTrigger>
              <TabsTrigger
                className="px-2 py-1 text-xs font-medium"
                value="monthly"
                onClick={() => {
                  setActiveChart("monthly");
                  setSalesData(monthlySales);
                }}
              >
                1m
              </TabsTrigger>
              <TabsTrigger
                className="px-2 py-1 text-xs font-medium"
                value="yearly"
                onClick={() => {
                  setActiveChart("daily");
                  setSalesData(yearlySales);
                }}
              >
                1y
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="py-5 px-6">
            <TabsList className="h-8">
              <TabsTrigger
                className="px-2 py-1"
                onClick={() => {
                  setSelectLineChart(false);
                }}
                value="bar"
              >
                <BarChart3 className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger
                className="px-2 py-1"
                onClick={() => {
                  setSelectLineChart(true);
                }}
                value="line"
              >
                <LineChart className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          {selectLineChart ? (
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart
                accessibilityLayer
                data={salesData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <YAxis
                  dataKey="value"
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "Sales", angle: -90, position: "insideLeft" }}
                />
                <XAxis
                  dataKey="saleTime"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return value.toString();
                      }}
                      indicator="line"
                    />
                  }
                />
                <Area
                  dataKey="value"
                  type="natural"
                  stroke={`var(--color-${activeChart})`}
                  fill={`var(--color-${activeChart})`}
                  fillOpacity={0.1}
                  strokeWidth={1.5}
                  dot={false}
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={salesData}
                margin={{
                  left: 12,
                  right: 12,
                  bottom: 12,
                }}
              >
                <CartesianGrid vertical={false} horizontal={false} />
                <YAxis
                  dataKey="value"
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "Sales", angle: -90, position: "insideLeft" }}
                />
                <XAxis
                  dataKey="saleTime"
                  label={{
                    value: "Time",
                    offset: -9,
                    position: "insideBottom",
                  }}
                  tickLine={false}
                  axisLine={true}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => value}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return value.toString();
                      }}
                    />
                  }
                />
                <Bar
                  dataKey="value"
                  radius={2}
                  fill={`var(--color-${activeChart})`}
                />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </Tabs>
  );
}

export default SalesData;
