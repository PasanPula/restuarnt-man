import { useState } from 'react';
import { MdCancel, MdCheck,MdDeleteForever } from 'react-icons/md';
import { useMenuContext } from '../../../context/MenuContext/MenuProvider';
import { fetchOrders } from '../../../api/api';
import { useOrderContext } from '../../../context/OrderContext/OrderProvider';

const Order = ({item}) => {
  const [accepted, setAccepted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [{menuItems}] = useMenuContext()
  const [{orders},orderDispatch] = useOrderContext();

  const handleAcceptClick = async () => {
    // item.order_status = 'CONFIRMED'
    // await updateOrder(item);
    // await fetchOrders(orderDispatch);
    // setAccepted(true);
  };

  const handleCompleteClick = () => {
    setCompleted(true);
  };

    return (

      <div className={`w-full h-auto bg-${item.order_status.toLowerCase() === 'pending' ? 'orange' : (item.order_status.toLowerCase() === 'completed' ? ' bg-slate-500 ' : 'green')}-600 border rounded-lg border-orange-50 relative`}>
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
        <h6 className="text-lg font-medium text-gray-900 dark:text-white">Dishes:</h6>
        <ul className="ml-6 list-disc">
          {item.items.map((dish) => {
            return (<li key={dish.item_id._id}>
              [DISH ID: {dish.menu_id}] - <span className="font-semibold">{dish.item_id.title}</span> - {dish.qty} Items
              <br />
              {/* <span className='font-semibold ' > Add Ons: </span> 
              <ul className="ml-8 list-disc">
                {dish.item_id.customize.map((adn) => {
                  return (
                    <li key={adn.option_id}>
                        {adn.option} - Rs.{adn.price}
                    </li>
                 )
                }) }
                </ul> */}
                <span className='font-semibold ' >  Instructions: </span><br/>
                {dish.comment}
            </li>)}
          )}
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
        {item.order_status.toLowerCase() === 'pending' && !accepted && (
          <>
            <button
              className="flex items-center px-3 py-1 text-lg text-white bg-green-600 rounded-md shadow-lg cursor-pointer hover:bg-green-700"
              title="Accept"
              onClick={handleAcceptClick}
            >
              <MdCheck className="mr-1" /> Accept
            </button>
            <button
              className="flex items-center px-3 py-1 text-lg text-white bg-red-600 rounded-md shadow-lg cursor-pointer hover:bg-red-700"
              title="Reject"
            >
              <MdCancel className="mr-1" /> Reject
            </button>
          </>
        )}
        {item.order_status.toLowerCase() === 'processing' && !completed && (
          <button
            className="flex items-center px-3 py-1 text-lg text-white bg-orange-600 rounded-md shadow-lg cursor-pointer hover:bg-green-700"
            title="Complete"
            onClick={handleCompleteClick}
          >
            <MdCheck className="mr-1" /> Complete
          </button>
        )}
        {item.order_status.toLowerCase() === 'completed' && (
          <button
            className="flex items-center px-3 py-1 text-lg text-white bg-red-600 rounded-md shadow-lg cursor-pointer hover:bg-red-700"
            title="Delete"
          >
            <MdDeleteForever className="mr-1" /> Delete
          </button>
        )}
      </div>
    </div>
  
      );
}

export default Order