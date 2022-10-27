import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import cart from "./cart";
import order from "./order";
import user from "./user";

export default combineReducers({
  auth,
  message,
  cart,
  order,
  user,
});
