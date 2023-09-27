import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
  CLEAR_SHIPPING_INFO,
} from "../constants/cartConstants";

const initialState = {
  email: '',
  phoneNumber: '',
  address: '',
  billingType: '',
  paymentMethod: ''
  // Otros campos relacionados con la información de envío
};

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case CLEAR_CART:
      // Borrar todo el carrito
      return { ...state, cartItems: [] };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
      case CLEAR_SHIPPING_INFO:
        // Borrar la información de envío
        return initialState;  

    default:
      return state;
  }
};
