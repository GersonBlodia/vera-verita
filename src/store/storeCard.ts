// src/store/cartStore.ts
import {create} from 'zustand';
import { Producto } from '@/interfaces';

// Tipo de estado del carrito
interface CartState {
  carrito: { producto: Producto; cantidad: number }[];
  total: number;
  isSidebarOpen: boolean;
  agregarAlCarrito: (producto: Producto, cantidad: number) => void;
  eliminarDelCarrito: (productoId: number) => void;
  confirmarPedido: () => void;
  disminuirStock: (productoId: number, cantidad: number) => void;
  toggleSidebar: () => void;
}

// Crear el store usando Zustand
export const useCartStore = create<CartState>((set) => ({
  carrito: [],
  total: 0,
  isSidebarOpen: false,

  agregarAlCarrito: (producto, cantidad) => {
    set((state) => {
      // Verificar si el producto ya existe en el carrito
      const productoExistente = state.carrito.find(
        (item) => item.producto.id === producto.id
      );

      if (productoExistente) {
        const cantidadTotal = productoExistente.cantidad + cantidad;
        if (cantidadTotal <= producto.cantidad_disponible) {
          productoExistente.cantidad += cantidad;
        }
      } else {
        state.carrito.push({ producto, cantidad });
      }

      // Recalcular total
      const total = state.carrito.reduce(
        (sum, item) => sum + item.producto.precio * item.cantidad,
        0
      );

      return { carrito: [...state.carrito], total };
    });
  },

  eliminarDelCarrito: (productoId) => {
    set((state) => {
      const carritoActualizado = state.carrito.filter(
        (item) => item.producto.id !== productoId
      );
      const total = carritoActualizado.reduce(
        (sum, item) => sum + item.producto.precio * item.cantidad,
        0
      );
      return { carrito: carritoActualizado, total };
    });
  },

  confirmarPedido: () => {
    set((state) => {
      state.carrito.forEach((item) => {
        // Disminuir el stock en la base de datos (lo harás en la API)
        console.log(item)
      });
      return { carrito: [], total: 0 };
    });
  },

  disminuirStock: (productoId, cantidad) => {
    set((state) => {
      const producto = state.carrito.find((item) => item.producto.id === productoId);
      if (producto && producto.cantidad >= cantidad) {
        producto.cantidad -= cantidad;
      }
      return { carrito: [...state.carrito] };
    });
  },

  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
  },
}));
