import { Fragment, useState } from "react";
import CloseButton from "../UI/CloseButton";

import classes from "./Register.module.css";
import Modal from "../UI/Modal";
import FormSubmitButton from "../UI/FormSubmitButton";
import ButtonInverted from "../UI/ButtonInverted";

import useInput from "../../hooks/useInput";
import authService from "../../services/auth.service";
import Spinner from "../UI/Spinner";

const Register = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailIsTaken, setEmailIsTaken] = useState(false);
  const [usernameIsTaken, setUsernameIsTaken] = useState(false);

  let mediumPasswordRegex = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );

  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  const {
    value: firstname,
    isValid: firstnameIsValid,
    hasError: firstnameHasError,
    valueChangeHandler: firstnameChangeHandler,
    inputBlurHandler: firstnameBlurHandler,
  } = useInput((value) => value.trim() !== "" && value.length < 15);

  const {
    value: lastname,
    isValid: lastnameIsValid,
    hasError: lastnameHasError,
    valueChangeHandler: lastnameChangeHandler,
    inputBlurHandler: lastnameBlurHandler,
  } = useInput((value) => value.trim() !== "" && value.length < 15);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => emailRegex.test(value));

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput((value) => value.trim() !== "" && value.length > 3);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => mediumPasswordRegex.test(value));

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value === password);

  const onChangeEmailHandler = (e) => {
    setEmailIsTaken(false);
    emailChangeHandler(e);
  };

  const onChangeUsernameHandler = (e) => {
    setUsernameIsTaken(false);
    usernameChangeHandler(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !firstnameIsValid ||
      !lastnameIsValid ||
      !emailIsValid ||
      !usernameIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsValid
    ) {
      firstnameBlurHandler();
      lastnameBlurHandler();
      emailBlurHandler();
      usernameBlurHandler();
      passwordBlurHandler();
      confirmPasswordBlurHandler();
      return;
    }

    setIsLoading(true);

    authService
      .firebaseRegister(email, password)
      .then((res) => {
        if (res.status === 200) {
        }
      })
      .catch((error) => {
        let errorMessage = "Authentication failed!";

        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message
        ) {
          errorMessage = error.response.data.error.message;

          if (error.response.data.error.message === "EMAIL_EXISTS") {
            setEmailIsTaken(true);
          }

          if (error.response.data.error.message === "USERNAME_EXISTS") {
            setUsernameIsTaken(true);
          }
        }
      })
      .finally(setIsLoading(false));
  };

  const firstnameInputClasses = firstnameHasError
    ? "form-control is-invalid"
    : "form-control";

  const lastnameInputClasses = lastnameHasError
    ? "form-control is-invalid"
    : "form-control";

  const emailInputClasses =
    emailHasError || emailIsTaken ? "form-control is-invalid" : "form-control";

  const emailInputWarning = emailHasError ? (
    <div className="invalid-feedback">Please provide a valid email.</div>
  ) : (
    <small id="emailHelp" className="form-text text-muted">
      We'll never share your email with anyone else.
    </small>
  );

  const usernameInputWarning = usernameHasError ? (
    <div className="invalid-feedback">
      A username should contain at least 4 characters.
    </div>
  ) : null;
  const usernameInputClasses = usernameHasError
    ? "form-control is-invalid"
    : "form-control";

  const passwordInputClasses = passwordHasError
    ? "form-control is-invalid"
    : "form-control";

  const confirmPasswordInputClasses = !confirmPasswordIsValid
    ? "form-control is-invalid"
    : "form-control";

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.close}>
        <CloseButton onClick={props.onClose} />
      </div>
      <div className={classes.body}>
        <h2 className={classes.title}>Become a member!</h2>
        <div className={classes["under-title"]}>
          Become a member and get access to our magnificent meals. Orders can be
          placed at any time so you never have to go hungry no matter the time!
        </div>

        <form onSubmit={submitHandler}>
          <div className={classes.fullname}>
            <div className={`form-group ${classes["flex-item"]}`}>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className={firstnameInputClasses}
                id="fistname"
                aria-describedby="emailHelp"
                placeholder="First Name"
                onChange={firstnameChangeHandler}
                onBlur={firstnameBlurHandler}
              />
              {firstnameHasError && (
                <div className="invalid-feedback">
                  Your first name should contain less than 20 characters.
                </div>
              )}
            </div>

            <div className={`form-group ${classes["flex-item"]}`}>
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className={lastnameInputClasses}
                id="lastname"
                aria-describedby="emailHelp"
                placeholder="Last Name"
                onChange={lastnameChangeHandler}
                onBlur={lastnameBlurHandler}
              />
              {lastnameHasError && (
                <div className="invalid-feedback">
                  Your last name should contain less than 20 characters.
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={usernameInputClasses}
              id="username"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              onChange={onChangeUsernameHandler}
              onBlur={usernameBlurHandler}
            />
            {usernameIsTaken ? (
              <div className={classes.warning}>
                Email address already in use.
              </div>
            ) : (
              usernameInputWarning
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className={emailInputClasses}
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={onChangeEmailHandler}
              onBlur={emailBlurHandler}
            />
            {emailIsTaken ? (
              <div className={classes.warning}>
                Email address already in use.
              </div>
            ) : (
              emailInputWarning
            )}
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className={passwordInputClasses}
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />

            {passwordHasError && (
              <div className="invalid-feedback">
                A password should contain at least 8 characters. Including at
                least 1 special character, 1 number, and a upper case letter.
              </div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className={confirmPasswordInputClasses}
              id="confirmPassowrd"
              placeholder="Confirm password"
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
            />
            {!confirmPasswordIsValid && (
              <div className="invalid-feedback">
                Password and confirm password should be equal.
              </div>
            )}
          </div>

          {!isLoading && <FormSubmitButton name="Join Now" />}
          {isLoading && <Spinner />}
        </form>
      </div>
      <div className={classes.divider}></div>
      <div className={classes.body}>
        <h2 className={classes["sign-in"]}>Already a member?</h2>
        <ButtonInverted name="Login" onClick={props.onLogin} />
      </div>
      <div className={classes.footer}>
        <span>Thank you showing interest!</span>
      </div>
    </Modal>
  );
};

export default Register;
