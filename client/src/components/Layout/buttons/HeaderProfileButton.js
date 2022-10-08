import React from "react";

import classes from "./HeaderProfileButton.module.css";
import ProfileIcon from "./ProfileIcon";

const HeaderProfileButton = (props) => {

   

    return <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
         <ProfileIcon />
        </span>
        <span>
            Profile
        </span>

    </button>
};

export default HeaderProfileButton;