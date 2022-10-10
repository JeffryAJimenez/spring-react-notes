import {
    ORDERS_SUCCESS,
    ORDERS_FAIL
} from "../actions/types";


const initialState = [];

export default function(state = initialState, action) {

    const {type, payload} = action;

    switch(type){

        case ORDERS_SUCCESS:
            return  [...payload];
        default:
            return state;
    }
}