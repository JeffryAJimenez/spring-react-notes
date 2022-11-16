import axios from "axios";

import authHeader from "./auth-header";
import { LOGOUT } from "../actions/types";

const API_URL = "http://localhost:8762/auth/";

const FBGOO_REGISTER = "http://localhost:9000/auth/users";
const FBGOO_LOGIN = "http://localhost:9000/auth/login";
const BASE_URL = "http://localhost:9000/auth";

let logoutTimer;

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");

  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
};

// WORKING FUNXTIONS
const firebaseRegister = (name, username, email, password) => {
  return axios.post(FBGOO_REGISTER, {
    name,
    username,
    email,
    password,
    returnSecureToken: true,
  });
};

const firebaseLogin = (username, password, dispatch) => {
  return axios
    .post(FBGOO_LOGIN, {
      username,
      password,
      returnSecureToken: true,
    })
    .then((response) => {
      if (response.data && response.data.accessToken) {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.accessToken)
        );
      }

      if (response.data && response.data.expiresIn) {
        localStorage.setItem(
          "expirationTime",
          JSON.stringify(response.data.expiresIn)
        );

        const remainingTime = calculateRemainingTime(
          new Date().getTime() + +response.data.expiresIn * 1000
        );

        logoutTimer = setTimeout(() => {
          logout();
          dispatch({
            type: LOGOUT,
          });
        }, remainingTime);
      }

      return response.data;
    });
};

const firebaseChangeEmail = (email) => {
  const request_obj = {
    value: email,
  };

  return axios
    .patch(BASE_URL + "/users/update/email", request_obj, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const firebaseChangePassword = (password) => {
  const request_obj = {
    value: password,
  };

  return axios
    .patch(BASE_URL + "/users/update/password", request_obj, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const firebaseChangeUsername = (username) => {
  const request_obj = {
    value: username,
  };

  return axios
    .patch(BASE_URL + "/users/update/username", request_obj, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const firebaseChangeFullname = (fullname) => {
  const request_obj = {
    value: fullname,
  };

  return axios
    .patch(BASE_URL + "/users/update/full-name", request_obj, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const getCurrentUser = () => {
  return axios
    .get(BASE_URL + "/users/me", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const activateLogoutTimer = (time, dispatch) => {
  const remainingTime = calculateRemainingTime(
    new Date().getTime() + time * 1000
  );

  if (!logoutTimer) {
    logoutTimer = setTimeout(() => {
      logout();
      dispatch({
        type: LOGOUT,
      });
    }, remainingTime);
  }
};

const calculateRemainingTime = (expiringTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expiringTime).getTime();

  const remainingTime = adjExpirationTime - currentTime;

  return remainingTime;
};

export default {
  register,
  login,
  logout,
  firebaseRegister,
  firebaseLogin,
  firebaseChangeEmail,
  firebaseChangePassword,
  firebaseChangeUsername,
  firebaseChangeFullname,
  calculateRemainingTime,
  activateLogoutTimer,
  getCurrentUser,
};
