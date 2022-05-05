import {
  LOGOUT,
  USER_LIST_BEGIN,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LOGIN_BEGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_BEGIN,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
} from "../constants/UserConstants";
import { USER_DETAIL_RESET } from "../constants/UserDetailConstants";

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
    case LOGOUT:
      return {};
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
    case USER_DETAIL_RESET:
      return { userInfo: null, loading: false, error: "" };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getAllUsers = (
  state = { users: [], loading: false, error: "" },
  action
) => {
  switch (action.type) {
    case USER_LIST_BEGIN:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return { ...state, loading: false, error: "", users: action.payload };
    case USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      return {};
    default:
      return state;
  }
};
