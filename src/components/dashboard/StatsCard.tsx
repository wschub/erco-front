
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-slate-100 p-1.5 text-indigo-600">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
      {trend && (
        <CardFooter>
          <div
            className={cn(
              "text-xs font-medium",
              trend.positive ? "text-emerald-500" : "text-rose-500"
            )}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatsCard;
