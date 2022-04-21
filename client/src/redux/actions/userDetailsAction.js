import {
  USER_DETAIL_BEGIN,
  USER_DETAIL_FAIL,
  USER_DETAIL_SUCCESS,
} from "../constants/UserDetailConstants";
import axios from "axios";

export const getUserDetails = (id, token) => async (dispatch, getState) => {
  console.log("bal", id, token);
  try {
    dispatch({ type: USER_DETAIL_BEGIN });
    const { data } = await axios.get(`/api/auth/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("chop", data);
    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload: error.response.data.msg,
    });
  }
};
