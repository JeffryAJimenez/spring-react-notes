import classes from "./OrderListItem.module.css"
const OrderListItem = (props) => {

    const orderId = `Order #${props.id}`;
    const date = props.date;
    const total = `$${props.total.toFixed(2)}`;
    return <li className={classes.item}>
        <div>
            <h3>{orderId}</h3>
            <div className={classes.details}>
                <div className={classes.description}>{date}</div>
                <div className={classes.price}>{total}</div>
            </div>
        </div>
        
    </li>

}

export default OrderListItem;