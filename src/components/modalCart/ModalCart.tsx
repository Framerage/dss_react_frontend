import React, {useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import classes from "./modalCart.module.css";
import {AppDispatch} from "store";
import {isShopCartUse} from "store/modules/cart/selectors";
import {isShoppingCartUse} from "store/modules/cart/actions";
import RemoveIcon from "assets/icons/btn-remove.svg";
import EmptyCartImg from "assets/images/empty-cart.jpg";
const ModalCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isCartOpened = useSelector(isShopCartUse);

  const onCloseCart = () => {
    console.log("close cart");
    dispatch(isShoppingCartUse(false));
  };
  const items = [{imageURL: "", title: "---", price: 111}];
  const orderPrice = 234532;
  return (
    <div
      className={`${classes.overlay} ${
        isCartOpened ? classes.overlayVisible : ""
      }`}
    >
      <div className={`${classes.drawer} ${isCartOpened ? "" : ""}`}>
        <h2 style={{marginBottom: "30px"}} className={classes.drawerTitle}>
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

        {items.length > 0 ? (
          <div className="drawerItems">
            <div className="items">
              {items.map(obj => (
                <div key={obj.imageURL} className="cartItem">
                  <div
                    style={{backgroundImage: `url(${obj.imageURL})`}}
                    className="cartItemImg"
                  ></div>
                  <div className="cartItem__info">
                    <p className="cartItem__text">{obj.title}</p>
                    <b>{obj.price} rub</b>
                  </div>
                  <img
                    // onClick={() => onRemove(obj.id)}
                    className="cartItem__removeBtn"
                    width={32}
                    height={32}
                    src={RemoveIcon}
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="overlay__total">
              <ul>
                <li className="overlay__total__item">
                  <span>Итого:</span>
                  <div></div>
                  <b>{orderPrice} руб.</b>
                </li>
                <li className="overlay__total__item">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.ceil(orderPrice * 0.05)} руб.</b>
                </li>
              </ul>
              <button
                // disabled={isLoadingOrders}
                // onClick={onClickOrder}
                className="greenBtn"
              >
                Оформить заказ <img src={EmptyCartImg} alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div>anything</div>
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
