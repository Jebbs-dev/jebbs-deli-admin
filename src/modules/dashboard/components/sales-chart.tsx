"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";

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
import {
  AnalyticsRange,
  useFetchAnalyticsSummary,
} from "@/modules/analytics/queries/fetch-analytics-summary";
import useUserRole from "@/hooks/useUserRole";

const chartConfig = {
  views: {
    label: "Sales",
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

const rangeToChartKey: Record<
  AnalyticsRange,
  keyof typeof chartConfig
> = {
  "1d": "daily",
  "1w": "weekly",
  "1m": "monthly",
  "1y": "yearly",
};

const SalesData = () => {
  const userType = useUserRole();
  const [range, setRange] = useState<AnalyticsRange>("1d");
  const [selectLineChart, setSelectLineChart] = useState(false);

  const { data, isLoading } = useFetchAnalyticsSummary(range);

  const activeChart = rangeToChartKey[range];

  const salesData = useMemo(
    () =>
      (data?.series ?? []).map((point) => ({
        saleTime: point.label,
        value: point.value,
      })),
    [data?.series]
  );

  if (userType === "IS_RIDER") {
    return null;
  }

  return (
    <div>
      <Card className="">
        <CardHeader className="grid grid-cols-3 space-y-0 p-0">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle className="text-primary">Sales Data</CardTitle>
            <CardDescription>
              {isLoading
                ? "Loading sales…"
                : `Showing total sales · ₦${Number(
                    data?.summary.revenue ?? 0
                  ).toLocaleString()}`}
            </CardDescription>
          </div>
          <div className="py-5 px-6">
            <Tabs
              value={range}
              onValueChange={(value) => setRange(value as AnalyticsRange)}
            >
              <TabsList className="flex w-[125px] relative h-8 mb-4">
                <TabsTrigger
                  className="px-2 py-1 text-xs font-medium"
                  value="1d"
                >
                  1d
                </TabsTrigger>
                <TabsTrigger
                  className="px-2 py-1 text-xs font-medium"
                  value="1w"
                >
                  1w
                </TabsTrigger>
                <TabsTrigger
                  className="px-2 py-1 text-xs font-medium"
                  value="1m"
                >
                  1m
                </TabsTrigger>
                <TabsTrigger
                  className="px-2 py-1 text-xs font-medium"
                  value="1y"
                >
                  1y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="py-5 px-6">
            <div className="inline-flex h-8 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <button
                type="button"
                className={`inline-flex items-center justify-center rounded-sm px-2 py-1 ${
                  !selectLineChart ? "bg-background text-foreground shadow-sm" : ""
                }`}
                onClick={() => setSelectLineChart(false)}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                className={`inline-flex items-center justify-center rounded-sm px-2 py-1 ${
                  selectLineChart ? "bg-background text-foreground shadow-sm" : ""
                }`}
                onClick={() => setSelectLineChart(true)}
              >
                <LineChart className="w-4 h-4" />
              </button>
            </div>
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
    </div>
  );
};

export default SalesData;
