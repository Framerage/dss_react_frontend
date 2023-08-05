import React, {useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import classes from "./modalCart.module.css";
import {AppDispatch} from "store";
import {isShopCartUse} from "store/modules/cart/selectors";
import {isShoppingCartUse} from "store/modules/cart/actions";
import RemoveIcon from "assets/icons/btn-remove.svg";
import EmptyCartImg from "assets/icons/emptyIcon.svg";
import ArrowIcon from "assets/icons/arrow.svg";
const ModalCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isCartOpened = useSelector(isShopCartUse);

  const onCloseCart = () => {
    console.log("close cart");
    dispatch(isShoppingCartUse(false));
  };
  // const items = [
  //   {imageURL: "", title: "---", price: 111},
  //   {imageURL: "", title: "---", price: 111},
  //   {imageURL: "", title: "---", price: 111},
  //   {imageURL: "", title: "---", price: 111},
  //   {imageURL: "", title: "---", price: 111},
  //   {imageURL: "", title: "---", price: 111},
  //   {imageURL: "", title: "---", price: 111},
  // ];
  const items: any[] = [];
  const orderPrice = 234532;
  return (
    <div
      className={`${classes.overlay} ${
        isCartOpened ? classes.overlayVisible : ""
      }`}
    >
      <div className={classes.drawer}>
        <h2 className={classes.drawerTitle}>
          Package
          <img
            onClick={onCloseCart}
            className={classes.drawer__removeBtn}
            width={32}
            height={32}
            src={RemoveIcon}
            alt="Close"
          />
        </h2>

        {items && items.length > 0 ? (
          <div className={classes.drawerItems}>
            <div className={classes.items}>
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
            <div className={classes.overlay__total}>
              <ul>
                <li className={classes.overlay__total__item}>
                  <span>Итого:</span>
                  <b>{orderPrice} руб.</b>
                </li>
              </ul>
              <button
                // disabled={isLoadingOrders}
                // onClick={onClickOrder}
                className={classes.greenBtn}
              >
                Оформить заказ <img src={ArrowIcon} alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div className={classes.emptyCart}>
            <img src={EmptyCartImg} alt="emptyCart" width={150} height={150} />
            Empty
          </div>
          //   <Info
          //     title={isOrderComlete ? "Order comleted" : "Cart empty"}
          //     description={
          //       isOrderComlete
          //         ? `Your order #${orderId} will sent`
          //         : "Please add some order"
          //     }
          //     image={
          //       isOrderComlete
          //         ? "./img/complete-order.jpg"
          //         : "./img/empty-cart.jpg"
          //     }
          //   />
        )}
      </div>
    </div>
  );
};
export default ModalCart;
