import { combineReducers } from "redux";
import { cartReducer } from "./CartReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderSelfReducer,
} from "./OrderReducers";
import {
  deleteProductReducer,
  productCreateReducer,
  ProductDetailReducer,
  ProductListReducer,
  productUpdateReducer,
} from "./ProductReducers";
import {
  userDetailReducer,
  userUpdateDetailReducer,
} from "./UserDetailsReducer";

import {
  deleteUserReducer,
  getAllUsers,
  userloginReducer,
  userUpdateReducer,
} from "./UserReducers";

export const rootReducer = combineReducers({
  productList: ProductListReducer,
  productDetail: ProductDetailReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: deleteProductReducer,
  productEdit: productUpdateReducer,
  cart: cartReducer,
  userLogin: userloginReducer,
  userDetails: userDetailReducer,
  userDelete: deleteUserReducer,
  userUpdateProfile: userUpdateDetailReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderlist: orderSelfReducer,
  getAllUsers: getAllUsers,
  userUpdate: userUpdateReducer,
});
