// pages/api/products.ts

import prisma from "../lib/prisma";

 
 
  // Asegúrate de que la ruta de prisma sea correcta

// Action para obtener los productos
export const GET_product = async () => {
  try {
    // Consulta para obtener todos los productos
    const productos = await prisma.producto.findMany();
    return productos;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw new Error('No se pudieron obtener los productos');
  }
};