import { ChartArea } from "chart.js/auto";
import SalesData from "../sales-data";

export interface SalesDataProps {
  salesData: [string, number][];
}

const hoursArray = Array.from({ length: 24 }, (_, i) => i);

export const formattedHours = hoursArray.map((hour) => {
  const startDate = new Date("2024-04-10T00:00:00");

  startDate.setHours(hour);

  return startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
});

export const dailySalesData: [string, number][] = [
  [formattedHours[0], 12],
  [formattedHours[1], 17],
  [formattedHours[2], 16],
  [formattedHours[3], 18],
  [formattedHours[4], 17],
  [formattedHours[5], 16],
  [formattedHours[6], 25],
  [formattedHours[7], 30],
  [formattedHours[8], 40],
  [formattedHours[9], 33],
  [formattedHours[10], 30],
  [formattedHours[11], 39],
  [formattedHours[12], 42],
  [formattedHours[13], 43],
  [formattedHours[14], 53],
  [formattedHours[15], 50],
  [formattedHours[16], 51],
  [formattedHours[17], 59],
  [formattedHours[18], 48],
  [formattedHours[19], 43],
  [formattedHours[20], 38],
  [formattedHours[21], 36],
  [formattedHours[22], 32],
  [formattedHours[23], 27],
  // [formattedHours[14], 28],
];

export const weeklySalesData: [string, number][] = [
  ["Monday", 210],
  ["Tuesday", 245],
  ["Wednesday", 260],
  ["Thursday", 275],
  ["Friday", 290],
  ["Saturday", 310],
  ["Sunday", 280],
];

export const monthlySalesData: [string, number][] = [
  ["01", 25],
  ["02", 34],
  ["03", 42],
  ["04", 28],
  ["05", 36],
  ["06", 45],
  ["07", 38],
  ["08", 29],
  ["09", 31],
  ["10", 27],
  ["11", 33],
  ["12", 40],
  ["13", 37],
  ["14", 41],
  ["15", 46],
  ["16", 32],
  ["17", 35],
  ["18", 39],
  ["19", 30],
  ["20", 44],
  ["21", 47],
  ["22", 26],
  ["23", 43],
  ["24", 50],
  ["25", 48],
  ["26", 52],
  ["27", 49],
  ["28", 55],
  ["29", 53],
  ["30", 51],
  ["31", 58],
];

export const yearlySalesData: [string, number][] = [
  ["January", 2157],
  ["February", 2412],
  ["March", 2768],
  ["April", 2801],
  ["May", 2698],
  ["June", 2935],
  ["July", 3265],
  ["August", 2937],
  ["September", 3067],
  ["October", 3289],
  ["November", 3845],
  ["December", 3910],
];

export const options = {
  responsive: true,
  interaction: {
    intersect: true,
    mode: "index" as "index",
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Time (Hour)",
      },
      ticks: {
        color: "#64748b",
      },
      grid: {
        lineWidth: 0,
      },
    },
    y: {
      beginAtZero: "true",
      title: {
        display: true,
        text: "Sales",
      },
      ticks: {
        color: "#64748b",
      },
      grid: {
        lineWidth: 0,
      },
    },
  },
};

const sales = {
  daily: dailySalesData,
  weekly: weeklySalesData,
  monthly: monthlySalesData,
  yearly: yearlySalesData,
}

// const chartToShow = ;

// try to make the data more dynamic so as to loop through the tuples


export const data = {
  labels: dailySalesData.map((label)=>label[0]),
  datasets: [
    {
      label: "Total Sales",
      data: dailySalesData.map((data) => data[1]),
      borderColor: "green",
      backgroundColor: "#ecfeff",
      borderWidth: 1,
      lineTension: 0.5,
      pointRadius: 0,
      fill: true,
    },
  ],
};

export function selectSalesLabel(salesLabel: [string, number][]){
  let returnedLabel = salesLabel.map((label) => label[0]);
  return data.labels = returnedLabel;
}

export function selectSalesData(salesData: [string, number][]) {
  let returnedData =  salesData.map((data) => data[1]);
  return data.datasets[0].data = returnedData;
}




// 