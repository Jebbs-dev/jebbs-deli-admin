"use client";

import {
  dailySalesData,
  weeklySalesData,
  monthlySalesData,
  yearlySalesData,
  selectSalesLabel,
} from "./data/sales";

import { Bar, Line } from "react-chartjs-2";
import { data, options } from "./data/sales";
import { Chart, registerables } from "chart.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart } from "lucide-react";
import { useState } from "react";
import { selectSalesData } from "./data/sales";

Chart.register(...registerables);


const SalesData = () => {
  const [chartTab, setChartTab] = useState("dailyChart");

  return (
    <>
      <div className="w-[500px] relative bg-white shadow-sm p-3 rounded-md">
        <Tabs className="p-3" defaultValue="dailyChart">
          <TabsList className="flex w-40 relative left-[20%] h-8 mb-4">
            <TabsTrigger
              className="px-2 py-1"
              value="dailyChart"
              onClick={() => {
                selectSalesData(dailySalesData);
                selectSalesLabel(dailySalesData);
                setChartTab("dailyChart");
              }}
            >
              1d
            </TabsTrigger>
            <TabsTrigger
              className="px-2 py-1"
              value="weeklyChart"
              onClick={() => {
                selectSalesData(weeklySalesData);
                selectSalesLabel(weeklySalesData);
                setChartTab("weeklyChart");
              }}
            >
              1w
            </TabsTrigger>
            <TabsTrigger
              className="px-2 py-1"
              value="monthlyChart"
              onClick={() => {
                selectSalesData(monthlySalesData);
                selectSalesLabel(monthlySalesData);
                setChartTab("monthlyChart");
              }}
            >
              1m
            </TabsTrigger>
            <TabsTrigger
              className="px-2 py-1"
              value="yearlyChart"
              onClick={() => {
                selectSalesData(yearlySalesData);
                selectSalesLabel(yearlySalesData);
                setChartTab("yearlyChart");
              }}
            >
              1y
            </TabsTrigger>
            {/* <TabsTrigger className="px-2 py-1" value="lineChart">
              <LineChart className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger className="px-2 py-1" value="barChart">
              <BarChart3 className="w-4 h-4" />
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value={chartTab}>
            <Line data={data} options={options} />
          </TabsContent>
          <TabsContent value="barChart">
            <Bar data={data} options={options} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SalesData;
