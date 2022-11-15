import { Fragment, useState } from "react";
import useInput from "../../hooks/useInput";
import ButtonInverted from "../UI/ButtonInverted";
import FormSubmitButton from "../UI/FormSubmitButton";
import Spinner from "../UI/Spinner";
import classes from "./EditForm.module.css";

const EditForm = ({
  title,
  input,
  showForm,
  hideForm,
  formIsVisible,
  validate,
  validateEqual,
  type,
  onSubmit,
  hasError,
  isLoading,
  customeErrorMsg,
}) => {
  const {
    value: value,
    isValid: valueIsValid,
    hasError: valueHasError,
    valueChangeHandler: valueChangeHandler,
    inputBlurHandler: valueBlurHandler,
    cancelBlurHandler: valueCancelBlurHandler,
    clearInput: valueClear,
  } = useInput(validate);

  const {
    value: confirmValue,
    isValid: confirmValueIsValid,
    valueChangeHandler: confirmValueChangeHandler,
    inputBlurHandler: confirmValueBlurHandler,
    cancelBlurHandler: confirmValueCancelBlurHandler,
    clearInput: confirmValueClear,
  } = useInput((x) => validateEqual(x, value));

  const submitHandler = (e) => {
    e.preventDefault();

    if (!confirmValueIsValid || !valueIsValid) {
      valueBlurHandler();
      confirmValueBlurHandler();
      return;
    }

    onSubmit(value);
  };

  const cancelHandler = () => {
    valueCancelBlurHandler();
    confirmValueCancelBlurHandler();
    valueClear();
    confirmValueClear();
    hideForm();
  };

  const editHandler = () => {
    showForm();
  };

  const inputClasses = valueHasError
    ? `form-control mb-3 is-invalid`
    : `form-control mb-3`;

  const inputConfirmClasses = !confirmValueIsValid
    ? ` form-control mb-3 is-invalid`
    : ` form-control mb-3`;

  const errorMsg =
    customeErrorMsg !== ""
      ? customeErrorMsg
      : "We're sorry, looks like we had an issue handeling your request. Make sure you are filling out the fields correctly. Please try again.";

  const form = (
    <Fragment>
      {hasError && (
        <div className={`${classes.bump} d-block invalid-feedback mb-3`}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={submitHandler} className={classes.form}>
        <div className="form-group">
          <input
            type={type}
            className={inputClasses}
            id="valueInput"
            placeholder={title}
            onChange={valueChangeHandler}
            onBlur={valueBlurHandler}
          />
        </div>

        {valueHasError && (
          <div
            className={classes.warning}
          >{`Please enter a valid ${title.toLowerCase()}`}</div>
        )}

        <div className="form-group mb-3">
          <input
            type={type}
            className={inputConfirmClasses}
            id="confirmValue"
            placeholder={`Confirm ${title}`}
            onChange={confirmValueChangeHandler}
            onBlur={confirmValueBlurHandler}
          />
        </div>

        {!confirmValueIsValid && (
          <div
            className={classes.warning}
          >{`Confirm ${title.toLowerCase()} should be equal to ${title.toLowerCase()}`}</div>
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

export default EditForm;
