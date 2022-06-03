import {
  UPDATEUSER_DETAIL_BEGIN,
  UPDATEUSER_DETAIL_FAIL,
  UPDATEUSER_DETAIL_SUCCESS,
  USER_DETAIL_BEGIN,
  USER_DETAIL_FAIL,
  USER_DETAIL_SUCCESS,
} from "../constants/UserDetailConstants";
import axios from "axios";

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: USER_DETAIL_BEGIN });
    const { data } = await axios.get(`/api/auth/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const updateUserDetails =
  (id, token, name, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATEUSER_DETAIL_BEGIN });
      const { data } = await axios.put(
        `/api/auth/updateProfile/${id}`,
        { name, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: UPDATEUSER_DETAIL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATEUSER_DETAIL_FAIL,
        payload: error.response.data.msg,
      });
    }
  };
