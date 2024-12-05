 
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany();
    return new NextResponse(JSON.stringify(usuarios), { status: 200 });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return new NextResponse(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
  }
}
