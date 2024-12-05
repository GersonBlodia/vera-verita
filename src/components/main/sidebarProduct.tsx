"use client"
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from '../../store/storeCard';
import { useState } from "react";

export const Cart: React.FC = () => {
  const { 
    carrito, 
    total, 
    eliminarDelCarrito, 
    confirmarPedido,  
  } = useCartStore();
  const [nombreCliente, setNombreCliente] = useState('');

  const handleSubmit = async () => {
    if (!nombreCliente || carrito.length === 0) {
      alert('Por favor ingrese su nombre y agregue productos al carrito.');
      return;
    }

    try {
      const response = await fetch('/api/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreCliente,
          productosCarrito: carrito
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Pedido confirmado!');
        setNombreCliente('');
        confirmarPedido();
      } else {
        throw new Error(data.message || 'Error al confirmar pedido');
      }
    } catch (error) {
      console.error('Error en pedido:', error);
      alert('Ocurrió un error al procesar su pedido');
    }
  };

  return (
    <div className="w-full md:w-96 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <ShoppingCart className="mr-2" /> Carrito de Compras
      </h2>
      
      {carrito.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos en el carrito</p>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {carrito.map((item) => (
              <li 
                key={item.producto.id} 
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <span>{item.producto.nombre}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    x {item.cantidad}
                  </span>
                </div>
                <button 
                  onClick={() => eliminarDelCarrito(item.producto.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
          <div className="text-xl font-semibold mb-4 text-right">
            Total: ${total.toFixed(2)}
          </div>
          
          <input
            type="text"
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
            placeholder="Ingrese su nombre"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Confirmar Pedido
          </button>
        </>
      )}
    </div>
  );
};