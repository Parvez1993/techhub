import {
  PRODUCT_CREATE_BEGIN,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_BEGIN,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAIL_BEGIN,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_EDIT_BEGIN,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_RESET,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_BEGIN,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
} from "../constants/ProductConstants";

export const ProductListReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_BEGIN:
      return { loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ProductDetailReducer = (
  state = { product: [{ reviews: [] }] },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_BEGIN:
      return { loading: true, product: [] };

    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

//delete products
export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_BEGIN:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, succ: true };
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

//edit products
export const productUpdateReducer = (
  state = { product: {}, success: false },
  action
) => {
  switch (action.type) {
    case PRODUCT_EDIT_BEGIN:
      return { loading: true };
    case PRODUCT_EDIT_SUCCESS:
      return {
        loading: false,
        error: "",
        product: action.payload,
        success: true,
      };
    case PRODUCT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_EDIT_RESET:
      return { product: {} };
    default:
      return state;
  }
};

//edit products
export const productCreateReducer = (
  state = { product: {}, success: false },
  action
) => {
  switch (action.type) {
    case PRODUCT_CREATE_BEGIN:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        error: "",
        product: action.payload,
        success: true,
      };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
