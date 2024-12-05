"use client";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "../../store/storeCard";
import { crearPedido } from "../../action/post-pedido";

export const Cart: React.FC = () => {
  const { carrito, total, confirmarPedido } = useCartStore();
  const [nombreCliente, setNombreCliente] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState(new Date()); // Fecha de entrega
  
  const handleSubmit = async () => {
    if (!nombreCliente || carrito.length === 0) {
      alert("Por favor ingrese su nombre y agregue productos al carrito.");
      return;
    }

    try {
      // Llamar a la función para crear el pedido
      await crearPedido({
        nombreCliente,
        productosCarrito: carrito.map(item => ({
          id: item.producto.id,
          cantidad: item.cantidad,
        })),
        fechaEntrega: fechaEntrega,
      });

      alert("Pedido confirmado!");
      setNombreCliente('');
      confirmarPedido(); // Limpiar el carrito después de confirmar

    } catch (error) {
      console.error("Error al procesar el pedido:", error);
      alert("Ocurrió un error al procesar su pedido.");
    }
  };

  return (
    <div className="w-full md:w-96 bg-white shadow-xl rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
        <ShoppingCart className="mr-2" /> Carrito de Compras
      </h2>

      {carrito.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos en el carrito</p>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {carrito.map((item) => (
              <li key={item.producto.id} className="flex justify-between items-center">
                <span>{item.producto.nombre}</span>
                <span className="text-gray-500">Cantidad: {item.cantidad}</span>
                <span className="font-bold">{(item.producto.precio * item.cantidad).toFixed(2)} $</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mb-4">
            <label htmlFor="nombreCliente" className="text-sm font-semibold text-gray-700">Nombre del Cliente</label>
            <input
              id="nombreCliente"
              type="text"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <label htmlFor="fechaEntrega" className="text-sm font-semibold text-gray-700">Fecha de Entrega</label>
            <input
              id="fechaEntrega"
              type="date"
              value={fechaEntrega.toISOString().split('T')[0]}
              onChange={(e) => setFechaEntrega(new Date(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold text-lg">Total a Pagar:</span>
            <span className="font-bold text-xl text-green-500">{total.toFixed(2)} $</span>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Confirmar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
};
