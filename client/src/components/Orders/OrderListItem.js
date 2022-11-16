import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../actions/order";
import Spinner from "../UI/Spinner";
import classes from "./OrderListItem.module.css";

const OrderListItem = (props) => {
  const orderId = `Order #${props.id}`;
  const date = props.date;
  const total = `$${props.total.toFixed(2)}`;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const deleteHandler = () => {
    setIsLoading(true);

    dispatch(deleteOrder(props.id))
      .then((_) => {
        setIsLoading(false);
        props.onGetInfo();
        props.getOrders();
      })
      .catch((_) => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  const errorMsg = (
    <div className="invalid-feedback d-block">
      Could not delete item. Please try again!
    </div>
  );

  return (
    <li className={classes.item}>
      <div>
        <div className={classes.details}>
          <h3>{orderId}</h3>
          <div className={classes.description}>{date}</div>
        </div>
        <div className={classes.details}>
          <div>
            {isLoading && <Spinner />}
            {!isLoading && (
              <button onClick={deleteHandler} className={classes.btn}>
                delete
              </button>
            )}
            {isError && errorMsg}
          </div>
          <div className={classes.price}>{total}</div>
        </div>
      </div>
    </li>
  );
};

export default OrderListItem;
