import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {

   

    return <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
         {props.children}
        </span>
        <span>
            {props.name}
        </span>

    </button>
};

export default Button;