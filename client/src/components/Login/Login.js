import { Fragment } from "react";
import CloseButton from "../UI/CloseButton";

import classes from "./Login.module.css";
import Modal from "../UI/Modal";
import FormSubmitButton from "../UI/FormSubmitButton";
import ButtonInverted from "../UI/ButtonInverted";
import { useDispatch } from "react-redux";

import { LOGIN_SUCCESS } from "../../actions/types";
const Login = (props) => {
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: {
          username: "johndoe",
          name: "john doe",
          email: "johndoe@gmail.com",
        },
      },
    });

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.close}>
        <CloseButton onClick={props.onClose} />
      </div>
      <div className={classes.body}>
        <h2 className={classes.title}>Sign In</h2>
        <div className={classes["under-title"]}>
          Sign in or create an account to enjoy wonderful and fresh meals
          available any time!
        </div>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              placeholder="Enter username"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <FormSubmitButton name="Sign In" />
        </form>
      </div>
      <div className={classes.divider}></div>
      <div className={classes.body}>
        <h2 className={classes["sign-in"]}>New to ReactMeals?</h2>
        <ButtonInverted name="Create Account" onClick={props.onRegister} />
      </div>
      <div className={classes.footer}>
        <span>Thank you showing interest!</span>
      </div>
    </Modal>
  );
};

export default Login;
