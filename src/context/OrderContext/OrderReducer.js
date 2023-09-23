import { OrderTypes } from "../../configs/Constants/ActionTypes";

function OrderReducer(state, action) {
  switch (action.type) {
    case OrderTypes.SET_ORDERS:
        return {
            ...state,
            orders: [...action.orders],
        };
    case OrderTypes.SET_PENDING_ORDERS:
        console.log(action.pendingOrders)
        return {
            ...state,
            pendingOrders: [...action.pendingOrders],
        };
    case OrderTypes.SET_PRCOESSING_ORDERS:
        return {
            ...state,
            processingOrders: [ ...action.processingOrders],
        };
    case OrderTypes.SET_COMPLETED_ORDERS:
        return {
            ...state,
            completedOrders: [...action.completedOrders],
        };
    default:
      return state;
  }
}

export default OrderReducer;
