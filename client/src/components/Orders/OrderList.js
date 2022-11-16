import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderListItem from "./OrderListItem";
import classes from "./OrderList.module.css";
import { fectOrders } from "../../actions/order";

import RightIcon from "../Profile/RightIcon";
import LeftIcon from "../Profile/LeftIcon";
import Spinner from "../UI/Spinner";

const OrderList = ({ onGetInfo }) => {
  const size = 5;

  const [pages, setPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0); ///set message that there are no orders
  const [currentPage, setCurrentPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fectOrders(currentPage, size))
      .then((res) => {
        setPages(res.totalPages);
        setTotalElements(res.totalElements);
        setCurrentPage(res.pageable.pageNumber);
        setIsFirst(res.first);
        setIsLast(res.last);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch, currentPage]);

  const getOrders = () => {
    dispatch(fectOrders(currentPage, size))
      .then((res) => {
        setPages(res.totalPages);
        setTotalElements(res.totalElements);
        setCurrentPage(res.pageable.pageNumber);
        setIsFirst(res.first);
        setIsLast(res.last);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

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
    return orders;
  };

  const getPaginatedGroup = () => {
    let limit = Math.min(5, pages);

    let start = Math.floor((currentPage - 1) / limit) * limit;
    start = Math.max(start, 0);

    return new Array(limit).fill().map((_, idx) => start + idx);
  };

  const ordersList =
    totalElements === 0 ? (
      <div className={classes.message}>
        <span>No orders available.</span>
      </div>
    ) : (
      getPaginatedData().map((item) => (
        <OrderListItem
          key={item.id}
          id={item.id}
          date={item.date}
          total={item.total}
          getOrders={getOrders}
          onGetInfo={onGetInfo}
        />
      ))
    );

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
      <div>
        {isLoading && (
          <div className={classes.spinner}>
            <div className={classes["spinner-child"]}>
              <Spinner />
            </div>
          </div>
        )}
      </div>
      <div>{!isLoading && ordersList}</div>
      <div className={classes.pagination}>
        <button
          onClick={goToPreviousPage}
          className={`${classes["pagination-item"]} ${
            isFirst ? classes.disabled : null
          }`}
        >
          <LeftIcon />
        </button>
        {paginationGroup}
        <button
          onClick={goToNextPage}
          className={`${classes["pagination-item"]} ${
            isLast ? classes.disabled : null
          }`}
        >
          <RightIcon />
        </button>
      </div>
    </div>
  );
};

export default OrderList;
