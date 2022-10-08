import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";

import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const items = useSelector(state => state.cart.items);

    const numOfItems = items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    const btnClasses  = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

    useEffect(() => {

        if(items.length === 0 ){
            return;

        }

        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        //call as a cleanup function by react
        return () => {
            clearTimeout(timer)
        };

    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
         <CartIcon />
        </span>
        <span>
            Your Cart
        </span>
        <span className={classes.badge}>
            {numOfItems}
        </span>

    </button>
};

export default HeaderCartButton;