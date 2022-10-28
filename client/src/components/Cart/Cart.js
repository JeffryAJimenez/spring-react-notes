import { useSelector, useDispatch } from "react-redux";

import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

import { postOrder } from "../../actions/order";
import { addItem, removeItem, clearCart } from "../../actions/cart";
import { useState } from "react";
import Spinner from "../UI/Spinner";

const Cart = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const cartItemRemoveHandler = (id) => {
    dispatch(removeItem(id));
  };

  const cartItemAddHandler = (item) => {
    item = { ...item, amount: 1 };
    dispatch(addItem(item));
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cart.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (date) => {
    return [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("/");
  };

  const submitOrderHandler = () => {
    if (!isLoggedIn) {
      props.onLogin();
      return;
    }

    setIsLoading(true);

    dispatch(
      postOrder({
        date: formatDate(new Date()),
        total: cart.totalAmount,
      })
    )
      .then((res) => {
        dispatch(clearCart());
        props.onClose();
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(setIsLoading(false));
  };

  const totalAmount = `$${cart.totalAmount.toFixed(2)}`;

  const hasItems = cart.items.length > 0;

  const orderButton = isLoading ? (
    <Spinner />
  ) : (
    <button className={classes.button} onClick={submitOrderHandler}>
      Order
    </button>
  );

  const errorMessage = (
    <div className={classes.warning}>
      We had an issue proccessing your order. Please try again!
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {isError && errorMessage}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && orderButton}
      </div>
    </Modal>
  );
};

export default Cart;
