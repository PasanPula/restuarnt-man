import React, { useState, useEffect, useRef } from 'react';
import { useUserContext } from '../../../context/UserContext/UserProvider';
import { FaSearch } from 'react-icons/fa';
import User from './Order';
import { useOrderContext } from '../../../context/OrderContext/OrderProvider';
import { fetchOrders } from '../../../api/api';
import NotFound from '../../NotFound/NotFound';
import Order from './Order';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

const Orders = () => {
  const [{ completedOrders }, orderDispatch] = useOrderContext();
  const [query, setQuery] = useState('');
  const [ordersHolder, setOrdersHolder] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
      (async () => {
        await fetchOrders(orderDispatch);
        setIsLoading(false); 
      })();
  }, []);

  useEffect(() => {
    setFilteredOrders(completedOrders);
  },[completedOrders])

  const filterOrders = (qry) => {
    if (!qry || qry === 0) {
      setFilteredOrders(completedOrders);
    } else {
      const filter = filteredOrders.filter((item) =>
        item.order_id.includes(query.toLowerCase())
      );
      setFilteredOrders(filter);
    }
  };

  const searchOrders = (e) => {
    setQuery(e.target.value);
    filterOrders(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex justify-center w-full p-2 mb-4 bg-white rounded-lg">
        <input
          className="w-full p-2 rounded-lg outline-none"
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
        {isLoading ? ( // Check if data is loading
          <>
            <Skeleton count={5} height={100} /> {/* Adjust count and height as needed */}
          </>
        ) : filteredOrders.length ? (
          filteredOrders.map((orderItem, index) => (
            <Order key={index} item={orderItem} />
          ))
        ) : (
          <NotFound text="No Orders Available" />
        )}
      </div>
    </div>
  );
};

export default Orders;
