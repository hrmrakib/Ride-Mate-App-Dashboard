"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BookingGraphItem = {
  label: string; // Jan, Feb, etc
  newUsers: number; // booking count
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chartColors = [
  "#3b82f6",
  "#10b981",
  "#000000",
  "#7dd3fc",
  "#93c5fd",
  "#10b981",
  "#3b82f6",
  "#10b981",
  "#1f2937",
  "#7dd3fc",
  "#93c5fd",
  "#10b981",
];

const mapBookingsToChartData = (data: BookingGraphItem[]) => {
  const map = new Map(data?.map((item) => [item.label, item.newUsers]));

  return MONTHS.map((month, index) => ({
    month,
    bookingCount: map.get(month) ?? 0,
    color: chartColors[index % chartColors.length],
  }));
};

export default function EventChart({
  bookings,
}: {
  bookings: BookingGraphItem[];
}) {
  const chartData = mapBookingsToChartData(bookings);

  return (
    <Card className='!border-none'>
      <CardHeader>
        <CardTitle className='text-2xl lg:text-4xl font-semibold text-[#1C1C1C]'>
          Bookings This Year
        </CardTitle>
      </CardHeader>

      <CardContent className='pb-4'>
        <div className='h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <XAxis
                dataKey='month'
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                }}
                // formatter={(value: number) => [
                //   `${value.toLocaleString()} Bookings`,
                //   "Total",
                // ]}
              />

              <Bar dataKey='bookingCount' radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   Tooltip,
//   Cell,
// } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // Default 12-month structure
// const defaultBookings = [
//   { month: "Jan", bookingCount: 20 },
//   { month: "Feb", bookingCount: 85 },
//   { month: "Mar", bookingCount: 150 },
//   { month: "Apr", bookingCount: 110 },
//   { month: "May", bookingCount: 90 },
//   { month: "Jun", bookingCount: 70 },
//   { month: "Jul", bookingCount: 10 },
//   { month: "Aug", bookingCount: 55 },
//   { month: "Sep", bookingCount: 122 },
//   { month: "Oct", bookingCount: 75 },
//   { month: "Nov", bookingCount: 190 },
//   { month: "Dec", bookingCount: 220 },
// ];

// // Color palette for each month
// const chartColors = [
//   "#3b82f6", // blue
//   "#10b981", // green
//   "#000000", // black
//   "#7dd3fc", // light blue
//   "#93c5fd", // soft blue
//   "#10b981", // green
//   "#3b82f6", // blue
//   "#10b981", // green
//   "#1f2937", // gray
//   "#7dd3fc", // light blue
//   "#93c5fd", // soft blue
//   "#10b981", // green
// ];

// export default function EventChart({
//   bookings = defaultBookings,
// }: {
//   bookings?: { month: string; bookingCount: number }[];
// }) {
//   // Combine booking data with color for rendering
//   const chartData = bookings.map((item, index) => ({
//     ...item,
//     color: chartColors[index % chartColors.length],
//   }));

//   return (
//     <Card className='!border-none'>
//       <CardHeader>
//         <CardTitle className='text-2xl lg:text-4xl font-semibold text-[#1C1C1C]'>
//           User Register This Year
//         </CardTitle>
//       </CardHeader>

//       <CardContent className='pb-4'>
//         <div className='h-80'>
//           <ResponsiveContainer width='100%' height='100%'>
//             <BarChart
//               data={chartData}
//               margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//             >
//               <XAxis
//                 dataKey='month'
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: "#6b7280", fontSize: 12 }}
//               />
//               <YAxis
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: "#6b7280", fontSize: 12 }}
//                 tickFormatter={(value) => `${value}`}
//               />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#1f2937",
//                   border: "none",
//                   borderRadius: "8px",
//                   color: "white",
//                 }}
//                 formatter={(value) => {
//                   if (value === undefined) return ["0 Bookings", "Total"];

//                   return [`${value.toLocaleString()} Bookings`, "Total"];
//                 }}
//                 // formatter={(value: number) => [
//                 //   `${value.toLocaleString()} Bookings`,
//                 //   "Total",
//                 // ]}
//               />
//               <Bar dataKey='bookingCount' radius={[4, 4, 0, 0]}>
//                 {chartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
