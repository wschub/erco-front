
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1000 },
];

const OverviewChart: React.FC = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Revenue trends over the past 7 months</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
            <Bar 
              dataKey="value" 
              fill="#6366f1" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Compared to last year: +12%
      </CardFooter>
    </Card>
  );
};

export default OverviewChart;
