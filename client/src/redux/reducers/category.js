import {
  CATEGORY_CREATE_BEGIN,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_EDIT_BEGIN,
  CATEGORY_EDIT_FAIL,
  CATEGORY_EDIT_RESET,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_LIST_BEGIN,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_SUCCESS,
} from "../constants/CategoryConstants";

export const categoryUpdateReducer = (
  state = { category: {}, success: false },
  action
) => {
  switch (action.type) {
    case CATEGORY_EDIT_BEGIN:
      return { loading: true };
    case CATEGORY_EDIT_SUCCESS:
      return {
        loading: false,
        error: "",
        category: action.payload,
        success: true,
      };
    case CATEGORY_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_EDIT_RESET:
      return { category: {} };
    default:
      return state;
  }
};

//edit products
export const categoryCreateReducer = (
  state = { category: {}, success: false },
  action
) => {
  switch (action.type) {
    case CATEGORY_CREATE_BEGIN:
      return { loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        error: "",
        category: action.payload,
        success: true,
      };
    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_CREATE_RESET:
      return { category: {} };
    default:
      return state;
  }
};

export const categoryReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_BEGIN:
      return { loading: true, category: [] };

    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
