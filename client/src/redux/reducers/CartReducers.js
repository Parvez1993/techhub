import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/CartConstants";

export const cartReducer = (
  state = { cartItems: [], shipping: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload; //
      const existingItem = state.cartItems.find(
        (item) => item.product === newItem.product
      ); //yes | no
      const cartItems = existingItem
        ? state.cartItems.map(
            (item) => (item.product === existingItem.product ? newItem : item) // ball
          )
        : [...state.cartItems, newItem];

      return { ...state, cartItems: [...cartItems] };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shipping: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
