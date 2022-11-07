import { Fragment, useState } from "react";
import useInput from "../../hooks/useInput";
import ButtonInverted from "../UI/ButtonInverted";
import FormSubmitButton from "../UI/FormSubmitButton";
import Spinner from "../UI/Spinner";
import classes from "./EditNameForm.module.css";

const EditNameForm = ({
  title,
  title1,
  title2,
  input,
  showForm,
  hideForm,
  formIsVisible,
  validate1,
  validate2,
  type1,
  type2,
  onSubmit,
  hasError,
  isLoading,
}) => {
  const {
    value: value1,
    isValid: value1IsValid,
    hasError: value1HasError,
    valueChangeHandler: value1ChangeHandler,
    inputBlurHandler: value1BlurHandler,
    cancelBlurHandler: value1CancelBlurHandler,
    clearInput: value1Clear,
  } = useInput(validate1);

  const {
    value: value2,
    isValid: value2IsValid,
    hasError: value2HasError,
    valueChangeHandler: value2ChangeHandler,
    inputBlurHandler: value2BlurHandler,
    cancelBlurHandler: value2CancelBlurHandler,
    clearInput: value2Clear,
  } = useInput(validate2);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!value2IsValid || !value1IsValid) {
      value1BlurHandler();
      value2BlurHandler();
      return;
    }

    onSubmit(value1, value2);
  };

  const cancelHandler = () => {
    value1CancelBlurHandler();
    value2CancelBlurHandler();
    value1Clear();
    value2Clear();
    hideForm();
  };

  const editHandler = () => {
    showForm();
  };

  const input1Classes = value1HasError
    ? `form-control mb-3 is-invalid`
    : `form-control mb-3`;

  const input2Classes = value2HasError
    ? ` form-control mb-3 is-invalid`
    : ` form-control mb-3`;

  const form = (
    <Fragment>
      {hasError && (
        <div className={`${classes.bump} d-block invalid-feedback mb-3`}>
          We're sorry, looks like we had an issue handeling your request. Make
          sure you are filling out the fields correctly. Please try again.
        </div>
      )}

      <form onSubmit={submitHandler} className={classes.form}>
        <div className="form-group">
          <input
            type={type1}
            className={input1Classes}
            id="input1"
            placeholder={title1}
            onChange={value1ChangeHandler}
            onBlur={value1BlurHandler}
          />
        </div>

        {value1HasError && (
          <div
            className={classes.warning}
          >{`Please enter a valid ${title1.toLowerCase()}`}</div>
        )}

        <div className="form-group mb-3">
          <input
            type={type2}
            className={input2Classes}
            id="input2"
            placeholder={title2}
            onChange={value2ChangeHandler}
            onBlur={value2BlurHandler}
          />
        </div>

        {value2HasError && (
          <div
            className={classes.warning}
          >{`Please enter a valid ${title2.toLowerCase()}`}</div>
        )}

        <div className={classes.actions}>
          <ButtonInverted name="Cancel" onClick={cancelHandler} />
          {!isLoading && <FormSubmitButton name="Update" />}
          {isLoading && <Spinner />}
        </div>
      </form>
    </Fragment>
  );

  const details = (
    <Fragment>
      <div className={classes.title}>
        <span>{title}</span>
      </div>
      <div className={classes.value}>{input}</div>
      <div className={classes.action}>
        <button className={classes.button} onClick={editHandler}>
          Edit
        </button>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <div className={classes.body}>
        {formIsVisible && form}
        {!formIsVisible && details}
      </div>

      <div className={classes.divider}></div>
    </Fragment>
  );
};

export default EditNameForm;
