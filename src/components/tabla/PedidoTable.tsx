// app/pedidos/PedidoTable.tsx
'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';  // Asegúrate de tener este componente
 
// Interfaz de un pedido (ajusta los tipos si es necesario)
interface Pedido {
  id: number;
  usuario: {
    nombre: string;
  };
  fecha_registro: Date;
  fecha_entrega: Date;
  estado: string;
  orderItems: {
    id: number;
    cantidad: number;
    total: number;
    producto_id: number;
    pedido_id: number;
    producto: {
      nombre: string;
      precio: number;
    };
  }[];
}

interface PedidoTableProps {
  pedidos: Pedido[];
  actualizarEstado: (pedidoId: number) => void; // Acción para actualizar el estado
}

const PedidoTable: React.FC<PedidoTableProps> = ({ pedidos, actualizarEstado }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const pedidosPorPagina = 5;

  const [detallePedido, setDetallePedido] = useState<Pedido | null>(null);

  const cambiarPagina = (pagina: number) => {
    setPaginaActual(pagina);
  };

  const formatearFecha = (fecha: Date) => {
    return new Date(fecha).toLocaleDateString('es-PE');
  };

  const mostrarPedidos = pedidos.slice(
    (paginaActual - 1) * pedidosPorPagina,
    paginaActual * pedidosPorPagina
  );

  const verDetalles = (pedido: Pedido) => {
    setDetallePedido(pedido);
  };

  const manejarDespachar = async (pedidoId: number) => {
    await actualizarEstado(pedidoId);
    window.location.reload(); // Recarga la página actual
    // Aquí se puede realizar algún cambio visual o recarga si es necesario
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Fecha de Registro</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mostrarPedidos.map((pedido) => (
            <tr key={pedido.id} className="border-b">
              <td className="px-4 py-2">{pedido.usuario.nombre}</td>
              <td className="px-4 py-2">{formatearFecha(pedido.fecha_registro)}</td>
              <td className="px-4 py-2">{pedido.estado}</td>
              <td className="px-4 py-2">
                {pedido.orderItems.reduce((total, item) => total + item.total, 0).toFixed(2)}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => verDetalles(pedido)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Ver Detalles
                </button>
                {pedido.estado !== 'despachado' && (
                  <button
                    onClick={() => manejarDespachar(pedido.id)}
                    className="ml-4 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                  >
                    Despachar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
        >
          Anterior
        </button>
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual * pedidosPorPagina >= pedidos.length}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
        >
          Siguiente
        </button>
      </div>

      {/* Modal para detalles del pedido */}
      {detallePedido && (
        <Modal isOpen={true} onClose={() => setDetallePedido(null)}>
          <h2 className="text-xl font-semibold">Detalles del Pedido</h2>
          <div className="mt-4">
            <h3 className="text-lg">Productos:</h3>
            <ul>
              {detallePedido.orderItems.map((item) => (
                <li key={item.id} className="py-2">
                  <span>{item.cantidad} x {item.producto.nombre} (${item.producto.precio.toFixed(2)})</span>
                  <span className="ml-2">Total: ${item.total.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setDetallePedido(null)}
              className="bg-gray-500 text-white py-1 px-3 rounded"
            >
              Cerrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PedidoTable;
