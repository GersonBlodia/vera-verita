 
import { GETPEDIDO } from '../../../action/get-pedido';
import  PedidoTable  from '../../../components/tabla/PedidoTable';
import { actualizarEstadoPedido } from '../../../action/upda-pedido';
 
const PedidoPage = async() => {
  const pedidos =await GETPEDIDO()
  
  return (
    <div className='py-28'>
       <PedidoTable pedidos={pedidos} actualizarEstado={actualizarEstadoPedido} />
    </div>
  )
}

export default PedidoPage
