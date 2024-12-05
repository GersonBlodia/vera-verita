// src/app/api/usuarios/[id]/route.ts
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string | undefined } }) {
    try {
      const { id } = params;
  
      if (!id) {
        return NextResponse.json({ message: 'ID no proporcionado' }, { status: 400 });
      }
  
      const pedido = await prisma.usuario.findUnique({
        where: { id: Number(id) },
        include: { pedidos: true },
      });
  
      if (!pedido) {
        return NextResponse.json({ message: 'Pedido no encontrado' }, { status: 404 });
      }
  
      return NextResponse.json(pedido, { status: 200 });
    } catch (error) {
        console.log(error)
      return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
  }
  