import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import HeaderCartButton from "./buttons/HeaderCartButton";
import mealsImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";
import HeaderProfileButton from "./buttons/HeaderProfileButton";
import HeaderLoginButton from "./buttons/HeaderLoginButton";
import { Link } from "react-router-dom";

const Header = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const authentication_button = isLoggedIn ? (
    <HeaderProfileButton onClick={props.onShowProfile} />
  ) : (
    <HeaderLoginButton onClick={props.onShowLogin} />
  );
  return (
    <Fragment>
      <header className={classes.header}>
        <Link to="/">
          <h1 className={classes.logo}>ReactMeals</h1>
        </Link>

        <div className={classes.nav}>
          <HeaderCartButton onClick={props.onShowCart} />
          {authentication_button}
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
