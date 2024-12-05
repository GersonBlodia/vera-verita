import { Pedido } from "@prisma/client";

 
  // interfaces/index.ts (o el archivo donde tienes la interfaz Producto)
export interface Producto {
    id: number;
    nombre: string;
    cantidad_disponible: number;
    precio: number;
    img: string;
    tipo_producto: string;
    pedidoId: number | null; // Cambia undefined a null
  }
  
  export interface Usuario {
    id: number;
    nombre: string;
     
    pedidos?: Pedido[];  // Relación con los pedidos
    Venta?: Venta[];     // Relación con las ventas
  }
  export interface Venta {
  id: number;
  usuario_id: number;
  producto_id: number;
  cantidad: number;
  total: number;
  fecha: string;  // Fecha en formato string (se puede convertir a Date)
  img: string;    // Imagen asociada a la venta (como un recibo)
  usuario: Usuario; // Relación con el usuario
  producto: Producto; // Relación con el producto
}
