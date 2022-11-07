import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeEmailFirebase,
  changeFullnameFirebase,
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

  const dispatch = useDispatch();

  const {
    isEmailValid,
    isPasswordValid,
    isUsernameValid,
    isFirstNameValid,
    isLastNameValid,
    isEqual,
  } = useValidation();

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

    dispatch(changeEmailFirebase(email))
      .then((response) => {
        console.log("success");
        hideEmailFormHandler();
      })
      .catch((error) => {
        console.log(error);
        setEmailHasError(true);
      })
      .finally(setEmailIsLoading(false));
  };

  const passwordSubmitHandler = (password) => {
    setPasswordHasError(false);
    setPasswordIsLoading(true);

    //MAKE THE CHAMEPasswordAction
    dispatch()
      .then((response) => {
        console.log("success");
        hidePasswordFormHandler();
      })
      .catch((error) => {
        console.log(error);
        setPasswordHasError(true);
      })
      .finally(setPasswordIsLoading(false));
  };

  const usernameSubmitHandler = (username) => {
    setUsernameHasError(false);
    setUsernameIsLoading(true);

    //MAKE THE CHAME username dAction
    dispatch()
      .then((response) => {
        console.log("success");
        hideUsernameFormHandler();
      })
      .catch((error) => {
        console.log(error);
        setUsernameHasError(true);
      })
      .finally(setUsernameIsLoading(false));
  };

  const nameSubmitHandler = (firstName, lastName) => {
    setNameHasError(false);
    setNameIsLoading(true);

    //MAKE THE CHAME username dAction
    dispatch(changeFullnameFirebase(`${firstName} ${lastName}`))
      .then((response) => {
        console.log("success");
        hideNameFormHandler();
      })
      .catch((error) => {
        console.log(error);
        setNameHasError(true);
      })
      .finally(setNameIsLoading(false));
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
              input="John Doe"
              formIsVisible={showNameForm}
              hideForm={hideNameFormHandler}
              showForm={showNameHandler}
              validate1={isFirstNameValid}
              validate2={isLastNameValid}
              onSubmit={nameSubmitHandler}
              type1="text"
              type2="text"
              hasError={nameHasError}
              isLoading={nameIsLoading}
            />
            <EditForm
              title="Username"
              input="JohnDoe"
              formIsVisible={showUsernameForm}
              hideForm={hideUsernameFormHandler}
              showForm={showUsernameHandler}
              validate={isUsernameValid}
              validateEqual={isEqual}
              onSubmit={usernameSubmitHandler}
              type="text"
              hasError={usernameHasError}
              isLoading={usernameIsLoading}
            />
            <EditForm
              title="Email"
              input="JohnathanDoe@gmail.com"
              formIsVisible={showEmailForm}
              hideForm={hideEmailFormHandler}
              showForm={showEmailHandler}
              validate={isEmailValid}
              validateEqual={isEqual}
              onSubmit={emailSubmitHandler}
              type="text"
              hasError={emailHasError}
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
              isLoading={passwordIsLoading}
            />
          </div>
        </Card>
      </section>
    </Fragment>
  );
};

export default EditProfile;
