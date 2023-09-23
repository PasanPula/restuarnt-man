import { CartTypes} from "../../configs/Constants/ActionTypes";

function CartReducer(state, action) {
    switch (action.type) {
      case CartTypes.SET_CART_ITEMS:
        return {
            ...state,
            cartItems: action.cartItems,
        };
      case CartTypes.SET_CART_TOTAL:
        return {
            ...state,
            cartTotal: action.cartTotal,
        };
      case CartTypes.SET_PAYMENT_METHOD:
        return {
            ...state,
            paymentMethod : action.paymentMethod
        };
      case CartTypes.TOGGLE_CART:
        return {
            ...state,
            showCart : action.showCart
        };
      default:
        return state;
    }
}

export default CartReducer;