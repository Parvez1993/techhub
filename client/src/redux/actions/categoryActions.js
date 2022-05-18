import axios from "axios";
import {
  CATEGORY_CREATE_BEGIN,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_EDIT_BEGIN,
  CATEGORY_EDIT_FAIL,
  CATEGORY_EDIT_SUCCESS,
} from "../constants/CategoryConstants";

export const editcategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_EDIT_BEGIN });
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.patch(
      `/api/category/${category.id}/edit`,
      category,
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_EDIT_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//addCategory

export const addcategory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_CREATE_BEGIN });
    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo);

    const { data } = await axios.post(
      `/api/category`,
      {},
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: error.response.data.msg,
    });
  }
};
