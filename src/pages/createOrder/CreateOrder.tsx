import React from "react";
import OrderMenu from "components/orderMenu/OrderMenu";
import VolumePrint from "assets/images/3d-printer.jpg";
import LaserEngr from "assets/images/engr-acrilic.jpg";
import Furniture from "assets/images/furniture.jpg";
import BasRelief from "assets/images/bas-relief.jpg";
import Plywood from "assets/images/plywood-frame.jpg";
import NeonDecor from "assets/images/neon-decor.jpeg";
import {APP_AUTH_ROUTES, ORDERS_ROUTES} from "utils/routes";

import classes from "./createOrder.module.css";
const CreateOrder = () => {
  const orderMenuItems = [
    {
      name: "3D-printer",
      image: VolumePrint,
      link: APP_AUTH_ROUTES.order.link + ORDERS_ROUTES.printVol,
    },
    {
      name: "Laser engraving",
      image: LaserEngr,
      link: APP_AUTH_ROUTES.order.link + ORDERS_ROUTES.laserEngr,
    },

    {
      name: "Relief pictures",
      image: BasRelief,
      link: APP_AUTH_ROUTES.order.link + ORDERS_ROUTES.reliefPic,
    },
    {
      name: "Wood cutting",
      image: Plywood,
      link: APP_AUTH_ROUTES.order.link + ORDERS_ROUTES.plywood,
    },

    {
      name: "Decor furniture",
      image: Furniture,
      link: APP_AUTH_ROUTES.order.link + ORDERS_ROUTES.furniture,
    },
    {
      name: "Neon decor",
      image: NeonDecor,
      link: APP_AUTH_ROUTES.order.link + ORDERS_ROUTES.neon,
    },
  ];
  return (
    <div className={classes.orderContainer}>
      <OrderMenu menuItems={orderMenuItems} />
    </div>
  );
};
export default CreateOrder;
