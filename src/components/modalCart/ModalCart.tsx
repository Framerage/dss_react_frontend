import React, {useMemo, useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import classes from "./modalCart.module.css";
import {AppDispatch} from "store";
import {
  getUpdatedShopCartCards,
  isShopCartUse,
} from "store/modules/cart/selectors";
import {isShoppingCartUse, updateCardsOfCart} from "store/modules/cart/actions";
import RemoveIcon from "assets/icons/btn-remove.svg";
import EmptyCartImg from "assets/icons/emptyIcon.svg";
import {Link} from "react-router-dom";
import {APP_AUTH_ROUTES} from "utils/routes";
import CardShopCart from "components/cardShopCart";
const ModalCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isCartOpened = useSelector(isShopCartUse);
  const shopCartCards = useSelector(getUpdatedShopCartCards);

  const onCloseCart = () => {
    dispatch(isShoppingCartUse(false));
  };
  const totalPrice = useMemo(() => {
    if (!shopCartCards.length) {
      return 0;
    }
    return shopCartCards.reduce((sum, el) => sum + el.price, 0);
  }, [shopCartCards]);

  const onRemoveCardFromCart = (id: string) =>
    dispatch(updateCardsOfCart(shopCartCards.filter(el => el._id !== id)));
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

        {shopCartCards && shopCartCards.length > 0 ? (
          <div className={classes.shopCartItems}>
            <div className={classes.items}>
              {/* <shopCartItem/> */}
              {shopCartCards.map(card => (
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
                <CardShopCart
                  key={card._id}
                  card={card}
                  onRemove={onRemoveCardFromCart}
                />
              ))}
            </div>
            <div className={classes.totalPrice}>
              Total:&nbsp;{totalPrice}&nbsp;rub
            </div>
            <Link
              // to={APP_AUTH_ROUTES.order.link}
              to={"#"}
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
