import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8762/orders";

const order = [
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

const fectOrders = (username) => {
  // return axios.get(API_URL + username, {headers: authHeader()});
  return new Promise((resolve, reject) => {
    resolve(order);
  });
};

export default { fectOrders };
