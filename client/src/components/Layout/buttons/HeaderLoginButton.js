import React from "react";

import classes from "./HeaderLoginButton.module.css";
import LoginIcon from "./LoginIcon";

const HeaderLoginButton = (props) => {

    return <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
         <LoginIcon />
        </span>
        <span>
            Sign in
        </span>

    </button>
};

export default HeaderLoginButton;