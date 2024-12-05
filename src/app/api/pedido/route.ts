// src/app/api/pedido/route.ts
 
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { OrderItem, Producto } from "@prisma/client";
interface Props {
  OrderItem: OrderItem,
  producto: Producto
}
interface Data {
    Data:Props
}
// Manejo de la solicitud POST
// Manejo de la solicitud POST
export async function POST(req: Request) {
  try {
    const { nombreCliente, productosCarrito } = await req.json(); // Obtén los datos del cuerpo de la solicitud

    // Verificar que el nombre y los productos estén presentes
    if (!nombreCliente || productosCarrito.length === 0) {
      return NextResponse.json({ message: 'El nombre del cliente y productos son requeridos.' }, {
        status: 400,
      });
    }

    // Crear o encontrar el usuario en la base de datos
    let usuario = await prisma.usuario.findUnique({
      where: { nombre: nombreCliente },
    });

    if (!usuario) {
      // Si el usuario no existe, crearlo
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
        estado: 'pendiente',
        fecha_entrega: new Date(), // Fecha de entrega por defecto
      },
    });

    // Crear los orderItems (productos del carrito)
    const orderItems = productosCarrito.map((producto:Data) => ({
      cantidad: producto.Data.OrderItem.cantidad,
      total: producto.Data.OrderItem.cantidad * producto.Data.producto.precio, // Total de este producto
      producto_id: producto.Data.producto.id,
      pedido_id: nuevoPedido.id,
    }));

    // Insertar los productos en la tabla OrderItem
    await prisma.orderItem.createMany({
      data: orderItems,
    });

    // Actualizar el stock de los productos
    for (const producto of productosCarrito) {
      await prisma.producto.update({
        where: { id: producto.producto.id },
        data: {
          cantidad_disponible: {
            decrement: producto.cantidad, // Decrementar la cantidad disponible
          },
        },
      });
    }

    // Respuesta exitosa
    return NextResponse.json({ message: 'Pedido creado exitosamente!', nombreCliente }, {
      status: 200,
    });

  } catch (error) {
    console.error("Error al procesar el pedido:", error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, {
      status: 500,
    });
  }
}