import { useState } from 'react';
import { MdCancel, MdCheck,MdDeleteForever } from 'react-icons/md';
import { useMenuContext } from '../../../context/MenuContext/MenuProvider';
import { deleteOrder, fetchOrders, updateSingleOrder } from '../../../api/api';
import { useOrderContext } from '../../../context/OrderContext/OrderProvider';
import { OrderStatus } from '../../../configs/Constants/Types';

const Order = ({item}) => {
  const [accepted, setAccepted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [{menuItems}] = useMenuContext()
  const [{orders},orderDispatch] = useOrderContext();

  const handleOrderStatus = async (status) => {

    console.log('auto triggers')
    const updateOrder ={
      "payment_method" : item.payment_method,
      "Status" : status,
      "items" : []
    }

    item.items.map((itm) => {
      let cpy  = {
        comment : itm.comment,
        item_id : itm.item_id._id,   
        qty : itm.qty,
        selectedOptions : [
       ]
      }

      itm.selectedOptions.forEach((optn) => {
       cpy.selectedOptions.push(optn._id)
      })

      updateOrder.items.push(cpy);
   });

   await updateSingleOrder(updateOrder,item._id)
   await fetchOrders(orderDispatch);
  };

  const handleDeleteOrder = async () => {
    await deleteOrder(item._id,"Order Deleted successfuly.");
    await fetchOrders(orderDispatch);
  };

    return (

      <div className={`w-full h-auto ${item.order_status ===  OrderStatus.PENDING ? ' bg-orange-800 ' : (item.order_status ===  OrderStatus.COMPLETED ? 'bg-slate-500 ' : 'bg-green-800 ')}-600 border rounded-lg border-orange-50 relative`}>
      <div className="flex flex-row items-center justify-center gap-1 p-5">
      <div className="flex flex-col items-center justify-center md:w-full md:flex-row md:justify-between">
             <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
             Order No: {item?.order_id || 'Order'}
            </h5>
            <span className="text-sm text-gray-300">{new Date(item?.updatedAt).toLocaleString('en-US')}</span>
            {/* <span className="text-sm text-gray-300">{item?.total}</span> */}
      </div>
      </div>
      {/* Customer Details (Processing Stage) */}
      {/* {item.order_status === 'processing' && (
        <div className="p-5 border-t border-gray-300">
          <h6 className="text-lg font-medium text-gray-900 dark:text-white">Customer Details:</h6>
          <div className="flex flex-col space-y-2">
            <p className="text-gray-900 ">
              <span className="font-semibold">Name:</span> {item.customer_name}
            </p>
            <p className="text-gray-900 ">
              <span className="font-semibold">Phone:</span> {item.customer_phone}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">Room Number:</span> {item.customer_room_no}
            </p>
          </div>
        </div>
      )} */}

      {/* Dishes Section */}
      <div className="p-5 border-t border-gray-300">
    <h6 className="mb-4 text-2xl font-bold text-white">Dishes:</h6>
    <ul className="ml-6 space-y-4">
      {item.items.map((dish) => (
        <li key={dish.item_id._id} className="py-2 border-b border-gray-400">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-2">
              <span className="text-lg font-semibold text-white">{dish.item_id.title}</span>
              <span className="ml-2 text-gray-300">({dish.qty} Items)</span>
            </div>
            <span className="text-lg text-gray-300">[DISH ID: {dish._id}]</span>
          </div>
          <div className='mt-2'>
          {dish.selectedOptions.length > 0 ? (
                          <div className="mt-2">
                            <span className="text-lg font-semibold text-white">Addons:</span>
                            <ul className="ml-4 space-y-1 text-white list-disc">
                              {dish.selectedOptions.map((addon, index) => (
                                <li key={index}>{addon.option}</li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <></>
                        )}
          </div>
          <div className="mt-2">
            <span className="text-lg font-semibold text-white">Instructions:</span>
            <br />
            <p className="text-gray-200">{dish.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>


      {/* Special Instructions */}
      {/* {item.special_instructions && (
        <div className="p-5">
          <h6 className="text-lg font-medium text-gray-900 dark:text-white">Special Instructions:</h6>
          <p>{item.special_instructions}</p>
        </div>
      )} */}
      {/* Items in Order Section */}
      {/* <div className="p-5">
        <h6 className="text-lg font-medium text-gray-900 dark:text-white">Bill Summery:</h6>
        <ul className="ml-6 list-disc">
          {item.items.map((dish) => (
            <li key={dish.item_id}>
              <span className="font-semibold">{dish.title}</span> (ID: {dish.item_id})
              <br />
              Quantity: {dish.quantity} - Total Price: {dish.total_price}
            </li>
          ))}
        </ul>
      </div> */}
      {/* Action Buttons */}
      <div className="flex flex-row items-center justify-between p-3">
        {item.order_status === OrderStatus.PENDING && (
          <>
            <button
              className="flex items-center px-3 py-1 text-lg text-white bg-green-600 rounded-md shadow-lg cursor-pointer hover:bg-green-700"
              title="Accept"
              onClick={() => handleOrderStatus(OrderStatus.PROCESSING)}
            >
              <MdCheck className="mr-1" /> Accept
            </button>
            <button
              className="flex items-center px-3 py-1 text-lg text-white bg-red-500 rounded-md shadow-lg cursor-pointer hover:bg-red-700"
              title="Reject"
              onClick={() =>handleOrderStatus(OrderStatus.CANCELLED)}
            >
              <MdCancel className="mr-1" /> Reject
            </button>
          </>
        )}
        {item.order_status === OrderStatus.PROCESSING && (
          <button
            className="flex items-center px-3 py-1 text-lg text-white bg-orange-600 rounded-md shadow-lg cursor-pointer hover:bg-green-700"
            title="Complete"
            onClick={ () => handleOrderStatus(OrderStatus.COMPLETED)}
          >
            <MdCheck className="mr-1" /> Complete
          </button>
        )}
        {item.order_status=== OrderStatus.COMPLETED && (
          <button
            className="flex items-center px-3 py-1 text-lg text-white bg-red-600 rounded-md shadow-lg cursor-pointer hover:bg-red-700"
            title="Delete"
            onClick={() => {
              handleDeleteOrder()
            }}
          >
            <MdDeleteForever className="mr-1" /> Delete
          </button>
        )}
      </div>
    </div>
  
      );
}

export default Order