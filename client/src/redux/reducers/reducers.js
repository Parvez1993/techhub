import { combineReducers } from "redux";
import { ProductListReducer } from "./ProductReducers";

export const rootReducer = combineReducers({
  productList: ProductListReducer,
});
