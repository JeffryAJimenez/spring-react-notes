import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://localhost:8764/api/orders";

const orders = [
  {
    id: 2342,
    date: "06/04/2022",
    total: 300.0,
  },
  {
    id: 2345,
    date: "06/08/2022",
    total: 200.0,
  },
  {
    id: 2343,
    date: "07/01/2022",
    total: 9.0,
  },
  {
    id: 2344,
    date: "08/09/2022",
    total: 59.69,
  },
];

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
  return new Promise((resolve, reject) => {
    orders.push(order);
    resolve(order);
  });
};

export default { fectOrders, postOrder, getOrdersInfo };
