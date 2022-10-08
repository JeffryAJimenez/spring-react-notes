import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "./types";

export const addItem = (item) => ({
    type: CART_ADD_ITEM,
    payload: item,
})

export const removeItem = (id) => ({
    type: CART_REMOVE_ITEM,
    payload: id
})
