import { MenuTypes, OrderTypes } from "../configs/Constants/ActionTypes";
import Menu from '../configs/Data/Food.json'
import User from '../configs/Data/User.json'
import Orders from '../configs/Data/Orders.json'
import { BASE_URL } from "../configs/Constants/Env";
import axios from "axios";
import { MENU_LISt, ORDERS } from "../configs/Constants/Env";
import { OrderFilter, toastError, toastSucess } from "../util/utilFunctions";
import { toast } from "react-toastify";
import OrderReducer from "../context/OrderContext/OrderReducer";
import { OrderStatus } from "../configs/Constants/Types";

export const psot = async (me) => {
  const response = await axios.get(BASE_URL,me)
  return response.data
}

export const fetchMenuData = async (dispatch) => {
    await axios.get(BASE_URL+MENU_LISt).then((data) => {
        let reposnseData = data.data;
        if(reposnseData.success){
            dispatch({
                type: MenuTypes.SET_MENU,
                menuItems: reposnseData.data,
            });
        } else {
            toastError('Failed to Fetch Menu','apifail')
        }
    }).catch((error) => {
        toastError(error,'apifail')
    }) 
};

export const addMenuItem = async (dish) => {
    await axios.post(BASE_URL+MENU_LISt,dish).then((data) => {
        toastSucess('sucess','apiSucess');
        return true;
    }).catch((error) => {
        toastError(error,'apifail')
    }) 
};

export const placeOrder = async (order) => {
    await axios.post(BASE_URL+ORDERS,order).then((data) => {
        let reposnseData = data.data;
        if(reposnseData.success){
            toastSucess( "Order completed successfuly with payment. Thank you for your patronage.",'apiSucess')
        }else {
            toastError('Order Failed! Try Again Later','apifail')
        }
    }).catch((error) => {
        toastError(error,'apifail')
    }) 
};

export const fetchOrders = async (orderDispatch) => {
    await axios.get(BASE_URL+ORDERS).then((data) => {
        let reposnseData = data.data;
        if(reposnseData.success){
            const orderData = reposnseData.data;
                orderDispatch({
                    type: OrderTypes.SET_ORDERS,
                    orders: orderData,
                });

              const completedArr = OrderFilter(orderData,OrderStatus.COMPLETED);
              orderDispatch({
                type: OrderTypes.SET_COMPLETED_ORDERS,
                completedOrders: completedArr,
              });
      
              const pendingArr = OrderFilter(orderData,OrderStatus.PENDING);
              orderDispatch({
                type: OrderTypes.SET_PENDING_ORDERS,
                pendingOrders: pendingArr,
              });
      
              const processArr = OrderFilter(orderData,OrderStatus.PROCESSING);
              orderDispatch({
                type: OrderTypes.SET_PRCOESSING_ORDERS,
                processingOrders: processArr,
              });
        }else {
            toastError('Orders Fetech Failed! Try Again Later','apifail');
        }
    }).catch((error) => {
        toastError(error,'apifail')
    }) 
};


export const updateSingleOrder = async (order,orderId) => {
    await axios.put(BASE_URL+ORDERS+'/'+orderId,order).then((data) => {
        let reposnseData = data.data;
        console.log(reposnseData)
        if(reposnseData.success){
            toastSucess( "Order updated successfuly.",'apiSucess')
        }else {
            toastError('Order Failed! Try Again Later','apifail')
        }
    }).catch((error) => {
        toastError(error,'apifail')
    }) 
};

export const cancelOrder = async (orderId) => {
    await axios.delete(BASE_URL+ORDERS+'/'+orderId).then((data) => {
        let reposnseData = data.data;
        if(reposnseData.success){
            toastSucess( "Order Canceled successfuly.",'apiSucess')
        }else {
            toastError('Order Failed! Try Again Later','apifail')
        }
    }).catch((error) => {
        toastError(error,'apifail')
    }) 
};


// export const fetchOrderData = async () => {
//     return Orders;
// };

// export const signInUser = async (data) => {
//     try {
//       console.log(data);
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       return Promise.resolve(User);
//     } catch (error) {
//       return Promise.reject(error);
//     }
// };

// export const signUpUser = async (data) => {
//     try {
//       console.log(data);
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       return Promise.resolve(User);
//     } catch (error) {
//       return Promise.reject(error);
//     }
// };