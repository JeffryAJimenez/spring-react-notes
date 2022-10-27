import { GET_CURRENT_USER } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
