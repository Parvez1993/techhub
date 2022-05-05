import axios from "axios";
import { ORDER_SELFLIST_RESET } from "../constants/OrderConstants";
import {
  LOGOUT,
  USER_LIST_BEGIN,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LOGIN_BEGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from "../constants/UserConstants";
import { USER_DETAIL_RESET } from "../constants/UserDetailConstants";

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOGIN_BEGIN });
    const { data } = await axios.post(`/api/auth/login`, {
      email,
      password,
    });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const registerUser =
  (name, email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LOGIN_BEGIN });
      const { data } = await axios.post(`/api/auth/register`, {
        name,
        email,
        password,
      });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: LOGOUT });
  dispatch({ type: USER_DETAIL_RESET });
  dispatch({ type: ORDER_SELFLIST_RESET });
  document.location.href = "/";
};

//admin

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_BEGIN,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `/api/auth`,

      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response.data.msg,
    });
  }
};
