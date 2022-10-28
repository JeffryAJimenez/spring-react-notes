import {
  ORDERS_SUCCESS,
  ORDERS_FAIL,
  POSTED_ORDER_SUCCESS,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ORDERS_SUCCESS:
      return [...payload];

    case POSTED_ORDER_SUCCESS:
    case ORDERS_FAIL:
      return state;
    default:
      return state;
  }
}
