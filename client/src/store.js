import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./redux/reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middleware = [thunk];

const cartItemsFromStorage = localStorage.getItem("storeItems")
  ? JSON.parse(localStorage.getItem("storeItems"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
};
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
