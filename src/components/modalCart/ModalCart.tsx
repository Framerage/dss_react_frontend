import React, {useEffect, useMemo, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import RemoveIcon from "assets/icons/btn-remove.svg";
import EmptyCartImg from "assets/icons/emptyIcon.svg";
import {Link} from "react-router-dom";
import {APP_AUTH_ROUTES} from "utils/routes";
import CardShopCart from "components/cardShopCart";
import classes from "./modalCart.module.css";
import {AppDispatch} from "store";
import {
  getUpdatedShopCartCards,
  isShopCartUse,
} from "store/modules/cart/selectors";
import {selectAuthData} from "store/modules/auth/selectors";
import {isShoppingCartUse, updateCardsOfCart} from "store/modules/cart/actions";
import {editUserExtraInfoFx} from "store/modules/auth/async-actions";
import {getCatalogCardsFx} from "store/modules/catalog/async-actions";
import {CatalogCardNesting} from "typings/catalogCards";
import {catalogCardsData} from "store/modules/catalog/selectors";

const ModalCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isCartOpened = useSelector(isShopCartUse);
  const shopCartCards = useSelector(getUpdatedShopCartCards);
  const authRequest = useSelector(selectAuthData);
  const catalogCards = useSelector(catalogCardsData);
  const errorMsg = !catalogCards ? "Open catalog, please" : "Empty cart";

  useEffect(() => {
    isCartOpened &&
      !catalogCards &&
      dispatch(getCatalogCardsFx()).then(({payload}) => {
        if (authRequest) {
          const newCartList = payload
            .map((el: CatalogCardNesting) => {
              if (authRequest.userCart.some(card => card._id === el._id)) {
                return el;
              }
            })
            .filter((item: any) => item !== undefined);
          dispatch(updateCardsOfCart(newCartList));
        }
      });
  }, [isCartOpened, catalogCards]);
  const onCloseCart = () => {
    dispatch(isShoppingCartUse(false));
  };
  const totalPrice = useMemo(() => {
    if (!shopCartCards?.length) {
      return 0;
    }
    return shopCartCards.reduce((sum, el) => sum + el.price, 0);
  }, [shopCartCards]);

  const onRemoveCardFromCart = (id: string) => {
    dispatch(updateCardsOfCart(shopCartCards.filter(el => el._id !== id)));
    if (authRequest && authRequest.token) {
      dispatch(
        editUserExtraInfoFx({
          user: {
            ...authRequest,
            userCart: authRequest.userCart.filter(el => el._id !== id),
          },
          auth: authRequest.token,
        }),
      );
    }
  };

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
              {shopCartCards.map(card => (
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
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
};
export default ModalCart;
