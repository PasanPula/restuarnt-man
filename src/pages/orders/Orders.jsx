import React, { useState } from 'react';
import { motion } from 'framer-motion';
import od from '../../configs/Data/Orders.json'
import uod from '../../configs/Data/UOrder.json'
import { FiRefreshCw } from 'react-icons/fi';
import { useCartContext } from '../../context/CartContext/CartProvider';
import { BiSolidPencil } from "react-icons/bi";
import OrderEditPopup from '../../components/OrderPage/OrderEditPopup';
import { useMenuContext } from '../../context/MenuContext/MenuProvider';

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
  const [orders, setOrders] = useState(uod);
  const [totalPaid, setTotalPaid] = useState(uod);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingOrderItem, setEditingOrderItem] = useState(null);
  const [showCustomizePopup, setShowCustomizePopup] = useState(false);
  const [{menuItems}] = useMenuContext();

  const handleEditOrder = (orderId) => {
    setEditingOrder(orderId);
  };

  const handleSaveOrder = () => {
    setEditingOrder(null); // Disable edit mode
    // Add logic to save the order here
  };

  const handleOrderItemEdit = (orderItem) => {
    setEditingOrderItem(orderItem)
    setShowCustomizePopup(true);
  }

  return (
    <>
    { showCustomizePopup && <OrderEditPopup orderItem={editingOrderItem} setShowCustomizePopup={setShowCustomizePopup} /> }
    <div className="container mx-auto p-6">
    <div className=' flex flex-row justify-between '>
    <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>
    <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 flex flex-row items-center "
        //   onClick={handleRefresh}
        >
          <FiRefreshCw className="mr-2" /> Refresh
        </button>
      </div>
    </div>
    <div className="grid gap-6">
      {orders.map((order) => (
        <motion.div
          key={order.order_id}
          className="p-6 border border-gray-300 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-semibold">Order #{order.order_id}</div>
            <OrderStatusBadge status={order.order_status} />
          </div>
          <div className="mb-4">
            <div className="text-orange-600 text-md font-bold">Paid: Rs.{order.items.reduce((sum, item) => sum + item.totalValue, 0)}</div>
            <div className="text-gray-600 text-sm">Order Date: {order.order_date}</div>
            <div className="text-gray-600 text-sm">Payment Method: {order.payment_method}</div>
          </div>
          <div className="mb-4">
            <div className="text-lg font-semibold">Order Items:</div>
            <ul className="list-disc ml-6">
              {order.items.map((item) => {

                let menuItem = menuItems.find((mi) => {
                  return mi.id === item.menu_id
                });

                return (<li key={item.item_id}>
                  <div className='flex flex-row mt-3'>
                  {menuItem.title} (Qty: {item.qty})
                  {editingOrder === order.order_id ? (
                      <button className="flex items-center justify-center w-6 h-6 text-sm rounded-lg text-gray-50 bg-green-600 ml-3 " onClick={() =>handleOrderItemEdit(item)}>
                         <BiSolidPencil />
                      </button>
                    ) : null}
                    </div>
                </li>)
              })}
            </ul>
          </div>
          {order.order_status === 'pending' && (
              <div className="mb-2 text-orange-500">
                <span role="img" aria-label="Warning Star">
                  *
                </span>
                Edit Order will incur additional charges
              </div>
            )}
          {editingOrder === order.order_id ? (
              <motion.button
                className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
                onClick={handleSaveOrder}
              >
                Save Order
              </motion.button>
            ) : (
              order.order_status === 'pending' && (
                <motion.button
                  className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600"
                  onClick={() => handleEditOrder(order.order_id)}
                >
                  Edit Order
                </motion.button>
              )
            )}
        </motion.div>
      ))}
    </div>
  </div>
  </>
  );
};

export default Orders;
