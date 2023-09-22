import React, {useCallback, useEffect} from "react";
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
  editChoosedOrder,
  fetchAllOrders,
  fetchUserOrders,
  removeChoosedOrder,
} from "store/modules/order/async-actions";
import Cookies from "js-cookie";
import {selectUserData} from "store/modules/auth/selectors";
import OrderCard from "../orderCard";
import {OrderRequestResult, OrderStatuses} from "typings/orders";
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

  const onDeleteOrder = useCallback(
    (e: React.MouseEvent<HTMLElement>, orderId: string) => {
      e.stopPropagation();
      const check = window.prompt("Are you sure want to delete? Enter pass");
      check === process.env.REACT_APP_ADM_PSS &&
        curUser &&
        allOrders &&
        allOrders.orders.length &&
        accS &&
        dispatch(removeChoosedOrder({id: orderId, auth: accS})).then(
          ({payload}) => {
            if (!payload) {
              return;
            }
            if (payload.success) {
              window.alert("Заказ успешно удален");
              dispatch(fetchAllOrders({auth: accS, email: curUser.email}));
              return;
            }
            window.alert("Не удалось удалить заказ");
          },
        );
    },
    [],
  );
  const onSaveChangesByOrderCard = useCallback(
    (order: OrderRequestResult, status: OrderStatuses) => {
      curUser &&
        accS &&
        dispatch(
          editChoosedOrder({
            order: {...order, orderStatus: status},
            auth: accS,
          }),
        ).then(res => {
          res.payload?.success &&
            dispatch(fetchAllOrders({auth: accS, email: curUser.email}));
        });
    },
    [],
  );
  return (
    <div className={classes.ordersContainer}>
      {!ordersIsLoading ? (
        <div className={classes.ordersList}>
          {allOrders && allOrders.success && allOrders.orders.length ? (
            allOrders.orders.map(order => (
              <OrderCard
                key={order._id}
                order={order}
                markRole={markRole}
                onRemoveOrder={onDeleteOrder}
                onSaveOrder={onSaveChangesByOrderCard}
              />
            ))
          ) : (
            <div className={classes.errorText}>
              {!allOrders?.success ? ordersError : "Empty list"}
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
