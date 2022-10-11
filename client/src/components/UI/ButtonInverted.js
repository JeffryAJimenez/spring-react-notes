import classes from "./ButtonInverted.module.css";

const ButtonInverted = (props) => {
  return (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClick}>
        <span>{props.name}</span>
      </button>
    </div>
  );
};

export default ButtonInverted;
