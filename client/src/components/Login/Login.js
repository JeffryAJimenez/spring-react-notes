import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./Login.module.css";
import Modal from "../UI/Modal";
import FormSubmitButton from "../UI/FormSubmitButton";
import ButtonInverted from "../UI/ButtonInverted";
import CloseButton from "../UI/CloseButton";

import { loginFirebase } from "../../actions/auth";
import useInput from "../../hooks/useInput";
import authService from "../../services/auth.service";
import Spinner from "../UI/Spinner";

const Login = (props) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsError(false);
    if (!usernameIsValid || !passwordIsValid) {
      usernameBlurHandler();
      passwordBlurHandler();
      return;
    }

    dispatch(loginFirebase(username, password))
      .then(() => {
        console.log("Success");
        setIsLoading(false);
        props.onClose();
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  const usernameInputClasses = usernameHasError
    ? "form-control is-invalid"
    : "form-control";

  const usernameInputWarning = usernameHasError ? (
    <div className="invalid-feedback">Please provide a username.</div>
  ) : (
    <small id="emailHelp" className="form-text text-muted">
      We'll never share your information with anyone else.
    </small>
  );

  const passwordInputClasses = passwordHasError
    ? "form-control is-invalid"
    : "form-control";

  const passwordInputWarning = passwordHasError ? (
    <div className="invalid-feedback">Please provide a password.</div>
  ) : null;

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
        {isError && (
          <div className={`${classes.bump} d-block invalid-feedback`}>
            We're sorry, there is an error with your email and/or password. Make
            sure you are using a resgistered username and the associated
            password. Please try again.
          </div>
        )}
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={usernameInputClasses}
              id="username"
              name="username"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
            />
            {usernameInputWarning}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className={passwordInputClasses}
              id="exampleInputPassword1"
              name="password"
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordInputWarning}
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember me
            </label>
          </div>
          {!isLoading && <FormSubmitButton name="Sign In" />}
          {isLoading && <Spinner />}
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
