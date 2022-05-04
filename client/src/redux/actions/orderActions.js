import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/CartConstants";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from "../constants/OrderConstants";
import { logout } from "./userActions";

export const createOrder = (order, token) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { data } = await axios.post(`/api/orders`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const getOrderDetails =
  (order_id, token) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      });

      const { data } = await axios.get(`/api/orders`, order_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      });
      dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data,
      });
      localStorage.removeItem("cartItems");
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.msg,
      });
    }
  };
