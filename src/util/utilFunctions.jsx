import { toast } from "react-toastify";
import { MenuTypes, OrderTypes, UserTypes } from "../configs/Constants/ActionTypes";
import { FaExclamationCircle } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';

export const getMenuById = (menu, _id) => {
  return menu.find((item) => item._id === _id);
};

// Update Cart Item Quantity
export const updateCartItemQty = (
  cartItems,
  menuItems,
  item,
  dispatch,
  val
) => {
  const index = cartItems.findIndex((cartItem) => cartItem.item_id === item.item_id);
  if (index !== -1) {
    cartItems[index].qty += val;
    dispatch({
      type: CartTypes.SET_CART_ITEMS,
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, menuItems, dispatch);
  }
};

// Calculate Total Price Round to 2 decimal places
export const calculateCartTotal = (cartItems, menuItems, dispatch) => {
  let total = 0;
  cartItems.forEach((item) => {
    total+= parseInt(item.totalValue)
  });
  dispatch({
    type: CartTypes.SET_CART_TOTAL,
    cartTotal: total.toFixed(2),
  });
};

//Delete cart items
export const deleteCartItem = async (cartItems, menuItems, item, dispatch) => {
  const index = cartItems.findIndex((cartItem) => cartItem.item_id === item.item_id);
  if (index !== -1) {
    cartItems.splice(index, 1);
    dispatch({
      type: CartTypes.SET_CART_ITEMS,
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, menuItems, dispatch);
  }
};

// Hide Cart
export const hideCart = (dispatch) => {
    dispatch({
      type: CartTypes.TOGGLE_CART,
      showCart: !true,
    });
};

// Empty Cart
export const emptyCart = (
    cartItems,
    menuItems,
    dispatch
  ) => {
    if (cartItems.length > 0) {
      dispatch({
        type: CartTypes.SET_CART_ITEMS,
        cartItems: [],
      });
      calculateCartTotal(cartItems, menuItems, dispatch);
    } else {
      toast.warn("Cart is already empty");
    }
};

import { MdShoppingBasket } from "react-icons/md";
import { CartTypes } from "../configs/Constants/ActionTypes";
import { OrderStatus } from "../configs/Constants/Types";
import { fetchOrders } from "../api/api";
export const addToCart = async (
    cartItems,
    menuItems,
    user,
    _id,
    dispatch,
    customizeData
  ) => {
    // if (!user) {
    //   toast.error("Please login to add items to cart", {
    //     icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
    //     toastId: "unauthorizedAddToCart",
    //   });
    // } else {
      if (cartItems.some((item) => item["item_id"] === _id)) {
        toast.error("Item already in cart", {
          icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
          toastId: "itemAlreadyInCart",
        });
      } else {
        const data = {
          item_id: _id,
          // uid: user.uid,
          qty: customizeData.quantity,
          selectedOptions: customizeData.selectedOptions,
          comment: customizeData.comment,
          totalValue: customizeData.totalValue
        };

        const crtItems = [...cartItems, data];
        dispatch({
          type: CartTypes.SET_CART_ITEMS,
          cartItems: crtItems,
        });
        calculateCartTotal(crtItems, menuItems, dispatch);
      }
    // }
  };


export function handleUserLogin(userData,userDispatch) {
  userDispatch({
    type: UserTypes.SET_USER,
    user: userData,
  });
  
  if(userData.role == 'admin'){
    userDispatch({
      type: UserTypes.SET_IS_ADMIN,
      isAdmin: true,
   }) 
  } 
  
  if (userData.role == 'kitchen'){
    userDispatch({
      type: UserTypes.SET_IS_KITCHEN,
      isKitchen: true,
   }) 
  }

  localStorage.setItem("user", JSON.stringify(userData));
}

export const deleteFood = (
  menuItem,
  menuItems,
  dispatch
) => {
  const menuIndex = menuItems.indexOf(menuItem);
  if(menuIndex !== -1)
  {
    menuItems.splice(menuIndex, 1)
  }
  dispatch ({
    type: MenuTypes.SET_MENU,
    menuItems
  })
  toast.success("Menu Item deleted successfully");
};


export const ToggleAdminMode = (dispatch, state) => {
  dispatch({
    type: UserTypes.TOGGLE_ADMIN_MODE,
    adminMode: state,
  });
  // localStorage.setItem("adminMode", JSON.stringify(state));
  // console.log(state);
};
export const ToggleKitchenMode = (dispatch, state) => {
  dispatch({
    type: UserTypes.TOGGLE_KITCHEN_MODE,
    kitchenMode: state,
  });
  // localStorage.setItem("adminMode", JSON.stringify(state));
  // console.log(state);
};

export const logout = async (user, userDispatch, cartDispatch, navigate) => {
  if (user) {
        userDispatch({
          type: UserTypes.SET_USER,
          user: null,
        });
        cartDispatch({
          type: CartTypes.SET_CART_ITEMS,
          cartItems: [],
        });
        userDispatch({
          type: UserTypes.TOGGLE_ADMIN_MODE,
          adminMode: false,
        });

        localStorage.setItem("user", "undefined");
        localStorage.setItem("adminMode", "undefined");
        localStorage.removeItem("cartItems");
        navigate("/");
  } else {
    console.log("You are not logged in");
  }
};

export function OrderFilter(Orders,type){
  const filteredArr = Orders.filter((order) => {
    return order.order_status.toLowerCase() == type;
  });
  return filteredArr;
}

export function toastError(msg,id) {
  toast.error(msg, {
        icon: <FaExclamationCircle className="text-2xl text-cartNumBg" />,
        toastId: id,
  });
}
export function toastSucess(msg,id) {
  toast.success(msg, {
        icon: <MdDone className="text-2xl text-green-600" />,
        toastId: id,
  });
}