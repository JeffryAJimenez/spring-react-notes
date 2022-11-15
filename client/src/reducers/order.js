import {
  ORDERS_SUCCESS,
  ORDERS_FAIL,
  POSTED_ORDER_SUCCESS,
  ORDERS_INFO_SUCCESS,
  ORDERS_INFO_FAILED,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ORDERS_SUCCESS:
      return [...payload];

    case POSTED_ORDER_SUCCESS:
    case ORDERS_FAIL:
    case ORDERS_INFO_SUCCESS:
    case ORDERS_INFO_FAILED:
      return state;

    default:
      return state;
  }
}
