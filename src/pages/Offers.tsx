import React, { useEffect, useState } from "react";
import { Offer, columns } from "../components/offers/columns"
import { DataTable } from "../components/offers/data-table"
import socket from "../lib/socket";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { URL_SERVICE } from "../lib/constants"; // si estás usando variable global
import { getToken } from "../lib/auth"; // función utilitaria para obtener token del localStorage

const Offers = () => {
   
  const [offers, setOffers] = useState<any[]>([]);

  // 1. Cargar datos iniciales via GET
  useEffect(() => {
    const fetchOffers = async () => {
      try {
      
        const token = getToken();
        const response = await fetch(`${URL_SERVICE}/api/offers`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener ofertas");
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error al cargar ofertas:", error);
      }
    };

    fetchOffers();
  }, []);

  // 2. Socket para escuchar nuevas ofertas
  useEffect(() => {
    const handleNewOffer = (newOffer: any) => {
      setOffers((prevOffers) => {
        const exists = prevOffers.some((offer) => offer.id === newOffer.id);
        if (exists) {
          // Si existe, actualizarla
          return prevOffers.map((offer) =>
            offer.id === newOffer.id ? newOffer : offer
          );
        } else {
          // Si no existe, agregarla
          
          return [...prevOffers, newOffer];
        }
      });
    };

    socket.on("new-offer", handleNewOffer);

    return () => {
      socket.off("new-offer", handleNewOffer);
    };
  }, []);


  const handleBuy = async (offer: any) => {
    try {
      console.log(offer);
      const token = localStorage.getItem("auth_token"); // o como guardes el token

      const payload = {
      offerId: Number(offer.id),
      sellerId:Number(offer.sellerId),
       qtykwh: parseFloat(offer.qtykwh),
      priceKwh: parseFloat(offer.priceKwh),
    };

       console.log('payload: ',payload);

      const res = await fetch(`http://localhost:4000/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error de respuesta al realizar la transacción");

      const data = await res.json();
      console.log("Transacción exitosa:", data);
      alert("Transacción realizada con éxito");
    } catch (error) {
      console.error(error);
      alert("Error al realizar la transacción");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Ofertas Disponibles</h1>
      <div className="flex justify-end mb-4">
        <NavLink to="/dashboard/newOffer">
          <Button variant="default">
            Crear Oferta
          </Button>
        </NavLink>
      </div>

      <div className="space-y-2">
       
          
        {offers.map((offer, idx) => (
          <div key={offer.id || idx} className="border p-4 ">
            <p><strong>Cant. Kwh:</strong> {offer.qtykwh}</p>
            <p className="text-lg font-bold">
  <strong>Precio Kwh:</strong> <span className="text-primary">$ {offer.priceKwh}</span>
</p>
            <p><strong>F. Inicio:</strong> ${offer.startTime}</p>
            <p><strong>F. Fin:</strong> ${offer.endTime}</p>
            
            <div className="flex justify-end mt-2">
    <button className="bg-primary text-gray-800 font-semibold py-2 px-4 rounded"
     onClick={() => handleBuy(offer)}>
      COMPRAR AHORA
    </button>
  </div>
              
            
          </div>
        ))}
       
      </div>

       {/*<div className="container mx-auto py-10">
            <DataTable columns={columns} data={offers} />
          </div> */}

    </div>
  );
};

export default Offers;
