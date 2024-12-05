import { Producto } from "@prisma/client";
 
import Image from "next/image";

// Individual Product Card Component
export const ProductCard: React.FC<{ 
    producto: Producto, 
    onAddToCart: () => void 
  }> = ({ producto, onAddToCart }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
      <div className="relative w-full h-48">
        <Image
          src={producto.img}
          alt={producto.nombre}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{producto.nombre}</h2>
        <p className="text-sm text-gray-500 mb-2">{producto.tipo_producto}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-green-600">${producto.precio.toFixed(2)}</span>
          <span className="text-sm text-gray-400">
            {producto.cantidad_disponible} disponibles
          </span>
        </div>
        <button 
          onClick={onAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Agregar platillo
        </button>
      </div>
    </div>
  );
  