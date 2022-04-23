import axios from "axios";
import {
  LOGOUT,
  USER_LOGIN_BEGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from "../constants/UserConstants";

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
  document.location.href = "/login";

  document.location.href = "/login";
};
