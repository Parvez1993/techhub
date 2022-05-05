import { combineReducers } from "redux";
import { cartReducer } from "./CartReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderSelfReducer,
} from "./OrderReducers";
import { ProductDetailReducer, ProductListReducer } from "./ProductReducers";
import {
  userDetailReducer,
  userUpdateDetailReducer,
} from "./UserDetailsReducer";

import { getAllUsers, userloginReducer } from "./UserReducers";

export const rootReducer = combineReducers({
  productList: ProductListReducer,
  productDetail: ProductDetailReducer,
  cart: cartReducer,
  userLogin: userloginReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateDetailReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderlist: orderSelfReducer,
  getAllUsers: getAllUsers,
});
