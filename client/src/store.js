import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./redux/reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middleware = [thunk];

const cartItemsFromStorage = localStorage.getItem("storeItems")
  ? JSON.parse(localStorage.getItem("storeItems"))
  : [];

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping"))
  : {};

// const paymentFromStorage = localStorage.getItem("payment")
//   ? JSON.parse(localStorage.getItem("payment"))
//   : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shipping: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userFromStorage,
  },
};
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
