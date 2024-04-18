"use client";

import {
  dailySalesData,
  weeklySalesData,
  monthlySalesData,
  yearlySalesData,
  selectSalesLabel,
  selectSalesData,
  selectTImeLabel,
} from "./data/sales";

import { Bar, Line } from "react-chartjs-2";
import { data, options } from "./data/sales";
import { Chart, registerables } from "chart.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart } from "lucide-react";
import { useState } from "react";

Chart.register(...registerables);

const SalesData = () => {
  const [chartTab, setChartTab] = useState("dailyChart");
  const [selectLine, setSelectLine] = useState(false);

  return (
    <>
      <div className="w-[500px] relative bg-white shadow-md p-3 rounded-md">
        <Tabs className="p-3" defaultValue="dailyChart">
          <div className="flex flex-row space-x-56">
            <div>
              <TabsList className="flex w-32 relative left-[20%] h-8 mb-4">
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
                  onClick={() => setSelectLine(true)}
                >
                  <LineChart className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger
                  className="px-2 py-1"
                  value={chartTab}
                  onClick={() => setSelectLine(false)}
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
