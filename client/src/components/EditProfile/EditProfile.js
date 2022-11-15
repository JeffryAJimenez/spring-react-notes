import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  changeEmailFirebase,
  changeFullnameFirebase,
  changePasswordFirebase,
  getCurrentUser,
} from "../../actions/auth";

import useValidation from "../../hooks/useValidation";
import Card from "../UI/Card";
import EditForm from "./EditForm";
import EditNameForm from "./EditNameForm";
import classes from "./EditProfile.module.css";

const EditProfile = () => {
  const [showNameForm, setShowNameForm] = useState(false);
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [nameIsLoading, setNameIsLoading] = useState(false);
  const [usernameIsLoading, setUsernameIsLoading] = useState(false);
  const [emailIsLoading, setEmailIsLoading] = useState(false);
  const [passwordIsLoading, setPasswordIsLoading] = useState(false);

  const [nameHasError, setNameHasError] = useState(false);
  const [usernameHasError, setUsernameHasError] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);

  const [userNameErrorMessage, setUsernameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [user, setUser] = useState({ username: "", email: "", fullName: "" });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserDetails();
  }, [dispatch]);

  const {
    isEmailValid,
    isPasswordValid,
    isUsernameValid,
    isFirstNameValid,
    isLastNameValid,
    isEqual,
  } = useValidation();

  const fetchUserDetails = () => {
    dispatch(getCurrentUser()).then((res) => {
      setUser({
        username: res.username,
        email: res.email,
        fullName: res.fullName,
      });
    });
  };

  const showNameHandler = () => {
    setShowUsernameForm(false);
    setShowEmailForm(false);
    setShowPasswordForm(false);

    setShowNameForm(true);
  };
  const showUsernameHandler = () => {
    setShowNameForm(false);
    setShowEmailForm(false);
    setShowPasswordForm(false);

    setShowUsernameForm(true);
  };
  const showEmailHandler = () => {
    setShowUsernameForm(false);
    setShowNameForm(false);
    setShowPasswordForm(false);

    setShowEmailForm(true);
  };

  const showPasswordHandler = () => {
    setShowUsernameForm(false);
    setShowEmailForm(false);
    setShowNameForm(false);

    setShowPasswordForm(true);
  };

  const hideNameFormHandler = () => {
    setShowNameForm(false);
    setNameHasError(false);
  };

  const hideUsernameFormHandler = () => {
    setShowUsernameForm(false);
    setUsernameHasError(false);
  };
  const hideEmailFormHandler = () => {
    setShowEmailForm(false);
    setEmailHasError(false);
  };
  const hidePasswordFormHandler = () => {
    setShowPasswordForm(false);
    setPasswordHasError(false);
  };

  const emailSubmitHandler = (email) => {
    setEmailHasError(false);
    setEmailIsLoading(true);
    setEmailErrorMessage("");

    dispatch(changeEmailFirebase(email))
      .then((response) => {
        console.log("success");
        hideEmailFormHandler();
        fetchUserDetails();
        setEmailIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setEmailHasError(true);

        if (error && error.response && error.response.data) {
          if (error.response.data === "EMAIL-EXISTS") {
            setEmailErrorMessage("Email is already taken.");
          }
        }
        setEmailIsLoading(false);
      });
  };

  const passwordSubmitHandler = (password) => {
    setPasswordHasError(false);
    setPasswordErrorMessage("");
    setPasswordIsLoading(true);

    //MAKE THE CHAMEPasswordAction
    dispatch(changePasswordFirebase(password))
      .then((response) => {
        console.log("success");
        hidePasswordFormHandler();
        fetchUserDetails();
        setPasswordIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPasswordHasError(true);

        if (error && error.response && error.response.data) {
          if (error.response.data === "PASSWORD-NOT-STRONG") {
            setPasswordErrorMessage("Password is not strong enough.");
          }
        }

        setPasswordIsLoading(false);
      });
  };

  const usernameSubmitHandler = (username) => {
    setUsernameHasError(false);
    setUsernameIsLoading(true);
    setUsernameErrorMessage("");

    //MAKE THE CHAME username dAction
    dispatch()
      .then((response) => {
        console.log("success");
        hideUsernameFormHandler();
        fetchUserDetails();
        setUsernameIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setUsernameHasError(true);

        if (error && error.response && error.response.data) {
          if (error.response.data === "USERNAME-EXISTS") {
            setUsernameErrorMessage("Username is already taken.");
          }
        }
        setUsernameIsLoading(false);
      });
  };

  const nameSubmitHandler = (firstName, lastName) => {
    setNameHasError(false);
    setNameIsLoading(true);

    //MAKE THE CHAME username dAction
    dispatch(changeFullnameFirebase(`${firstName} ${lastName}`))
      .then((response) => {
        console.log("success");
        hideNameFormHandler();
        fetchUserDetails();
        setNameIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setNameHasError(true);
        setNameIsLoading(false);
      });
  };

  return (
    <Fragment>
      <div className={classes.summary}>
        <h2 className={classes.title}>Account Information</h2>
        <p>Your personal data is safe with us!</p>
        <p>
          Your security is as important to us as the quality of our meals.
          Hence, one of our top priority is to make sure your data does not fall
          into the worng hands. You are safe with us!
        </p>
        {/* <div className={classes.divider}></div> */}
      </div>
      <section className={classes.info}>
        <Card>
          <div className={classes.body}>
            <EditNameForm
              title="Full Name"
              title1="First Name"
              title2="Last Name"
              input={user.fullName}
              formIsVisible={showNameForm}
              hideForm={hideNameFormHandler}
              showForm={showNameHandler}
              validate1={isFirstNameValid}
              validate2={isLastNameValid}
              onSubmit={nameSubmitHandler}
              type1="text"
              type2="text"
              hasError={nameHasError}
              customeErrorMsg={""}
              isLoading={nameIsLoading}
            />
            <EditForm
              title="Username"
              input={user.username}
              formIsVisible={showUsernameForm}
              hideForm={hideUsernameFormHandler}
              showForm={showUsernameHandler}
              validate={isUsernameValid}
              validateEqual={isEqual}
              onSubmit={usernameSubmitHandler}
              type="text"
              hasError={usernameHasError}
              customeErrorMsg={userNameErrorMessage}
              isLoading={usernameIsLoading}
            />
            <EditForm
              title="Email"
              input={user.email}
              formIsVisible={showEmailForm}
              hideForm={hideEmailFormHandler}
              showForm={showEmailHandler}
              validate={isEmailValid}
              validateEqual={isEqual}
              onSubmit={emailSubmitHandler}
              type="text"
              hasError={emailHasError}
              customeErrorMsg={emailErrorMessage}
              isLoading={emailIsLoading}
            />
            <EditForm
              title="Password"
              input="*********"
              formIsVisible={showPasswordForm}
              hideForm={hidePasswordFormHandler}
              showForm={showPasswordHandler}
              validate={isPasswordValid}
              validateEqual={isEqual}
              onSubmit={passwordSubmitHandler}
              type="password"
              hasError={passwordHasError}
              customeErrorMsg={passwordErrorMessage}
              isLoading={passwordIsLoading}
            />
          </div>
        </Card>
      </section>
    </Fragment>
  );
};

export default EditProfile;
