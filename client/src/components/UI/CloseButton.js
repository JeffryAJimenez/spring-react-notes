import CloseIcon from "./CloseIcon";
import classes from "./CloseButton.module.css";

const CloseButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CloseIcon />
      </span>
      <span>{props.name}</span>
    </button>
  );
};

export default CloseButton;
