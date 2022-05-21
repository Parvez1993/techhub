import { combineReducers } from "redux";
import { cartReducer } from "./CartReducers";
import {
  categoryCreateReducer,
  categoryReducer,
  categoryUpdateReducer,
} from "./category";
import {
  deliveryReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  orderSelfReducer,
} from "./OrderReducers";
import {
  createproductReviewReducer,
  deleteProductReducer,
  getTopProducts,
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
  orderlistSelf: orderSelfReducer,
  orderList: orderListReducer,
  getAllUsers: getAllUsers,
  userUpdate: userUpdateReducer,
  orderDelivery: deliveryReducer,
  createReview: createproductReviewReducer,
  topProducts: getTopProducts,
  category: categoryReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
});
