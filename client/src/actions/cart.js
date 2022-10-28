import { CART_ADD_ITEM, CART_REMOVE_ITEM, CLEAR_CART } from "./types";

export const addItem = (item) => ({
  type: CART_ADD_ITEM,
  payload: item,
});

export const removeItem = (id) => ({
  type: CART_REMOVE_ITEM,
  payload: id,
});

export const clearCart = () => ({
  type: CLEAR_CART,
  payload: null,
});
