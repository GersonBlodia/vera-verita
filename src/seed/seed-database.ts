 // Datos para productos

 
import prisma from "../lib/prisma";
import { productos } from "./seed-producto";
import { usuarios } from "./seed-usuario";

async function main() {
    // Limpiamos las tablas antes de insertar los datos nuevos
    await prisma.orderItem.deleteMany();
    await prisma.venta.deleteMany();
    await prisma.pedido.deleteMany();
    await prisma.producto.deleteMany();
    await prisma.usuario.deleteMany();
    
   

    // Crear Usuarios (si es necesario, ejemplo de usuarios)
   
    // Crear Productos (usa formProduct que ya has configurado)
   await prisma.usuario.createMany({
      data: usuarios
   })
    await prisma.producto.createMany({
        data: productos
    });

     
    // Crear Ventas (para asociarlas con Productos y Usuarios)
    

    // Crear Categorías (suponiendo que tienes `seedFormatCategory` bien definido)
   

    console.log('Seed ejecutado correctamente');
}

// Llamar la función principal
(() => {
    if (process.env.NODE_ENV === "production") return;
    main();  // Ejecutar la función de seed
})();
