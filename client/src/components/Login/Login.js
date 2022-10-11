import { Fragment } from "react";
import CloseButton from "../UI/CloseButton";

import classes from "./Login.module.css";
import Modal from "../UI/Modal";
import FormSubmitButton from "../UI/FormSubmitButton";
import ButtonInverted from "../UI/ButtonInverted";
const Login = (props) => {
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

        <form>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              aria-describedby="emailHelp"
              placeholder="Enter username"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div class="form-check mb-3">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <FormSubmitButton name="Sign In" />
        </form>
      </div>
      <div className={classes.divider}></div>
      <div className={classes.body}>
        <h2 className={classes["sign-in"]}>New to ReactMeals?</h2>
        <ButtonInverted name="Create Account" onClick={() => {}} />
      </div>
      <div className={classes.footer}>
        <span>Thank you showing interest!</span>
      </div>
    </Modal>
  );
};

export default Login;
