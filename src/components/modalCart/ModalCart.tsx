import React, {useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import classes from "./modalCart.module.css";
import {AppDispatch} from "store";
import {isShopCartUse} from "store/modules/cart/selectors";
import {isShoppingCartUse} from "store/modules/cart/actions";
import RemoveIcon from "assets/icons/btn-remove.svg";
import EmptyCartImg from "assets/icons/emptyIcon.svg";
import ArrowIcon from "assets/icons/arrow.svg";
import {Link} from "react-router-dom";
import {APP_AUTH_ROUTES} from "utils/routes";
const ModalCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isCartOpened = useSelector(isShopCartUse);

  const onCloseCart = () => {
    console.log("close cart");
    dispatch(isShoppingCartUse(false));
  };
  // const test = {
  //   createdAt: "2023-07-28T21:32:26.136Z",
  //   descrip: "Simple and nice decise for your home",
  //   fullDescrip:
  //     "Its does not afraid water and and sun, except for high temperature",
  //   imgUrl: [""],
  //   likes: 0,
  //   price: 1599,
  //   theme: "volPrinter",
  //   title: "Decor vases",
  //   updatedAt: "2023-07-28T21:32:26.136Z",
  //   user: {
  //     bonuses: 0,
  //     _id: "64c21f5a3dc3aa01c651e175",
  //     name: "ArtemAdm",
  //     email: "officialigonin@mail.ru",
  //   },
  //   viewsCount: 0,
  //   __v: 0,
  //   _id: "64c433ea4ffff67da2b905be",
  // };
  const items = [
    {imageURL: "", title: "---", price: 111},
    {imageURL: "", title: "---", price: 111},
    {imageURL: "", title: "---", price: 111},
    // {imageURL: "", title: "---", price: 111},
    // {imageURL: "", title: "---", price: 111},
    // {imageURL: "", title: "---", price: 111},
    // {imageURL: "", title: "---", price: 111},
  ];
  // const items: any[] = [];
  const orderPrice = 234532;
  return (
    <div
      className={`${classes.overlay} ${
        isCartOpened ? classes.overlayVisible : ""
      }`}
    >
      <div className={classes.shopCart}>
        <h2 className={classes.shopCartTitle}>
          Package
          <img
            onClick={onCloseCart}
            className={classes.shopCartCloseBtn}
            src={RemoveIcon}
            alt="Close"
          />
        </h2>

        {items && items.length > 0 ? (
          <div className={classes.shopCartItems}>
            <div className={classes.items}>
              {/* <shopCartItem/> */}
              {items.map(obj => (
                <div key={obj.imageURL} className={classes.cartItem}>
                  <div
                    style={{backgroundImage: `url(${obj.imageURL})`}}
                    className={classes.cartItemImg}
                  ></div>
                  <div className={classes.cartItem__info}>
                    <p className={classes.cartItem__text}>{obj.title}</p>
                    <b className={classes.cartItem__price}>{obj.price} rub</b>
                  </div>
                  <img
                    // onClick={() => onRemove(obj.id)}
                    className={classes.cartItem__removeBtn}
                    width={32}
                    height={32}
                    src={RemoveIcon}
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <Link
              to={APP_AUTH_ROUTES.order.link}
              // onClick={onClickOrder}
              className={classes.createOrderBtn}
            >
              Оформить заказ
            </Link>
          </div>
        ) : (
          <div className={classes.emptyCart}>
            <img src={EmptyCartImg} alt="emptyCart" width={150} height={150} />
            Cart empty
          </div>
        )}
      </div>
    </div>
  );
};
export default ModalCart;
