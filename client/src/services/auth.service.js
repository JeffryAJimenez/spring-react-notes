import axios from "axios";

import { LOGOUT } from "../actions/types";

const API_URL = "http://localhost:8762/auth/";

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

const firebaseRegister = (email, password) => {
  return axios.post(FBGOO_REGISTER, {
    email,
    password,
    returnSecureToken: true,
  });
};

const firebaseLogin = (email, password, dispatch) => {
  return axios
    .post(FBGOO_LOGIN, {
      email,
      password,
      returnSecureToken: true,
    })
    .then((response) => {
      if (response.data && response.data.idToken) {
        localStorage.setItem("token", JSON.stringify(response.data.idToken));
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
  const token = JSON.parse(localStorage.getItem("token"));
  const request_obj = {
    email,
    idToken: token,
    returnSecureToken: true,
  };

  console.log(request_obj);
  return axios.post(FBGOO_CHANGE_EMAIL, request_obj).then((response) => {
    return response.data;
  });
};

const firebaseChangePassword = (password) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const request_obj = {
    password,
    idToken: token,
    returnSecureToken: true,
  };

  return axios.post(FBGOO_CHANGE_EMAIL, request_obj).then((response) => {
    return response.data;
  });
};

const firebaseChangeUsername = (username) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const request_obj = {
    username,
    idToken: token,
    returnSecureToken: true,
  };

  return axios.post(FBGOO_CHANGE_EMAIL, request_obj).then((response) => {
    return response.data;
  });
};

const firebaseChangeFullname = (fullname) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const request_obj = {
    fullname,
    idToken: token,
    returnSecureToken: true,
  };

  return axios.post(FBGOO_CHANGE_EMAIL, request_obj).then((response) => {
    return response.data;
  });
};

const activateLogoutTimer = (time, dispatch) => {
  const remainingTime = calculateRemainingTime(
    new Date().getTime() + time * 1000
  );
  console.log("inside activateLogoutTimer: " + remainingTime);
  if (!logoutTimer) {
    logoutTimer = setTimeout(() => {
      console.log("calling logout");
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
};
