
import React from "react";
import { BarChart, LineChart, PieChart, Users } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import OverviewChart from "@/components/dashboard/charts/OverviewChart";
import PieChartCard from "@/components/dashboard/charts/PieChartCard";
import LineChartCard from "@/components/dashboard/charts/LineChartCard";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ingresos Totales"
          value="$45,231.89"
          description="Ingresos Mensuales"
          icon={<BarChart className="h-full w-full" />}
          trend={{ value: "20.1%", positive: true }}
        />
        <StatsCard
          title="Ofertas Activas"
          value="2,420"
          description="Daily active users"
          icon={<Users className="h-full w-full" />}
          trend={{ value: "10.3%", positive: true }}
        />
        <StatsCard
          title="Conversion Rate"
          value="3.6%"
          description="Compared to last month"
          icon={<PieChart className="h-full w-full" />}
          trend={{ value: "1.2%", positive: false }}
        />
        <StatsCard
          title="Avg. Session"
          value="2m 45s"
          description="Per user session"
          icon={<LineChart className="h-full w-full" />}
          trend={{ value: "18.2%", positive: true }}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <OverviewChart />
        <div className="grid gap-4 grid-cols-1 lg:col-span-1">
          <PieChartCard />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <LineChartCard />
      </div>
    </div>
  );
};

export default Dashboard;
