import { combineReducers } from "redux";
import { cartReducer } from "./CartReducers";
import { ProductDetailReducer, ProductListReducer } from "./ProductReducers";

export const rootReducer = combineReducers({
  productList: ProductListReducer,
  productDetail: ProductDetailReducer,
  cart: cartReducer,
});
