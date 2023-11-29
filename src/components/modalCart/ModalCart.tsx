import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import CardShopCart from "components/cardShopCart";
import PointLoader from "components/pointLoader";
import {APP_AUTH_ROUTES} from "utils/routes";
import RemoveIcon from "assets/icons/btn-remove.svg";
import EmptyCartImg from "assets/icons/emptyIcon.svg";

import {AppDispatch} from "store";
import {useDispatch, useSelector} from "react-redux";
import {
  getUpdatedShopCartCards,
  isShopCartUse,
} from "store/modules/cart/selectors";
import {selectUserData} from "store/modules/auth/selectors";
import {isShoppingCartUse, updateCardsOfCart} from "store/modules/cart/actions";
import {editUserExtraInfoFx} from "store/modules/auth/async-actions";
import {getCatalogCardsFx} from "store/modules/catalog/async-actions";
import {
  catalogCardsData,
  catalogCardsIsLoading,
} from "store/modules/catalog/selectors";

import {CatalogCardNesting} from "typings/catalogCards";
import Cookies from "js-cookie";
import classes from "./modalCart.module.css";

const ModalCart: React.FC = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const isCartOpened = useSelector(isShopCartUse);
  const shopCartCards = useSelector(getUpdatedShopCartCards);
  const userInfo = useSelector(selectUserData);
  const catalogCards = useSelector(catalogCardsData);
  const cardsIsLoading = useSelector(catalogCardsIsLoading);
  const errorMsg = !catalogCards ? "Open catalog, please" : "Empty cart";
  const accS = Cookies.get("perAcTkn");

  const [totalPrice, setTotalPrice] = useState(() => {
    if (!shopCartCards.length) {
      return 0;
    }
    return shopCartCards.reduce((sum, el) => sum + el.price * el.itemCount, 0);
  });

  useEffect(() => {
    if (!shopCartCards.length) {
      setTotalPrice(0);
      return;
    }
    setTotalPrice(() =>
      shopCartCards.reduce((sum, el) => sum + el.price * el.itemCount, 0),
    );
  }, [shopCartCards]);

  const createCartList = (
    arr: CatalogCardNesting[],
    userCart: CatalogCardNesting[],
  ) => {
    return arr
      .map((el: CatalogCardNesting) => {
        if (userCart.some(card => card._id === el._id)) {
          return {...el, itemCount: 1};
        }
        return undefined;
      })
      .filter((item: CatalogCardNesting | undefined) => item !== undefined);
  };
  useEffect(() => {
    isCartOpened &&
      !catalogCards &&
      dispatch(getCatalogCardsFx()).then(({payload}) => {
        if (userInfo && userInfo.userCart && Array.isArray(payload)) {
          const newCartList = createCartList(payload, userInfo.userCart);
          dispatch(updateCardsOfCart(newCartList));
        }
        return;
      });
    if (
      isCartOpened &&
      catalogCards &&
      userInfo &&
      userInfo.userCart &&
      !shopCartCards.length
    ) {
      const newCartList = createCartList(catalogCards, userInfo.userCart);
      dispatch(updateCardsOfCart(newCartList));
    }
  }, [isCartOpened, catalogCards, userInfo]);

  const onCloseCart = useCallback(() => {
    dispatch(isShoppingCartUse(false));
  }, []);

  const onRemoveCardFromCart = useCallback(
    (id: string) => {
      dispatch(updateCardsOfCart(shopCartCards.filter(el => el._id !== id)));
      if (userInfo && accS) {
        dispatch(
          editUserExtraInfoFx({
            user: {
              ...userInfo,
              userCart: userInfo.userCart.filter(el => el._id !== id),
            },
            auth: accS,
          }),
        );
      }
    },
    [userInfo, accS, shopCartCards],
  );

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
              to={APP_AUTH_ROUTES.order.link}
              onClick={onCloseCart}
              className={classes.createOrderBtn}
            >
              Оформить заказ
            </Link>
          </div>
        ) : !cardsIsLoading ? (
          <div className={classes.emptyCart}>
            <img src={EmptyCartImg} alt="emptyCart" width={150} height={150} />
            {errorMsg}
          </div>
        ) : (
          <PointLoader scale={0.3} />
        )}
      </div>
    </div>
  );
});
export default ModalCart;
