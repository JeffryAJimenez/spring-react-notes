import { Fragment } from "react";
import CloseButton from "../UI/CloseButton";

import classes from "./Register.module.css";
import Modal from "../UI/Modal";
import FormSubmitButton from "../UI/FormSubmitButton";
import ButtonInverted from "../UI/ButtonInverted";
const Register = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit called");
  };

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
            <div className="form-group">
              <label for="firstname">First Name</label>
              <input
                type="text"
                class="form-control"
                id="fistname"
                aria-describedby="emailHelp"
                placeholder="First Name"
              />
            </div>

            <div className="form-group">
              <label for="lastname">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="lastname"
                aria-describedby="emailHelp"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              aria-describedby="emailHelp"
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <FormSubmitButton name="Join Now" />
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
