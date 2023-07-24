import React from "react";

import classes from "./createOrder.module.css";
import OrderMenu from "components/orderMenu/OrderMenu";
const CreateOrder = () => {
  return (
    <div className={classes.orderContainer}>
      <OrderMenu />
    </div>
  );
};
export default CreateOrder;
