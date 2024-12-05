// src/app/api/pedido/[id]/route.ts

import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

// No es necesario definir explícitamente el tipo de 'params'
export async function GET(req: Request, { params }) {
  try {
    const { id } = params;

    // Asegúrate de que el id es un número válido
    const pedido = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: {
        pedidos: true,
      },
    });

    if (!pedido) {
      return NextResponse.json({ message: 'Pedido no encontrado' }, { status: 404 });
    }

    return NextResponse.json(pedido, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el pedido:", error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
