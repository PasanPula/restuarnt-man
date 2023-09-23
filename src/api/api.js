import { MenuTypes } from "../configs/Constants/ActionTypes";
import Menu from '../configs/Data/Food.json'
import User from '../configs/Data/User.json'
import Orders from '../configs/Data/Orders.json'

export const fetchMenuData = async (dispatch) => {
    dispatch({
        type: MenuTypes.SET_MENU,
        menuItems: Menu,
    });
};

export const fetchOrderData = async () => {
    return Orders;
};

export const signInUser = async (data) => {
    try {
      console.log(data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return Promise.resolve(User);
    } catch (error) {
      return Promise.reject(error);
    }
};

export const signUpUser = async (data) => {
    try {
      console.log(data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return Promise.resolve(User);
    } catch (error) {
      return Promise.reject(error);
    }
};