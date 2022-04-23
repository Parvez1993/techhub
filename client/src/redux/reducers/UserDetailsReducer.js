import {
  UPDATEUSER_DETAIL_BEGIN,
  UPDATEUSER_DETAIL_FAIL,
  UPDATEUSER_DETAIL_SUCCESS,
  USER_DETAIL_BEGIN,
  USER_DETAIL_FAIL,
  USER_DETAIL_SUCCESS,
} from "../constants/UserDetailConstants";

export const userDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAIL_BEGIN:
      return { ...state, loading: true };
    case USER_DETAIL_SUCCESS:
      return { ...state, loading: false, error: "", userInfo: action.payload };
    case USER_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATEUSER_DETAIL_BEGIN:
      return { ...state, loading: true };
    case UPDATEUSER_DETAIL_SUCCESS:
      return { ...state, loading: false, error: "", userInfo: action.payload };
    case UPDATEUSER_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
