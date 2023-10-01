import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import od from "../../configs/Data/Orders.json";
import uod from "../../configs/Data/UOrder.json";
import { FiRefreshCw } from "react-icons/fi";
import { useCartContext } from "../../context/CartContext/CartProvider";
import { BiSolidPencil } from "react-icons/bi";
import OrderEditPopup from "../../components/OrderPage/OrderEditPopup";
import { useMenuContext } from "../../context/MenuContext/MenuProvider";
import { useNavigate } from "react-router-dom";
import { deleteOrder, fetchOrders, updateSingleOrder } from "../../api/api";
import Loader from "../../components/Loader/Loader";
import { useOrderContext } from "../../context/OrderContext/OrderProvider";
import NotFound from "../../components/NotFound/NotFound";
import Skeleton from "react-loading-skeleton";
import { OrderStatus } from "../../configs/Constants/Types";
import { getOrderPrice } from "../../util/utilFunctions";
import {
  MdOutlineCancel,MdSave
} from "react-icons/md";

const OrderStatusBadge = ({ status }) => {
  let badgeClass = "";

  switch (status) {
    case OrderStatus.PENDING:
      badgeClass = "bg-yellow-500";
      break;
    case OrderStatus.COMPLETED:
      badgeClass = "bg-green-500";
      break;
    case OrderStatus.PROCESSING:
      badgeClass = "bg-red-500";
      break;
    default:
      badgeClass = "bg-gray-500";
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
  const [{ menuItems }] = useMenuContext();
  const [{ orders }, orderDispatch] = useOrderContext();
  const navigate = useNavigate();
  const effectRan = useRef(false);
  const [showLoader, setShowLoader] = useState(true);
  const [updatedItemData, setUpdatedItemData] = useState([]);

  useEffect(() => {
    if (!menuItems) {
      navigate("/");
    }

    setShowLoader(true);

    if (effectRan.current === false) {
      (async () => {
        await fetchOrders(orderDispatch);
        setShowLoader(false);
      })();
      effectRan.current = true;
    }
  }, []);

  const handleEditOrder = (order) => {
    setEditingOrder(order.order_id);
    setCurrentOrder(order);
  };

  const handleSaveOrder = async () => {
    const updateOrder = {
      payment_method: currentOrder.payment_method,
      items: [],
    };

    let unchnagedItems = currentOrder.items.filter((oit) => {
      let cond = true;
      updatedItemData.forEach((upd) => {
        if (oit._id === upd._id) {
          cond = false;
        }
      });
      return cond;
    });

    unchnagedItems.map((itm) => {
      let cpy = {
        comment: itm.comment,
        menu_id: itm.menu_id,
        item_id: itm.item_id._id,
        qty: itm.qty,
        selectedOptions: [],
      };

      itm.selectedOptions.forEach((optn) => {
        cpy.selectedOptions.push(optn._id);
      });

      updateOrder.items.push(cpy);
    });

    updateOrder.items.push(...updatedItemData);
    await updateSingleOrder(updateOrder, currentOrder._id);
    await fetchOrders(orderDispatch);

    setEditingOrder(null);
  };

  const handleOrderItemEdit = (orderItem, order) => {
    setEditingOrderItem(orderItem);
    setShowCustomizePopup(true);
  };

  const handleCancelOrder = async (order) => {
    await deleteOrder(order._id, "Order Canceled successfuly.");
    await fetchOrders(orderDispatch);
  };

  const handleRefresh = async () => {
    await fetchOrders(orderDispatch);
  };

  return (
    <>
      {showCustomizePopup && (
        <OrderEditPopup
          orderItem={editingOrderItem}
          setUpdatedItemData={setUpdatedItemData}
          setShowCustomizePopup={setShowCustomizePopup}
        />
      )}
      <div className="container p-6 mx-auto">
        <div className="flex flex-row justify-between ">
          <h1 className="mb-6 text-2xl font-semibold">Your Orders</h1>
          <div className="flex items-center justify-between mb-4">
            <button
              className="flex flex-row items-center px-4 py-2 text-blue-500 border rounded-lg bg-btnColor hover:bg-blue-600 hover:text-white"
              onClick={handleRefresh}
            >
              <FiRefreshCw className="mr-2" /> Refresh
            </button>
          </div>
        </div>
        {showLoader ? (
          <motion.div
            className="p-6 border border-gray-300 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl font-semibold">
                <Skeleton width={100} height={20} />
              </div>
              <Skeleton width={80} height={20} />
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-600">
                Order Date: <Skeleton width={80} height={12} />
              </div>
              <div className="text-sm text-gray-600">
                Payment Method: <Skeleton width={80} height={12} />
              </div>
            </div>
            <div className="mb-4">
              <div className="text-lg font-semibold">Order Items:</div>
              <ul className="ml-6 list-disc">
                {/* Placeholder for order items */}
                <Skeleton count={3} width={150} height={12} />
              </ul>
            </div>
            <div className="mb-2 text-orange-500">
              <span role="img" aria-label="Warning Star">
                *
              </span>
              Edit Order will incur additional charges
            </div>
            <div className="flex flex-row justify-between">
              <motion.button
                className="px-4 py-2 text-gray-300 bg-gray-600 rounded-lg"
                disabled
              >
                <Skeleton width={60} height={20} />
              </motion.button>
              <motion.button
                className="px-4 py-2 text-white bg-orange-500 rounded-lg"
                disabled
              >
                <Skeleton width={60} height={20} />
              </motion.button>
              <motion.button
                className="px-4 py-2 text-white bg-red-500 rounded-lg"
                disabled
              >
                <Skeleton width={60} height={20} />
              </motion.button>
            </div>
          </motion.div>
        ) : orders.length > 0 ? (
          <div className="grid gap-6 ">
            {orders?.map((order) => {
             return(<motion.div
                key={order.order_id}
                className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xl font-semibold">
                    Order #{order.order_id}
                  </div>
                  <OrderStatusBadge status={order.order_status} />
                </div>
                <div className="mb-4">
                  {/* <div className="font-bold text-orange-600 text-md">Paid: Rs.{order.items.reduce((sum, item) => sum + item.totalValue, 0)}</div> */}
                  <div className="text-sm text-gray-600">
                    Order Date: {order.order_date}
                  </div>
                  <div className="text-sm text-gray-600">
                    Payment Method: {order.payment_method}
                  </div>
                  <div className="text-sm text-gray-600">
                    Amount: Rs.{getOrderPrice(order)}.00
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-lg font-semibold">Order Items:</div>
                  <ul className="ml-6 space-y-4">
                    {order.items.map((item) => (
                      <li
                        key={item.item_id._id}
                        className="py-2 border-b border-gray-300"
                      >
                        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                          <div className="flex items-center">
                            <span className="text-xl font-semibold">
                              {item.item_id?.title}
                            </span>
                            <span className="ml-2 text-gray-600">
                              (Qty: {item.qty})
                            </span>
                          </div>
                          {editingOrder === order.order_id && (
                            <button
                              className="flex items-center justify-center w-8 h-8 ml-3 text-sm bg-green-600 rounded-lg text-gray-50"
                              onClick={() => handleOrderItemEdit(item, order)}
                            >
                              <BiSolidPencil />
                            </button>
                          )}
                        </div>
                        {item.selectedOptions.length > 0 ? (
                          <div className="mt-2">
                            <span className="font-semibold">Addons:</span>
                            <ul className="ml-4 space-y-1 list-disc">
                              {item.selectedOptions.map((addon, index) => (
                                <li key={index}>{addon.option}</li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <></>
                        )}
                        {item.comment && (
                          <div className="mt-2">
                            <span className="font-semibold">Comment:</span>{" "}
                            {item.comment}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {order.order_status.toLowerCase() === "pending" && (
                  <div className="mb-2 text-orange-500">
                    <span role="img" aria-label="Warning Star">
                      *
                    </span>
                    Edit Order will incur additional charges
                  </div>
                )}
                <div className="flex flex-row justify-between">
                  {editingOrder === order.order_id ? (
                    <motion.button
                      className={`px-4 py-2 ${
                        updatedItemData.length === 0
                          ? "bg-btnColor hover:bg-gray-600 text-gray-300"
                          : "text-green-500 bg-btnColor hover:bg-green-600 hover:text-white border"
                      } rounded-lg flex flex-row items-center justify-center gap-1 `}
                      onClick={handleSaveOrder}
                      disabled={updatedItemData.length === 0 ? true : false}
                    >
                     <MdSave/> Save Order
                    </motion.button>
                  ) : (
                    order.order_status.toLowerCase() === "pending" && (
                      <motion.button
                        className="flex flex-row items-center justify-center gap-1 px-4 py-2 text-orange-500 border rounded-lg bg-btnColor hover:bg-orange-600 hover:text-white"
                        onClick={() => handleEditOrder(order)}
                      >
                       <BiSolidPencil/>  Edit Order
                      </motion.button>
                    )
                  )}

                  {order.order_status.toLowerCase() === "pending" && (
                    <motion.button
                      className="flex flex-row items-center justify-center gap-1 px-4 py-2 text-red-500 border rounded-lg bg-btnColor hover:bg-red-600 hover:text-white "
                      onClick={() => handleCancelOrder(order)}
                    >
                     <MdOutlineCancel />  Cancel Order
                    </motion.button>
                  )}
                </div>
              </motion.div>)
            })}
          </div>
        ) : (
          <NotFound text={"No Orders Available"} />
        )}
      </div>{" "}
    </>
  );
};

export default Orders;
