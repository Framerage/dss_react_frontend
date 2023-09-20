import React from "react";
import classes from "./orderCard.module.css";
import {OrderRequestResult} from "typings/orders";
interface OrderCardProps {
  order: OrderRequestResult;
}
const OrderCard: React.FC<OrderCardProps> = ({order}) => {
  return (
    <div key={order._id} className={classes.orderCardContainer}>
      <div className={classes.cardItem}>
        <span className={classes.itemText}>Заказчик:&nbsp;{order.name}</span>
        <span className={classes.itemText}>Email:&nbsp;{order.email}</span>
      </div>
    </div>
  );
};
export default OrderCard;
