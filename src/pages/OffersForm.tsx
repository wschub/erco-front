import React, { useState } from "react";

export const OffersForm = () => {
     const BASE_URL = import.meta.env.VITE_URL_SERVICE;

  const [form, setForm] = useState({
    qtykwh: "",
    priceKwh: "",
    startTime: "",
    endTime: "",
    status: "active", // oculto por defecto
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
       
      const token = localStorage.getItem("auth_token");

         let dateIn = new Date(form.startTime).toISOString();
         let dateOut = new Date(form.endTime).toISOString();

         console.log(dateIn);

      const payload = {
        ...form,
        qtykwh: Number(form.qtykwh),
        priceKwh: Number(form.priceKwh),
        startTime: new Date(form.startTime).toISOString(),
        endTime: new Date(form.endTime).toISOString(),
        };
       console.log(form);  
      const res = await fetch(`${BASE_URL}/api/offers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al crear la oferta");

      const data = await res.json();
      alert("Oferta creada con éxito");
      console.log(data);

      // Limpiar formulario (opcional)
      setForm({
        qtykwh: "",
        priceKwh: "",
        startTime: "",
        endTime: "",
        status: "active",
      });
    } catch (error:any) {
      console.error(error);
      alert("Hubo un error al crear la oferta");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Crear Oferta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cantidad (kWh)</label>
          <input
            type="number"
            name="qtykwh"
            value={form.qtykwh}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Precio por kWh</label>
          <input
            type="number"
            name="priceKwh"
            value={form.priceKwh}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fecha y Hora de Inicio</label>
          <input
            type="datetime-local"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fecha y Hora de Fin</label>
          <input
            type="datetime-local"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Campo oculto para status */}
        <input type="hidden" name="status" value={form.status} />

        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-2 rounded"
        >
          Registrar Oferta
        </button>
      </form>
    </div>
  );
};

export default OffersForm;
