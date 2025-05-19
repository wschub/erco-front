import { Transaction, columns } from "../components/transactions/columns"
import { DataTable } from "../components/transactions/data-table"
import React, { useEffect, useState } from "react";

async function getData(): Promise<Transaction[]> {
  // Fetch data from your API here.
  return [];
}

export const Transactions = () => {
  const BASE_URL = import.meta.env.VITE_URL_SERVICE;
    
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("auth_token"); // Asegúrate que el token esté bien guardado
        
         console.log(token);
        const response = await fetch(`${BASE_URL}/api/transactions`, {
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

  if (loading) return <div>Cargando transacciones...</div>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Transacciones</h1>
      
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </div>
  );
}

