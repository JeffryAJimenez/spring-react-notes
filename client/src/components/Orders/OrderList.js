import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderListItem from "./OrderListItem";
import classes from "./OrderList.module.css"
import { fectOrders } from "../../actions/order";
// const order = [{
//     id: 2342,
//     date: "06/04/2022",
//     total: 300.00
// },
// {
//     id: 2342,
//     date: "06/08/2022",
//     total: 200.00
// },
// {
//     id: 2343,
//     date: "07/01/2022",
//     total: 9.00
// },
// {
//     id: 2344,
//     date: "08/09/2022",
//     total: 59.00
// },]

const OrderList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fectOrders("johndoe"));
    }, [])

    const order = useSelector(state => state.order)

    console.log(order);
    const ordersList =  order.map(item => <OrderListItem key={item.id} id={item.id} date={item.date} total={item.total} />)

    return (
        <div className={classes.ordersList}>
            {ordersList}
        </div>
    )
}


export default OrderList;