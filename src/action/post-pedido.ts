"use server"
// src/action/post-pedido.ts
import prisma from "../lib/prisma";

interface ProductoCarrito {
  id: number;        // ID del producto
  cantidad: number;  // Cantidad del producto
}

interface CrearPedidoProps {
  nombreCliente: string;           // Nombre del cliente (usuario)
  productosCarrito: ProductoCarrito[]; // Array de productos en el carrito
  fechaEntrega: Date;              // Fecha en la que se debe entregar el pedido
}

// Función para crear un pedido
export const crearPedido = async ({
  nombreCliente,
  productosCarrito,
  fechaEntrega,
}: CrearPedidoProps) => {
  try {
    // Validar que los datos no sean nulos o vacíos
    if (!nombreCliente || !productosCarrito || productosCarrito.length === 0 || !fechaEntrega) {
      throw new Error("Los datos del pedido son inválidos.");
    }

    // Verificar si el cliente ya existe en la base de datos
    let usuario = await prisma.usuario.findUnique({
      where: { nombre: nombreCliente },
    });

    if (!usuario) {
      // Si el usuario no existe, crear uno nuevo
      usuario = await prisma.usuario.create({
        data: {
          nombre: nombreCliente,
        },
      });
    }

    // Crear el pedido
    const nuevoPedido = await prisma.pedido.create({
      data: {
        usuario_id: usuario.id,
        estado: "pendiente",  // Estado inicial del pedido
        fecha_entrega: fechaEntrega,
      },
    });

    // Crear los OrderItems (productos del carrito)
    const orderItems = await prisma.orderItem.createMany({
      data: productosCarrito.map((producto) => ({
        producto_id: producto.id,
        cantidad: producto.cantidad,
        pedido_id: nuevoPedido.id,
        total: producto.cantidad * 100, // Ajustar según el precio real
      })),
    });
    console.log(orderItems)
    // Retornar el nuevo pedido con los orderItems
    return nuevoPedido;

  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw new Error("No se pudo crear el pedido.");
  }
};
