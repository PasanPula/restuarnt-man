import { MenuTypes} from "../../configs/Constants/ActionTypes";

function MenuReducer(state, action) {
    switch (action.type) {
      case MenuTypes.SET_MENU :
        return { menuItems : action.menuItems };
      default:
        return state;
    }
}

export default MenuReducer;