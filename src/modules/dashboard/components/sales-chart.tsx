"use client";

import {
  dailySalesData,
  weeklySalesData,
  monthlySalesData,
  yearlySalesData,
  selectSalesLabel,
  selectSalesData,
  selectTImeLabel,
} from "../data/dummy-sales";

import { Bar, Line } from "react-chartjs-2";
import { data, options } from "../data/dummy-sales";
import { Chart, registerables } from "chart.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart } from "lucide-react";
import { useState } from "react";

Chart.register(...registerables);

const SalesData = () => {
  const [chartTab, setChartTab] = useState("dailyChart");
  const [selectLine, setSelectLine] = useState(false);
  let lineChart;
  let barChart = "";

  return (
    <>
      <div className="w-full md:h-[350px] relative bg-white border p-2 md:p-3 rounded-md">
        <h1 className="text-xl font-semibold px-3 md:px-10">Sales Data</h1>
        <Tabs className="p-3" defaultValue="dailyChart">
          <div className="flex flex-row justify-between">
            <div>
              <TabsList className="flex w-[135px] relative md:left-[20%] h-8 mb-4">
                <TabsTrigger
                  className="px-2 py-1 text-xs font-medium"
                  value="dailyChart"
                  onClick={() => {
                    selectSalesData(dailySalesData);
                    selectSalesLabel(dailySalesData);
                    selectTImeLabel("Daily");
                    setChartTab("dailyChart");
                  }}
                >
                  1d
                </TabsTrigger>
                <TabsTrigger
                  className="px-2 py-1 text-xs font-medium"
                  value="weeklyChart"
                  onClick={() => {
                    selectSalesData(weeklySalesData);
                    selectSalesLabel(weeklySalesData);
                    selectTImeLabel("Weekly");
                    setChartTab("weeklyChart");
                  }}
                >
                  1w
                </TabsTrigger>
                <TabsTrigger
                  className="px-2 py-1 text-xs font-medium"
                  value="monthlyChart"
                  onClick={() => {
                    selectSalesData(monthlySalesData);
                    selectSalesLabel(monthlySalesData);
                    selectTImeLabel("Monthly");
                    setChartTab("monthlyChart");
                  }}
                >
                  1m
                </TabsTrigger>
                <TabsTrigger
                  className="px-2 py-1 text-xs font-medium"
                  value="yearlyChart"
                  onClick={() => {
                    selectSalesData(yearlySalesData);
                    selectSalesLabel(yearlySalesData);
                    selectTImeLabel("Yearly");
                    setChartTab("yearlyChart");
                  }}
                >
                  1y
                </TabsTrigger>
              </TabsList>
            </div>
            <div>
              <TabsList className="h-8">
                <TabsTrigger
                  className="px-2 py-1"
                  value={chartTab}
                  onClick={() => {
                    setSelectLine(true)
                    lineChart = chartTab;
                  }}
                >
                  <LineChart className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger
                  className="px-2 py-1"
                  onClick={() => {
                    setSelectLine(false)
                    barChart = chartTab;
                  }}
                  value={barChart}
                >
                  <BarChart3 className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {selectLine ? (
            <TabsContent value={chartTab}>
              <Line data={data} options={options} />
            </TabsContent>
          ) : (
            <TabsContent value={chartTab}>
              <Bar data={data} options={options} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default SalesData;
