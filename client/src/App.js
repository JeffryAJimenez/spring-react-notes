import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

import { logout } from "./actions/auth";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import authService from "./services/auth.service";

function App() {
  const [cartIsShow, setCartIsShow] = useState(false);
  const [profileIsShow, setProfileIsShow] = useState(false);
  const [loginIsShow, setLoginIsShow] = useState(false);
  const [registerIsShow, setRegisterIsShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const timeLeft = authService.calculateRemainingTime(
      JSON.parse(localStorage.getItem("expirationTime"))
    );

    if (timeLeft <= 0) {
      dispatch(logout);
    } else {
      authService.activateLogoutTimer(timeLeft, dispatch);
      console.log(timeLeft);
    }
  }, [dispatch]);

  const showCartHandler = () => {
    setCartIsShow(true);
  };

  const hideCartHandler = () => {
    setCartIsShow(false);
  };

  const showProfileHandler = () => {
    console.log("handler called");
    setProfileIsShow(true);
  };

  const hideProfileHandler = () => {
    setProfileIsShow(false);
  };

  const showLoginHandler = () => {
    setLoginIsShow(true);
  };

  const hideLoginHandler = () => {
    setLoginIsShow(false);
  };

  const hideRegisterHandler = () => {
    setRegisterIsShow(false);
  };

  const reDirectToRegisterHandler = () => {
    setLoginIsShow(false);
    setCartIsShow(false);
    setProfileIsShow(false);

    setRegisterIsShow(true);
  };

  const reDirectToLoginHandler = () => {
    setRegisterIsShow(false);
    setCartIsShow(false);
    setProfileIsShow(false);

    setLoginIsShow(true);
  };

  return (
    <Fragment>
      {profileIsShow && <Profile onClose={hideProfileHandler} />}
      {cartIsShow && (
        <Cart onClose={hideCartHandler} onLogin={reDirectToLoginHandler} />
      )}
      {loginIsShow && (
        <Login
          onClose={hideLoginHandler}
          onRegister={reDirectToRegisterHandler}
        />
      )}

      {registerIsShow && (
        <Register
          onClose={hideRegisterHandler}
          onLogin={reDirectToLoginHandler}
        />
      )}
      <Header
        onShowCart={showCartHandler}
        onShowProfile={showProfileHandler}
        onShowLogin={showLoginHandler}
      />

      <div className="container mt-3">
        <main>
          <Routes>
            <Route path="/" element={<Meals />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Fragment>
  );
}

export default App;
