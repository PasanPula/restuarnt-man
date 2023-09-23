import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import od from '../../configs/Data/Orders.json'
import uod from '../../configs/Data/UOrder.json'
import { FiRefreshCw } from 'react-icons/fi';
import { useCartContext } from '../../context/CartContext/CartProvider';
import { BiSolidPencil } from "react-icons/bi";
import OrderEditPopup from '../../components/OrderPage/OrderEditPopup';
import { useMenuContext } from '../../context/MenuContext/MenuProvider';
import { useNavigate } from 'react-router-dom';
import { cancelOrder, fetchOrders, updateSingleOrder } from '../../api/api';
import Loader from '../../components/Loader/Loader';
import { useOrderContext } from '../../context/OrderContext/OrderProvider';

const OrderStatusBadge = ({ status }) => {
  let badgeClass = '';

  switch (status) {
    case 'pending':
      badgeClass = 'bg-yellow-500';
      break;
    case 'completed':
      badgeClass = 'bg-green-500';
      break;
    case 'processing':
      badgeClass = 'bg-red-500';
      break;
    default:
      badgeClass = 'bg-gray-500';
      break;
  }

  return (
    <motion.span
      className={`rounded-full px-4 py-1 text-white ${badgeClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {status}
    </motion.span>
  );
};

const Orders = () => {
  // const [orders, setOrders] = useState(uod);
  const [totalPaid, setTotalPaid] = useState(uod);
  const [editingOrder, setEditingOrder] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [editingOrderItem, setEditingOrderItem] = useState(null);
  const [showCustomizePopup, setShowCustomizePopup] = useState(false);
  const [{menuItems}] = useMenuContext();
  const [{orders}, orderDispatch] = useOrderContext();
  const navigate = useNavigate();
  const effectRan = useRef(false);
  const [showLoader,setShowLoader] = useState(true);
  const [updatedItemData, setUpdatedItemData] = useState([]);

  useEffect(() => {
    if(!menuItems){
      navigate('/')
    }

     setShowLoader(true);

    if(effectRan.current === false){
      (async () => {
        await fetchOrders(orderDispatch);
        setShowLoader(false);
      })()
      effectRan.current = true;
    }
  }, [])
  

  const handleEditOrder = (order) => {
    setEditingOrder(order.order_id);
    setCurrentOrder(order);
  };

  const handleSaveOrder = async () => {

    const updateOrder ={
      "payment_method" : currentOrder.payment_method,
      "items" : []
    }

    let unchnagedItems = currentOrder.items.filter((oit)=>{
        let cond = true;
         updatedItemData.forEach((upd) => {
           if(oit._id === upd._id){
              cond=false
           }
         })
        return cond;
    })
    
    unchnagedItems.map((itm) => {
       let cpy  = {
         comment : itm.comment,
         menu_id : itm.menu_id,
         item_id : itm.item_id._id,   
         qty : itm.qty,
         selectedOptions : [
        ]
       }

       itm.selectedOptions.forEach((optn) => {
        cpy.selectedOptions.push(optn._id)
       })

       updateOrder.items.push(cpy);
    })

    updateOrder.items.push(...updatedItemData)
    await updateSingleOrder(updateOrder,currentOrder._id)
    await fetchOrders(orderDispatch);

    setEditingOrder(null); 
  };

  const handleOrderItemEdit = (orderItem,order) => {
    setEditingOrderItem(orderItem)
    setShowCustomizePopup(true);
  }

  const handleCancelOrder = async (order) =>{
    await cancelOrder(order._id);
    await fetchOrders(orderDispatch);
  }

  return (
    <>
    { showLoader ? <Loader progress = {"Fetching Orders....."} />  : (
      <>
    { showCustomizePopup && <OrderEditPopup orderItem={editingOrderItem} setUpdatedItemData={setUpdatedItemData} setShowCustomizePopup={setShowCustomizePopup} /> }
    <div className="container p-6 mx-auto">
    <div className='flex flex-row justify-between '>
    <h1 className="mb-6 text-2xl font-semibold">Your Orders</h1>
    <div className="flex items-center justify-between mb-4">
        <button
          className="flex flex-row items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 "
        //   onClick={handleRefresh}
        >
          <FiRefreshCw className="mr-2" /> Refresh
        </button>
      </div>
    </div>
    <div className="grid gap-6">
      {orders?.map((order) => (
        <motion.div
          key={order.order_id}
          className="p-6 border border-gray-300 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-semibold">Order #{order.order_id}</div>
            <OrderStatusBadge status={order.order_status} />
          </div>
          <div className="mb-4">
            {/* <div className="font-bold text-orange-600 text-md">Paid: Rs.{order.items.reduce((sum, item) => sum + item.totalValue, 0)}</div> */}
            <div className="text-sm text-gray-600">Order Date: {order.order_date}</div>
            <div className="text-sm text-gray-600">Payment Method: {order.payment_method}</div>
          </div>
          <div className="mb-4">
            <div className="text-lg font-semibold">Order Items:</div>
            <ul className="ml-6 list-disc">
              {order.items.map((item) => {

                // let menuItem = menuItems.find((mi) => {
                //   return mi.id === item.menu_id
                // });

                return (<li key={item.item_id._id}>
                  <div className='flex flex-row mt-3'>
                  {item.item_id?.title} (Qty: {item.qty})
                  {editingOrder === order.order_id ? (
                      <button className="flex items-center justify-center w-6 h-6 ml-3 text-sm bg-green-600 rounded-lg text-gray-50 " onClick={() =>handleOrderItemEdit(item,order)}>
                         <BiSolidPencil />
                      </button>
                    ) : null}
                    </div>
                </li>)
              })}
            </ul>
          </div>
          {order.order_status.toLowerCase() === 'pending' && (
              <div className="mb-2 text-orange-500">
                <span role="img" aria-label="Warning Star">
                  *
                </span>
                Edit Order will incur additional charges
              </div>
            )}
          <div className='flex flex-row justify-between' >
          {editingOrder === order.order_id ? (
              <motion.button
                className={`px-4 py-2 ${updatedItemData.length === 0 ? 'bg-gray-600 hover:bg-gray-600 text-gray-300' : 'text-white bg-green-500 hover:bg-green-600'} rounded-lg `}
                onClick={handleSaveOrder}
                disabled={ updatedItemData.length === 0 ? true : false}
              >
                Save Order
              </motion.button>
            ) : (
              order.order_status.toLowerCase() === 'pending' && (
                <motion.button
                  className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                  onClick={() => handleEditOrder(order)}
                >
                  Edit Order
                </motion.button>
              )
            )}

            {order.order_status.toLowerCase() === 'pending' && (
              <motion.button
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              onClick={() => handleCancelOrder(order)}
            >
              Cancel Order
            </motion.button>
            )}
            </div>
        </motion.div>
      ))}
    </div>
  </div> </> ) }
  </>
  );
};

export default Orders;
