import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import { useOrderContext } from '../../../context/OrderContext/OrderProvider';
import { deleteOrder,fetchOrders } from '../../../api/api';
import { getOrderPrice } from '../../../util/utilFunctions';

const Order = ({item}) => {

  const [{orders},orderDispatch] = useOrderContext();
  const handleDeleteOrder = async () => {
    await deleteOrder(item._id,"Order Deleted successfuly.");
    await fetchOrders(orderDispatch);
  };
    return (
      <div className="relative w-full h-auto border rounded-lg bg-slate-300 border-orange-50">
  <div className="flex flex-col items-center justify-center gap-5 p-5 md:flex-row md:justify-between">
    <div className="text-center md:text-left">
      <h5 className="mb-1 text-2xl font-bold text-black">Order No:</h5>
      <span className="mb-2 text-lg font-medium text-black">{item?.order_id || 'Order'}</span>
      <h3 className="mb-1 text-2xl font-bold text-black">Order Value:</h3>
      <span className="mb-2 text-lg font-medium text-black">{"Rs." + getOrderPrice(item) + ".00" || 'Order'}</span>
    </div>
    <span className="text-sm text-black">{new Date(item?.updatedAt).toLocaleString('en-US')}</span>
  </div>

  {/* Dishes Section */}
  <div className="p-5 border-t border-gray-300">
    <h6 className="mb-4 text-2xl font-bold text-gray-900">Dishes:</h6>
    <ul className="ml-6 space-y-4">
      {item.items.map((dish) => (
        <li key={dish.item_id._id} className="py-2 border-b border-gray-400">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-2">
              <span className="text-lg font-semibold">{dish.item_id.title}</span>
              <span className="ml-2 text-gray-600">({dish.qty} Items)</span>
            </div>
            <span className="text-lg text-gray-600">[DISH ID: {dish._id}]</span>
          </div>
          <div className="mt-2">
            <span className="text-lg font-semibold">Instructions:</span>
            <br />
            <p className="text-gray-800">{dish.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>

  {/* Action Buttons */}
  <div className="flex flex-row items-center justify-between p-3">
    <button
      className="flex items-center px-4 py-2 text-lg text-white bg-red-600 rounded-md shadow-lg cursor-pointer hover:bg-red-700"
      title="Delete"
      onClick={() => {
        handleDeleteOrder();
      }}
    >
      <MdDeleteForever className="mr-2" /> Delete
    </button>
  </div>
</div>
      );
}

export default Order