import classes from "./FormSubmitButton.module.css";

const FormSubmitButton = (props) => {
  return (
    <button className={classes.button} type="submit">
      <span>{props.name}</span>
    </button>
  );
};

export default FormSubmitButton;
