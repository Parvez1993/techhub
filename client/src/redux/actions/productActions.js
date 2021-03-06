import axios from "axios";
import {
  PRODUCT_LIST_BEGIN,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_BEGIN,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DELETE_BEGIN,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_EDIT_BEGIN,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_CREATE_BEGIN,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_BEGIN,
  PRODUCT_TOP_BEGIN,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  SPEAKER_GET_BEGIN,
  SPEAKER_GET_SUCCESS,
  SPEAKER_GET_FAIL,
  PHONE_GET_BEGIN,
  PHONE_GET_SUCCESS,
  PHONE_GET_FAIL,
  HEADPHONE_GET_BEGIN,
  HEADPHONE_GET_SUCCESS,
  HEADPHONE_GET_FAIL,
} from "../constants/ProductConstants";

export const listProducts =
  (keyword = "", page = "", sort = "latest", category = "", min = 0, max = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_BEGIN });

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&page=${page}&sort=${sort}&cat=${category}&min=${min}&max=${max}`
      );

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
      payload: data.product,
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

//delete products
export const deleteProduct = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: PRODUCT_DELETE_BEGIN });

    const { data } = await axios.delete(`/api/products/${id}/delete`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//edit products

export const editProductDetails = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_EDIT_BEGIN });
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.patch(
      `/api/products/${product.id}/edit`,
      product,
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//addProducts

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_BEGIN });
    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.post(
      `/api/products/addProducts`,
      {},
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_BEGIN });
      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

export const getTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_BEGIN });
    const { data } = await axios.get(`/api/products/topproducts`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSpeakers =
  (products = []) =>
  async (dispatch) => {
    try {
      dispatch({ type: SPEAKER_GET_BEGIN });
      const { data } = await axios.get(`/api/products/newspeaker`);

      dispatch({
        type: SPEAKER_GET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SPEAKER_GET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const getSpeakers = () => async (dispatch) => {
//   try {
//     dispatch({ type: SPEAKER_GET_BEGIN });
//     const { data } = await axios.get(`/api/products/newspeaker`);

//     dispatch({
//       type: SPEAKER_GET_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: SPEAKER_GET_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const getPhones = () => async (dispatch) => {
  try {
    dispatch({ type: PHONE_GET_BEGIN });
    const { data } = await axios.get(`/api/products/newphone`);

    dispatch({
      type: PHONE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PHONE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHeadphones = () => async (dispatch) => {
  try {
    dispatch({ type: HEADPHONE_GET_BEGIN });
    const { data } = await axios.get(`/api/products/newheadphone`);

    dispatch({
      type: HEADPHONE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HEADPHONE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
