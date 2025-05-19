import { User, columns } from "../components/users/columns"
import { DataTable } from "../components/users/data-table"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export const Users = () => {
   const BASE_URL = import.meta.env.VITE_URL_SERVICE;

    const [data, setData] = useState<any[]>([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const token = localStorage.getItem("auth_token"); // Asegúrate que el token esté bien guardado
            
             console.log(token);
            const response = await fetch(`${BASE_URL}/api/auth/users`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            });
    
            if (!response.ok) {
              throw new Error("Error al obtener transacciones");
            }
    
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error("Error fetching transactions:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchTransactions();
      }, []);
    
      if (loading) return <div>Cargando usuarios...</div>;
  return (
   <div>
         <h1 className="text-xl font-semibold mb-4">Usuarios</h1>
         <div className="flex justify-end">
  <NavLink to="/dashboard/register">
    <Button variant="default">
      Registrar Usuario
    </Button>
  </NavLink>
</div>
         
         <div className="container mx-auto py-10">
         <DataTable columns={columns} data={data} />
       </div>
       </div>
  )
}

