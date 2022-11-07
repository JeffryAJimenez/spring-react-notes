import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CHANGE_EMAIL_ERROR,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_USERNAME_ERROR,
  CHANGE_USERNAME_SUCCESS,
  CHANGE_FULLNAME_ERROR,
  CHANGE_FULLNAME_SUCCESS,
} from "../actions/types";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = token ? { isLoggedIn: true } : { isLoggedIn: false };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case CHANGE_EMAIL_ERROR:
    case CHANGE_EMAIL_SUCCESS:
    case CHANGE_PASSWORD_ERROR:
    case CHANGE_PASSWORD_SUCCESS:
    case CHANGE_USERNAME_ERROR:
    case CHANGE_USERNAME_SUCCESS:
    case CHANGE_FULLNAME_ERROR:
    case CHANGE_FULLNAME_SUCCESS:
      return { ...state };

    default:
      return state;
  }
}
