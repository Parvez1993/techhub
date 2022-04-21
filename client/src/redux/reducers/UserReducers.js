import {
  LOGOUT,
  USER_LOGIN_BEGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_BEGIN,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
} from "../constants/UserConstants";

export const userloginReducer = (
  state = { userInfo: null, loading: false, error: "" },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_BEGIN:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, error: "", userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = { userInfo: null, loading: false, error: "" },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_BEGIN:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, error: "", userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLogout = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      return {};

    default:
      return state;
  }
};
