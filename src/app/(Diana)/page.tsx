// pages/home/HomePageDiana.tsx
import { GET_product } from "../../action/get-product"
import { MainProduct } from '../../components/main/mainProduct';
import { Cart } from '../../components/main/sidebarProduct';
 
const HomePageDiana = async () => {
  const products = await GET_product(); // Obtener productos desde la API
 
  return (
    <main className="w-[80%]  mx-auto py-36 flex">
      {/* Botón para abrir el sidebar */}
      
    
     
      {/* Lista de productos */}
      <MainProduct productos={products}/>
    
      {/* Carrito de compras (Sidebar) */}
      <Cart />
    </main>
  );
};

export default HomePageDiana;
