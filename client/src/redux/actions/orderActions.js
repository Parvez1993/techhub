import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/CartConstants";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_SELFLIST_SUCCESS,
  ORDER_SELFLIST_FAIL,
  ORDER_SELFLIST_REQUEST,
  ORDER_SELFLIST_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVERY_REQUEST,
  ORDER_DELIVERY_SUCCESS,
  ORDER_DELIVERY_FAIL,
} from "../constants/OrderConstants";
import { logout } from "./userActions";

export const createOrder = (order) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    console.log(order);
    const { data } = await axios.post(`/api/orders`, order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
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
    const {
      userLogin: { userInfo },
    } = getState();
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      });

      const { data } = await axios.get(`/api/orders/${order_id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      console.log("wtf", data);

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

export const payOrder =
  (order_id, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.put(
        `/api/orders/${order_id}/pay`,
        paymentResult,
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_SELFLIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `/api/orders/myorders`,

      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: ORDER_SELFLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_SELFLIST_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `/api/orders/getorders`,

      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVERY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},

      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: ORDER_DELIVERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVERY_FAIL,
      payload: error.response.data.msg,
    });
  }
};
