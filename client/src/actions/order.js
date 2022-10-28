import { ORDERS_SUCCESS, ORDERS_FAIL, POSTED_ORDER_SUCCESS } from "./types";

import OrdersService from "../services/orders.service";

export const fectOrders = (username) => (dispatch) => {
  return OrdersService.fectOrders(username).then(
    (response) => {
      dispatch({
        type: ORDERS_SUCCESS,
        payload: response,
      });

      return Promise.resolve();
    },

    (error) => {
      // const message =
      //     (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //         error.message ||
      //         error.toString();

      dispatch({
        type: ORDERS_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const postOrder = (order) => (dispatch) => {
  return OrdersService.postOrder(order).then(
    (response) => {
      dispatch({
        type: POSTED_ORDER_SUCCESS,
      });

      return Promise.resolve();
    },

    (error) => {
      // const message =
      //     (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //         error.message ||
      //         error.toString();

      dispatch({
        type: ORDERS_FAIL,
      });

      return Promise.reject();
    }
  );
};
