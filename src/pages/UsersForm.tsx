import React, { useState } from "react";



export const UsersForm = () => {
  const BASE_URL = import.meta.env.VITE_URL_SERVICE;

  const [formData, setFormData] = useState({
    full_name: "",
    surname: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple
    const { full_name, surname, email, password, role } = formData;
    if (!full_name || !surname || !email || !password || !role) {
      setMessage("Todos los campos son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("auth_token");

      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar usuario.");
      }

      const result = await response.json();
      setMessage("Usuario registrado correctamente.");
      setFormData({
        full_name: "",
        surname: "",
        email: "",
        password: "",
        role: "buyer",
      });
    } catch (error: any) {
      setMessage(error.message || "Error desconocido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Registrar Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="full_name"
          placeholder="Nombre completo"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="surname"
          placeholder="Apellido"
          value={formData.surname}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="admin">Admin</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>

      {message && (
        <div className="mt-4 text-sm text-center text-red-500">{message}</div>
      )}
    </div>
  );
};
