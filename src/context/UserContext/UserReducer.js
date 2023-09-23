import { UserTypes } from "../../configs/Constants/ActionTypes";

function UserReducer(state, action) {
  switch (action.type) {
    case UserTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case UserTypes.SET_USERS:
      return {
        ...state,
        user: action.users,
      };
    case UserTypes.UPDATE_USER:
      return {
        ...state,
        user: action.users,
      };
    case UserTypes.SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.isAdmin,
      };
    case UserTypes.SET_IS_KITCHEN:
      return {
        ...state,
        isKitchen: action.isKitchen,
      };
    case UserTypes.TOGGLE_ADMIN_MODE:
      return {
        ...state,
        adminMode: action.adminMode,
      };
    case UserTypes.TOGGLE_KITCHEN_MODE:
      return {
        ...state,
        kitchenMode: action.kitchenMode,
      };
    default:
      return state;
  }
}

export default UserReducer;
