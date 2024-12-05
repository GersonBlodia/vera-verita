"use server"

import prisma from "../lib/prisma";

// Action para obtener los productos
// action/get-pedido.ts
 
export const GETPEDIDO = async () => {
  try {
    // Obtener pedidos con los productos asociados (relacionados con OrderItems)
    const pedidos = await prisma.pedido.findMany({
      include: {
        usuario: true,
        orderItems: {
          include: {
            producto: true, // Cargar los productos relacionados
          },
        },
      },
    });
    return pedidos;
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    throw new Error("No se pudieron obtener los pedidos");
  }
};
