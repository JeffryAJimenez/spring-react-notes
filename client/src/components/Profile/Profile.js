import Modal from "../UI/Modal";
import EditIcon from "./EditIcon";
import Button from "../UI/Button";
import LogoutIcon from "./LogoutIcon";
import classes from "./Profile.module.css";
import OrderList from "../Orders/OrderList";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/auth";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../actions/auth";
import { getOrdersInfo } from "../../actions/order";

import { Link } from "react-router-dom";

const Profile = (props) => {
  const [user, setUser] = useState({
    username: "",
  });

  const [total, setTotal] = useState(0.0);
  const [ordersCount, setOrdersCount] = useState(0);

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(getCurrentUser()).then((res) => {
      console.log(res);
      setUser({ username: res.username });
    });

    dispatch(getOrdersInfo()).then((res) => {
      setTotal(res.total);
      setOrdersCount(res.numOfOrders);
    });
  }, [dispatch]);

  const logoutHandler = () => {
    console.log("signing out bye!");
    dispatch(logout());
    props.onClose();
  };

  const editProfileHandler = () => {
    props.onClose();
  };

  if (!isLoggedIn) {
    props.onClose();
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const totalUSD = formatter.format(total);

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

          <div className={classes.stats}>
            <div className={classes["stats-item"]}>
              <span className={classes["stats-item-title"]}>Orders</span>
              <span>{ordersCount}</span>
            </div>

            <div className={classes["stats-item"]}>
              <span className={classes["stats-item-title"]}>Total</span>
              <span>{totalUSD}</span>
            </div>
          </div>

          <div className={classes.buttons}>
            <Button name="log out" onClick={logoutHandler}>
              <LogoutIcon />
            </Button>

            <Link to="/edit">
              <Button name="edit profile" onClick={editProfileHandler}>
                <EditIcon />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <OrderList />

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
