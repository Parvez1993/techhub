import {
  PRODUCT_CREATE_BEGIN,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_BEGIN,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
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
  PRODUCT_TOP_BEGIN,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_SUCCESS,
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

export const ProductListReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_BEGIN:
      return { loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.numOfPages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ProductDetailReducer = (
  state = { product: { reviews: [] } },
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

export const createproductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_BEGIN:
      return { ...state, loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const getTopProducts = (state = { topProducts: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_BEGIN:
      return { ...state, loading: true };
    case PRODUCT_TOP_SUCCESS:
      return {
        ...state,
        loading: false,
        topProducts: action.payload,
        success: true,
      };
    case PRODUCT_TOP_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const speakerReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case SPEAKER_GET_BEGIN:
      return { ...state, loading: true };
    case SPEAKER_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        success: true,
      };
    case SPEAKER_GET_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const phoneReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PHONE_GET_BEGIN:
      return { ...state, loading: true };
    case PHONE_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        success: true,
      };
    case PHONE_GET_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const headphoneReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case HEADPHONE_GET_BEGIN:
      return { ...state, loading: true };
    case HEADPHONE_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        success: true,
      };
    case HEADPHONE_GET_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
