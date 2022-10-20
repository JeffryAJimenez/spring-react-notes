import Modal from "../UI/Modal";
import EditIcon from "./EditIcon";
import Button from "../UI/Button";
import LogoutIcon from "./LogoutIcon";
import classes from "./Profile.module.css";
import OrderList from "../Orders/OrderList";
import LeftIcon from "./LeftIcon";
import RightIcon from "./RightIcon";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/auth";

const Profile = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const logoutHandler = () => {
    console.log("signing out bye!");
    dispatch(logout());
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      {/* <div class="container mt-5 d-flex justify-content-center"> */}

      <div className={classes.body}>
        <div className={classes.image}>
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
            className="rounded"
            width="155"
          />
        </div>

        <div className={classes["body-left"]}>
          <h4 className={classes.name}>{user.username}</h4>
          <span>{user.email}</span>

          <div className={classes.stats}>
            <div className={classes["stats-item"]}>
              <span className={classes["stats-item-title"]}>Orders</span>
              <span>38</span>
            </div>

            <div className={classes["stats-item"]}>
              <span className={classes["stats-item-title"]}>Total</span>
              <span>$200,2220</span>
            </div>
          </div>

          <div className={classes.buttons}>
            <Button name="log out" onClick={logoutHandler}>
              <LogoutIcon />
            </Button>

            <Button name="edit profile">
              <EditIcon />
            </Button>
          </div>
        </div>
      </div>

      <OrderList />

      <div className={classes["buttons-next"]}>
        <Button>
          <LeftIcon />
        </Button>

        <Button>
          <RightIcon />
        </Button>
      </div>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>

      {/* </div> */}
    </Modal>
  );
};

export default Profile;
