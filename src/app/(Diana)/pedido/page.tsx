'use client';
import React, { useState, useEffect } from 'react';
import { UserIcon, SearchIcon } from 'lucide-react';

// Define interfaces for type safety
interface Usuario {
  id: number;
  nombre: string;
}

interface Pedido {
  nombre: string;
  pedidos: {
    fecha_registro: string;
     
  }[];
}

const PagePedido: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch('/api/usuarios');
        if (!res.ok) throw new Error('Error fetching usuarios');
        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        console.log(err)
        setError('No se pudieron cargar los usuarios',);
      }
    };
    fetchUsuarios();
  }, []);

  const handleSearchPedido = async () => {
    if (selectedUserId === null) {
      setError('Por favor selecciona un usuario');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/usuarios/${selectedUserId}`);
      if (!res.ok) throw new Error('No se pudo encontrar el pedido');
      
      const data = await res.json();
      setPedido(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setPedido(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Usuarios Sidebar */}
        <div className="bg-gray-100 p-4 border-b">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <UserIcon className="mr-2" /> Usuarios
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {usuarios.map((usuario) => (
              <button
                key={usuario.id}
                className={`px-3 py-2 rounded transition-colors ${
                  selectedUserId === usuario.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
                onClick={() => setSelectedUserId(usuario.id)}
              >
                {usuario.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Buscar Pedido */}
        <div className="p-4">
          <button
            onClick={handleSearchPedido}
            disabled={selectedUserId === null || isLoading}
            className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition-colors"
          >
            <SearchIcon className="mr-2" /> 
            {isLoading ? 'Buscando...' : 'Buscar Pedido'}
          </button>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
            {error}
          </div>
        )}

        {/* Pedido Details */}
        {pedido && (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3">{pedido.nombre}</h3>
            <div className="space-y-2">
              {pedido.pedidos.map((item, index) => (
                <div 
                  key={`${item.fecha_registro}-${index}`} 
                  className="bg-gray-50 p-3 rounded-md border"
                >
                  <p className="font-medium">Fecha Registro: {item.fecha_registro}</p>
                  {/* Puedes agregar más detalles del pedido aquí */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PagePedido;