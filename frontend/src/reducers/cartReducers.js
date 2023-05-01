import { ADD_TO_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
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
            i.product === isItemExist.product
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        };
      }

    default:
      return state;
  }
};
