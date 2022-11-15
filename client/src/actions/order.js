import {
  ORDERS_SUCCESS,
  ORDERS_FAIL,
  POSTED_ORDER_SUCCESS,
  ORDERS_INFO_SUCCESS,
  ORDERS_INFO_FAILED,
} from "./types";

import OrdersService from "../services/orders.service";
import authService from "../services/auth.service";

export const fectOrders = (currentPage, size) => (dispatch) => {
  return OrdersService.fectOrders(currentPage, size).then(
    (response) => {
      dispatch({
        type: ORDERS_SUCCESS,
        payload: response.content,
      });

      return Promise.resolve(response);
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

      return Promise.reject(error);
    }
  );
};

export const getOrdersInfo = () => (dispatch) => {
  return OrdersService.getOrdersInfo().then(
    (response) => {
      dispatch({
        type: ORDERS_INFO_SUCCESS,
      });

      return Promise.resolve(response);
    },

    (error) => {
      // const message =
      //     (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //         error.message ||
      //         error.toString();

      dispatch({
        type: ORDERS_INFO_FAILED,
      });

      return Promise.reject(error);
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
