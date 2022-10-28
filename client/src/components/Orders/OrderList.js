import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderListItem from "./OrderListItem";
import classes from "./OrderList.module.css";
import { fectOrders } from "../../actions/order";

import RightIcon from "../Profile/RightIcon";
import LeftIcon from "../Profile/LeftIcon";
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

const OrderList = ({ orders, pageLimit, dataLimit }) => {
  console.log("in order");

  const [pages] = useState(Math.ceil(orders.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (e) => {
    const pageNumber = Number(e.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return orders.slice(startIndex, endIndex);
  };

  const getPaginatedGroup = () => {
    let limit = Math.min(pages, pageLimit);

    let start = Math.floor((currentPage - 1) / limit) * limit;
    return new Array(limit).fill().map((_, idx) => start + idx + 1);
  };

  console.log(orders);
  const ordersList = getPaginatedData().map((item) => (
    <OrderListItem
      key={item.id}
      id={item.id}
      date={item.date}
      total={item.total}
    />
  ));

  const paginationGroup = getPaginatedGroup().map((item, index) => (
    <button
      key={index}
      onClick={changePage}
      className={`${classes["pagination-item"]} ${
        currentPage === item ? classes.active : null
      }`}
    >
      <span>{item}</span>
    </button>
  ));

  // return <div className={classes.ordersList}>{ordersList}</div>;

  return (
    <div>
      <div className={classes.title}>
        <h3>Orders</h3>
      </div>
      <div>{ordersList}</div>
      <div className={classes.pagination}>
        <button
          onClick={goToPreviousPage}
          className={`${classes["pagination-item"]} ${
            currentPage === 1 ? classes.disabled : null
          }`}
        >
          <LeftIcon />
        </button>
        {paginationGroup}
        <button
          onClick={goToNextPage}
          className={`${classes["pagination-item"]} ${
            currentPage === pages ? classes.disabled : null
          }`}
        >
          <RightIcon />
        </button>
      </div>
    </div>
  );
};

export default OrderList;
