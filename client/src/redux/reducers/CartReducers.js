import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/CartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
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
    default:
      return state;
  }
};
