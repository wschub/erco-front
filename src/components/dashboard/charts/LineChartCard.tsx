
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", visits: 2400, conversions: 1200 },
  { name: "Tue", visits: 1398, conversions: 800 },
  { name: "Wed", visits: 9800, conversions: 1700 },
  { name: "Thu", visits: 3908, conversions: 1500 },
  { name: "Fri", visits: 4800, conversions: 1600 },
  { name: "Sat", visits: 3800, conversions: 1000 },
  { name: "Sun", visits: 4300, conversions: 1000 },
];

const LineChartCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic & Conversions</CardTitle>
        <CardDescription>7-day website metrics</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "white", 
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
              }}
            />
            <Line type="monotone" dataKey="visits" stroke="#45a824" strokeWidth={2} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="conversions" stroke="#9ecc14" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
