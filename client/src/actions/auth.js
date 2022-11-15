import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CHANGE_EMAIL_SUCCESS,
  SET_MESSAGE,
  CHANGE_EMAIL_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_USERNAME_ERROR,
  CHANGE_USERNAME_SUCCESS,
  CHANGE_FULLNAME_ERROR,
  CHANGE_FULLNAME_SUCCESS,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },

    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });

      return Promise.resolve();
    },

    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const loginFirebase = (username, password) => (dispatch) => {
  return AuthService.firebaseLogin(username, password, dispatch).then(
    (response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: { email: response.email, username: "test-Username" },
        },
      });

      return Promise.resolve();
    },

    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const changeEmailFirebase = (email) => (dispatch) => {
  return AuthService.firebaseChangeEmail(email).then(
    (response) => {
      dispatch({
        type: CHANGE_EMAIL_SUCCESS,
        payload: null,
      });

      return Promise.resolve(response);
    },

    (error) => {
      dispatch({
        type: CHANGE_EMAIL_ERROR,
        payload: null,
      });

      return Promise.reject(error);
    }
  );
};

export const changePasswordFirebase = (password) => (dispatch) => {
  return AuthService.firebaseChangePassword(password).then(
    (response) => {
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: null,
      });

      return Promise.resolve(response);
    },

    (error) => {
      dispatch({
        type: CHANGE_PASSWORD_ERROR,
        payload: null,
      });

      return Promise.reject(error);
    }
  );
};

export const changeUsernameFirebase = (username) => (dispatch) => {
  return AuthService.firebaseChangeUsername(username).then(
    (response) => {
      dispatch({
        type: CHANGE_USERNAME_SUCCESS,
        payload: null,
      });

      return Promise.resolve(response);
    },

    (error) => {
      dispatch({
        type: CHANGE_USERNAME_ERROR,
        payload: null,
      });

      return Promise.reject(error);
    }
  );
};

export const changeFullnameFirebase = (fullname) => (dispatch) => {
  return AuthService.firebaseChangeFullname(fullname).then(
    (response) => {
      dispatch({
        type: CHANGE_FULLNAME_SUCCESS,
        payload: null,
      });

      return Promise.resolve(response);
    },

    (error) => {
      dispatch({
        type: CHANGE_FULLNAME_ERROR,
        payload: null,
      });

      return Promise.reject(error);
    }
  );
};

export const getCurrentUser = (_) => (dispatch) => {
  return AuthService.getCurrentUser().then(
    (response) => {
      dispatch({ type: GET_CURRENT_USER_SUCCESS });
      return Promise.resolve(response);
    },
    (error) => {
      dispatch({ type: GET_CURRENT_USER_ERROR });

      return Promise.reject(error);
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
