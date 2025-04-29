export interface CustomerDataProps {
  customerData: [string, number][];
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

export const dailySales = [
  { saleTime: formattedHours[0], value: 12 },
  { saleTime: formattedHours[1], value: 17 },
  { saleTime: formattedHours[2], value: 16 },
  { saleTime: formattedHours[3], value: 18 },
  { saleTime: formattedHours[4], value: 17 },
  { saleTime: formattedHours[5], value: 16 },
  { saleTime: formattedHours[6], value: 25 },
  { saleTime: formattedHours[7], value: 30 },
  { saleTime: formattedHours[8], value: 40 },
  { saleTime: formattedHours[9], value: 33 },
  { saleTime: formattedHours[10], value: 30 },
  { saleTime: formattedHours[11], value: 39 },
  { saleTime: formattedHours[12], value: 42 },
  { saleTime: formattedHours[13], value: 43 },
  { saleTime: formattedHours[14], value: 53 },
  { saleTime: formattedHours[15], value: 50 },
  { saleTime: formattedHours[16], value: 51 },
  { saleTime: formattedHours[17], value: 59 },
  { saleTime: formattedHours[18], value: 48 },
  { saleTime: formattedHours[19], value: 43 },
  { saleTime: formattedHours[20], value: 38 },
  { saleTime: formattedHours[21], value: 36 },
  { saleTime: formattedHours[22], value: 32 },
  { saleTime: formattedHours[23], value: 27 },
];

export const weeklySales = [
  { saleTime: "Monday", value: 210 },
  { saleTime: "Tuesday", value: 245 },
  { saleTime: "Wednesday", value: 260 },
  { saleTime: "Thursday", value: 275 },
  { saleTime: "Friday", value: 290 },
  { saleTime: "Saturday", value: 310 },
  { saleTime: "Sunday", value: 280 },
];

export const monthlySales = [
  { saleTime: "2024-09-01", value: 25 },
  { saleTime: "2024-09-02", value: 34 },
  { saleTime: "2024-09-03", value: 42 },
  { saleTime: "2024-09-04", value: 28 },
  { saleTime: "2024-09-05", value: 36 },
  { saleTime: "2024-09-06", value: 45 },
  { saleTime: "2024-09-07", value: 38 },
  { saleTime: "2024-09-08", value: 29 },
  { saleTime: "2024-09-09", value: 31 },
  { saleTime: "2024-09-10", value: 27 },
  { saleTime: "2024-09-11", value: 33 },
  { saleTime: "2024-09-12", value: 40 },
  { saleTime: "2024-09-13", value: 37 },
  { saleTime: "2024-09-14", value: 41 },
  { saleTime: "2024-09-15", value: 46 },
  { saleTime: "2024-09-16", value: 32 },
  { saleTime: "2024-09-17", value: 35 },
  { saleTime: "2024-09-18", value: 39 },
  { saleTime: "2024-09-19", value: 30 },
  { saleTime: "2024-09-20", value: 44 },
  { saleTime: "2024-09-21", value: 47 },
  { saleTime: "2024-09-22", value: 26 },
  { saleTime: "2024-09-23", value: 43 },
  { saleTime: "2024-09-24", value: 50 },
  { saleTime: "2024-09-25", value: 48 },
  { saleTime: "2024-09-26", value: 52 },
  { saleTime: "2024-09-27", value: 59 },
  { saleTime: "2024-09-28", value: 55 },
  { saleTime: "2024-09-29", value: 53 },
  { saleTime: "2024-09-30", value: 51 },
];

export const yearlySales = [
  { saleTime: "January", value: 2157 },
  { saleTime: "February", value: 2412 },
  { saleTime: "March", value: 2768 },
  { saleTime: "April", value: 2801 },
  { saleTime: "May", value: 2698 },
  { saleTime: "June", value: 2935 },
  { saleTime: "July", value: 3265 },
  { saleTime: "August", value: 2937 },
  { saleTime: "September", value: 3067 },
  { saleTime: "October", value: 3289 },
  { saleTime: "November", value: 3845 },
  { saleTime: "December", value: 3910 },
];
