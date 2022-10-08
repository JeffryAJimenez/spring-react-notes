import {useSelector, useDispatch} from "react-redux";

import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

import {addItem, removeItem} from "../../actions/cart";
const Cart = (props) => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const cartItemRemoveHandler = (id) => {
        dispatch(removeItem(id));
    }

    const cartItemAddHandler = (item) => {

        item = {...item, amount: 1};
        dispatch(addItem(item));
    }

    const cartItems = <ul className={classes["cart-items"]}>
        {cart.items
                .map(item => <CartItem 
                    key={item.id} 
                    name={item.name} 
                    amount={item.amount} 
                    price={item.price} 
                    onRemove={cartItemRemoveHandler.bind(null, item.id)} 
                    onAdd={cartItemAddHandler.bind(null, item)}/>)
        }
        </ul>;

    const totalAmount = `$${cart.totalAmount.toFixed(2)}`;

    const hasItems = cart.items.length > 0;

    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} >Order</button>}
        </div>
    </Modal>
}

export default Cart;