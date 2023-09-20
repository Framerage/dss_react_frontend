import React from "react";
import classes from "./orderCard.module.css";
import {OrderRequestResult} from "typings/orders";
import {formatDateToLocale} from "helpers/appHelpers";
import DeleteIcon from "assets/icons/btn-remove.svg";
interface OrderCardProps {
  order: OrderRequestResult;
}
const OrderCard: React.FC<OrderCardProps> = ({order}) => {
  return (
    <div key={order._id} className={classes.orderCardContainer}>
      <div className={classes.cardItem}>
        <span className={classes.itemText}>Заказчик:&nbsp;{order.name}</span>
        <span className={classes.itemText}>Email:&nbsp;{order.email}</span>
        <span className={classes.itemText}>Phone:&nbsp;{order.phoneNum}</span>
      </div>
      <div className={classes.cardItem}>
        <span className={classes.itemText}>
          Дата создания:&nbsp;
          <br />
          {formatDateToLocale(order.createdAt)}
        </span>
        <span className={classes.itemText}>
          Дата изменения:&nbsp;
          <br />
          {formatDateToLocale(order.updatedAt)}
        </span>
      </div>
      <div className={classes.cardItem}>
        <span className={classes.itemText}>
          Общая цена:&nbsp;{order.totalPrice}&nbsp;rub
        </span>
        {order.city && (
          <span className={classes.itemText}>Город:&nbsp;{order.city}</span>
        )}
        {order.promo && (
          <span className={classes.itemText}>
            Использованный промокод:&nbsp;{order.promo}
          </span>
        )}
      </div>
      <div className={classes.cardItem}>
        <span className={classes.itemText}>
          Статус заказа:&nbsp;{order.orderStatus}
        </span>
      </div>
      <img src={DeleteIcon} alt="deleteBtn" width={25} height={25} />
    </div>
  );
};
export default OrderCard;
