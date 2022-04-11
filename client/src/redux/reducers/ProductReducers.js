import {
  PRODUCT_DETAIL_BEGIN,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_BEGIN,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
} from "../constants/ProductConstants";

export const ProductListReducer = (state = { products: [] }, action) => {
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
      return { loading: true, products: [] };

    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
