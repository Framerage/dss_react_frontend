import React, {useEffect} from "react";
import classes from "./allOrders.module.css";
import {useDispatch, useSelector} from "react-redux";
import {
  selectAllOrders,
  selectAllOrdersError,
  selectAllOrdersIsLoading,
} from "store/modules/order/selectors";
import PointLoader from "components/pointLoader";
import {AppDispatch} from "store";
import {
  fetchAllOrders,
  fetchUserOrders,
} from "store/modules/order/async-actions";
import Cookies from "js-cookie";
import {selectUserData} from "store/modules/auth/selectors";
import OrderCard from "../orderCard";
interface OrdersProps {
  markRole: string;
}
const AllOrders: React.FC<OrdersProps> = ({markRole}) => {
  const dispatch = useDispatch<AppDispatch>();
  const allOrders = useSelector(selectAllOrders);
  const ordersIsLoading = useSelector(selectAllOrdersIsLoading);
  const ordersError = useSelector(selectAllOrdersError);

  const curUser = useSelector(selectUserData);
  const accS = Cookies.get("perAcTkn");

  useEffect(() => {
    if (curUser && curUser.success && accS) {
      curUser.role === "admin" && markRole === curUser.role
        ? dispatch(fetchAllOrders({auth: accS, email: curUser.email}))
        : dispatch(fetchUserOrders({auth: accS, email: curUser.email}));
    }
  }, [markRole]);
  return (
    <div className={classes.ordersContainer}>
      {!ordersIsLoading ? (
        <div className={classes.ordersList}>
          {allOrders && allOrders.success && allOrders.orders.length ? (
            allOrders.orders.map(order => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            <div className={classes.errorText}>
              {!allOrders?.orders?.length || !allOrders?.success
                ? ordersError
                : "Empty list"}
            </div>
          )}
        </div>
      ) : (
        <PointLoader scale={0.4} />
      )}
    </div>
  );
};
export default AllOrders;
