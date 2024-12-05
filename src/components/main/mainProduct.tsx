"use client"
// components/main/MainProduct.tsx

 
 
import { useCartStore } from '../../store/storeCard';
import { ProductCard } from './productCard';
export interface Producto {
  id: number;
  nombre: string;
  cantidad_disponible: number;
  precio: number;
  img: string;
  tipo_producto: string;
  
}
interface MainProductProps {
  productos: Producto[];
}

export const MainProduct = ({ productos }: MainProductProps) => {
    const { agregarAlCarrito } = useCartStore();

    const handleAddToCart = (producto: Producto, cantidad: number) => {
      agregarAlCarrito(producto, cantidad);
    };
  return (
    <div className="flex-1  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {productos.map((producto) => (
      <ProductCard 
        key={producto.id} 
        producto={producto} 
        onAddToCart={() => handleAddToCart(producto, 1)}
      />
    ))}
  </div>
  );
};
