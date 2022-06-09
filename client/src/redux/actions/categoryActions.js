import axios from "axios";
import {
  CATEGORY_CREATE_BEGIN,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DETAIL_BEGIN,
  CATEGORY_DETAIL_FAIL,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_EDIT_BEGIN,
  CATEGORY_EDIT_FAIL,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_LIST_BEGIN,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_SUCCESS,
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

export const listCategory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_LIST_BEGIN });
    const { data } = await axios.get(`/api/category/get`);

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DETAIL_BEGIN });
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.get(`/api/category/${id}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: CATEGORY_DETAIL_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
