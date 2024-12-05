"use server"
// action/actualizarEstado.ts
import prisma from '../lib/prisma';
export const actualizarEstadoPedido = async (pedidoId: number) => {
  try {
    const pedido = await prisma.pedido.update({
      where: { id: pedidoId },
      data: {
        estado: 'despachado', // Cambiar el estado a "despachado"
      },
    });
    return pedido;
  } catch (error) {
    console.error('Error al actualizar el estado del pedido:', error);
    throw new Error('No se pudo actualizar el estado del pedido');
  }
};
