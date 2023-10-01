import { useState,useEffect } from 'react'
import { useUserContext } from '../../../context/UserContext/UserProvider';
import { FaSearch } from "react-icons/fa";
import { useOrderContext } from '../../../context/OrderContext/OrderProvider';
import { KitchenPages } from '../../../configs/Constants/Pages';
import Order from './Order';
import NotFound from '../../NotFound/NotFound';

const OrdersList = ({page}) => {
    // const [{ users }, userDispatch] = useUserContext();
    const [{orders,pendingOrders,processingOrders,completedOrders},orderDispatch] = useOrderContext()
    const [query, setQuery] = useState("");
    const [ordersHolder, setordersHolder] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
      setOrder();
    }, [page,pendingOrders,processingOrders,completedOrders])
    
    const setOrder  = () => {
      switch (page) {
        case KitchenPages.PENDING:
          setFilteredOrders(pendingOrders)
          setordersHolder(pendingOrders)
          break;
        case KitchenPages.PROCESSING:
          setFilteredOrders(processingOrders)
          setordersHolder(processingOrders)
          break;
        case KitchenPages.COMPLETED:
          setFilteredOrders(completedOrders)
          setordersHolder(completedOrders)
          break;
      default:
        setFilteredOrders(pendingOrders)
        setordersHolder(pendingOrders)
      }
    }

    const filterOrders = (qry) => {
        if(!qry || qry === 0) {
          setFilteredOrders(ordersHolder)
        }else{
          const filter = filteredOrders.filter((item) => item.order_id.includes(query.toLowerCase()));
          setFilteredOrders(filter);
        }
    }

    const searchOrders = (e) => {
        setQuery(e.target.value);
        filterOrders(e.target.value);
    }

  return (
    // Render Order List for Kitchen page
    <div className="flex flex-col justify-center w-full">
    <div className="flex justify-center w-full p-2 mb-4 bg-white rounded-lg">
      <input
        className="w-full p-2 rounded-lg outline-none "
        type="text"
        placeholder="Search Order ID"
        value={query}
        onChange={(e) => searchOrders(e)}
      />
      <button className="flex items-center justify-center gap-3 px-4 py-2 font-bold rounded-lg text-primeGold">
        <FaSearch />
      </button>
    </div>
    <div className="grid w-full grid-cols-1 gap-1">
  {filteredOrders.length ? (
    filteredOrders.map((orderItem, index) => (
      // Renders indvidual order -> Kitchen -> OrderList -> Order.jsx
      <Order key={index} item={orderItem} />
    ))
  ) : (
    <NotFound text="No Orders Available" />
  )}
</div>
  </div>
  )
}

export default OrdersList