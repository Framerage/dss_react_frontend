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
import CardShopCart from "components/cardShopCart";
const ModalCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isCartOpened = useSelector(isShopCartUse);

  const onCloseCart = () => {
    dispatch(isShoppingCartUse(false));
  };
  const items = [
    {imageURL: "", title: "---", price: 111},
    {imageURL: "", title: "---", price: 111},
    {imageURL: "", title: "---", price: 111},
    {imageURL: "", title: "---", price: 111},
    {imageURL: "", title: "---", price: 111},
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
                // <div key={obj.imageURL} className={classes.cartItem}>
                //   <div
                //     style={{backgroundImage: `url(${obj.imageURL})`}}
                //     className={classes.cartItemImg}
                //   ></div>
                //   <div className={classes.cartItem__info}>
                //     <p className={classes.cartItem__text}>{obj.title}</p>
                //     <b className={classes.cartItem__price}>{obj.price} rub</b>
                //   </div>
                //   <img
                //     // onClick={() => onRemove(obj.id)}
                //     className={classes.cartItem__removeBtn}
                //     width={32}
                //     height={32}
                //     src={RemoveIcon}
                //     alt="Remove"
                //   />
                // </div>
                <CardShopCart key={obj.price} />
              ))}
            </div>
            <div>Total: ---</div>
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
