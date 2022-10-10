import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";
import cart from "./cart";
import order from "./order";

export default combineReducers({
    auth,
    message,
    cart,
    order
})