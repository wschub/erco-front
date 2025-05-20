
import React,{ useEffect, useState } from "react";
import { BarChart, LineChart, PieChart, Users } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import OverviewChart from "@/components/dashboard/charts/OverviewChart";
import PieChartCard from "@/components/dashboard/charts/PieChartCard";
import LineChartCard from "@/components/dashboard/charts/LineChartCard";
import { URL_SERVICE } from "../lib/constants"; 
import { getToken } from "../lib/auth"; 

const Dashboard: React.FC = () => {

   const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalKwh, setTotalKwh] = useState<number>(0);

   const [offersActive, setOffersActive] = useState<number | undefined>(undefined);
const [offersSold, setOffersSold] = useState<number | undefined>(undefined);
const [offersExpired, setOffersExpired] = useState<number | undefined>(undefined);



 


  useEffect(() => {
    const fetchKpi = async () => {
      try {
        const token = localStorage.getItem("auth_token"); // Ajusta si usas otro mecanismo

        const response = await fetch(`${URL_SERVICE}/api/transactions/kpi`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al cargar los KPI");

        const data = await response.json();

        setTotalPrice(data.totalPrice);
        setTotalKwh(data.totalKwh);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    //offers
    const fetchKpiOffers = async () => {
  try {
    const token = localStorage.getItem("auth_token");

    const [resActive, resSold, resExpired] = await Promise.all([
      fetch("http://localhost:4000/api/offers/kpi/active", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("http://localhost:4000/api/offers/kpi/sold", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("http://localhost:4000/api/offers/kpi/expired", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    const dataActive = await resActive.json();
    const dataSold = await resSold.json();
    const dataExpired = await resExpired.json();

      console.log("Active:", dataActive);
    console.log("Sold:", dataSold);
    console.log("Expired:", dataExpired);

    
    setOffersActive(typeof dataActive.data === "number" ? dataActive.data : 0);
    setOffersSold(typeof dataSold.data === "number" ? dataSold.data : 0);
    setOffersExpired(typeof dataExpired.data === "number" ? dataExpired.data : 0);

  } catch (error) {
    console.error("Error al obtener KPIs de ofertas", error);
  }
};



    fetchKpi();
     fetchKpiOffers(); 
  }, []);


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ingresos Totales"
          value={`$ ${totalPrice.toLocaleString("es-CO")}`}
          description="Ingresos Mensuales"
          icon={<BarChart className="h-full w-full" />}
          trend={{ value: "", positive: true }}
        />
        <StatsCard
          title="No. Ofertas Activas"
           value={
  typeof offersActive === "number"
    ? offersActive.toLocaleString("es-CO")
    : "Cargando..."
}
          description="Ofertas Activas"
          icon={<Users className="h-full w-full" />}
          trend={{ value: "", positive: true }}
        />
        <StatsCard
          title="No. Ofertas Vendidas"
          value={
    typeof offersSold === "number" && !isNaN(offersSold)
      ? offersSold.toLocaleString("es-CO")
      : "Cargando..."
  }
          description="Ofertas Vendidas"
          icon={<Users className="h-full w-full" />}
          trend={{ value: "", positive: true }}
        />
        <StatsCard
          title="No. Ofertas Expiradas"
          value={
    typeof offersExpired === "number" && !isNaN(offersExpired)
      ? offersExpired.toLocaleString("es-CO")
      : "Cargando..."
  }
          description="Ofertas Expiradas"
          icon={<Users className="h-full w-full" />}
          trend={{ value: "", positive: true }}
        />
        <StatsCard
          title="No. Kwh Vendidos"
           value={totalKwh.toLocaleString("es-CO")}
          description="No. Kwh Vendidos"
          icon={<Users className="h-full w-full" />}
          trend={{ value: "", positive: true }}
        />
        
        
      </div>

      

      
    </div>
  );
};

export default Dashboard;
