import { combineReducers } from "redux";
import { cartReducer } from "./CartReducers";
import {
  categoryCreateReducer,
  categoryDetailReducer,
  categoryReducer,
  categoryUpdateReducer,
} from "./category";
import { LandingListReducer } from "./landingReducers";
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
  headphoneReducer,
  phoneReducer,
  productCreateReducer,
  ProductDetailReducer,
  ProductListReducer,
  productUpdateReducer,
  speakerReducer,
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
  landing: LandingListReducer,
  productList: ProductListReducer,
  productDetail: ProductDetailReducer,
  productCreate: productCreateReducer,
  productDelete: deleteProductReducer,
  productEdit: productUpdateReducer,
  speakers: speakerReducer,
  phones: phoneReducer,
  headphones: headphoneReducer,
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
  categoryDetail: categoryDetailReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
});
