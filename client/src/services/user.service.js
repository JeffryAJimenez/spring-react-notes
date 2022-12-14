import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8762/users";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUser = (username) => {
  return axios.get(API_URL + username, { headers: authHeader() });
};

const getCurrentUser = () => {
  // return axios.get(API_URL + '/me', {headers: authHeader()});

  return new Promise((resolve, reject) => {
    resolve({ username: "JoJo", email: "jonathanjoestar@gamil.com" });
  });
};

export default { getPublicContent, getUser, getCurrentUser };
