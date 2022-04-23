import { combineReducers } from "redux";
import { cartReducer } from "./CartReducers";
import { ProductDetailReducer, ProductListReducer } from "./ProductReducers";
import {
  userDetailReducer,
  userUpdateDetailReducer,
} from "./UserDetailsReducer";

import { userloginReducer } from "./UserReducers";

export const rootReducer = combineReducers({
  productList: ProductListReducer,
  productDetail: ProductDetailReducer,
  cart: cartReducer,
  userLogin: userloginReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateDetailReducer,
});
