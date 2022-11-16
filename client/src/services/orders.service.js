import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://localhost:8764/api/orders";

const fectOrders = (currentPage, size) => {
  // return axios.get(API_URL + username, {headers: authHeader()});
  return axios
    .get(BASE_URL, {
      headers: authHeader(),
      params: { page: currentPage, size: size },
    })
    .then((response) => {
      return response.data;
    });
};

const getOrdersInfo = () => {
  // return axios.get(API_URL + username, {headers: authHeader()});
  return axios
    .get(BASE_URL + "/info", {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const postOrder = (order) => {
  // return axios.get(API_URL + username, {headers: authHeader()});
  return axios
    .post(BASE_URL, order, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const deleteOrder = (id) => {
  // return axios.get(API_URL + username, {headers: authHeader()});
  return axios
    .delete(BASE_URL + "/" + id, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

export default { fectOrders, postOrder, getOrdersInfo, deleteOrder };
