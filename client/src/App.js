import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

import Register from "./components/Register";
import Home from "./components/Home";
// import Profile from "./components/Profile";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";

function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [cartIsShow, setCartIsShow] = useState(false);
  const [profileIsShow, setProfileIsShow] = useState(false);
  const [loginIsShow, setLoginIsShow] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); //clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
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

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  return (
    <Fragment>
      {profileIsShow && <Profile onClose={hideProfileHandler} />}
      {cartIsShow && <Cart onClose={hideCartHandler} />}
      {loginIsShow && <Login onClose={hideLoginHandler} />}
      <Header
        onShowCart={showCartHandler}
        onShowProfile={showProfileHandler}
        onShowLogin={showLoginHandler}
      />
      {/* <main>
        <Meals />
      </main> */}

      <div className="container mt-3">
        <main>
          <Routes>
            <Route path="/" element={<Meals />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </main>
      </div>
    </Fragment>
  );
}

export default App;
