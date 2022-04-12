import axios from "axios";
import {
  PRODUCT_LIST_BEGIN,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_BEGIN,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from "../constants/ProductConstants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BEGIN });

    const { data } = await axios.get("/api/products");
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get productlistdetails
export const detailProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_BEGIN });

    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
