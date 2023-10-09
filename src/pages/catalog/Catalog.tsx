import React, {useCallback, useEffect, useState} from "react";
import CatalogCard from "components/catalogCard/CatalogCard";
import {Link, useNavigate} from "react-router-dom";
import {APP_AUTH_ROUTES, FOR_GH_PAGES} from "utils/routes";
import {useDispatch, useSelector} from "react-redux";
import {
  catalogCardsData,
  catalogCardsError,
  catalogCardsIsLoading,
  choosedCatalogFilter,
} from "store/modules/catalog/selectors";
import PointLoader from "components/pointLoader/PointLoader";
import {AppDispatch} from "store";
import {
  editCatalogCardFx,
  getCatalogCardsFx,
} from "store/modules/catalog/async-actions";
import CatalogFilter from "components/catalogFilter";
import {carrentCatalogFilter} from "store/modules/catalog/actions";
import {useFiltredObj} from "hooks/useFilteredObj";
import {CatalogCardNesting} from "typings/catalogCards";
import {selectUserData} from "store/modules/auth/selectors";

import classes from "./catalog.module.css";
import AppSearcher from "components/appSearcher/AppSearcher";
import {useFiltredCards} from "hooks/catalog/useFiltredCards";
import {getUpdatedShopCartCards} from "store/modules/cart/selectors";
import {updateCardsOfCart} from "store/modules/cart/actions";
import {editUserExtraInfoFx} from "store/modules/auth/async-actions";
import Cookies from "js-cookie";

const Catalog: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const userInfo = useSelector(selectUserData);

  const accS = Cookies.get("perAcTkn") ?? "";
  const cards = useSelector(catalogCardsData);
  const cardsIsLoading = useSelector(catalogCardsIsLoading);
  const cardsError = useSelector(catalogCardsError);

  const choosedFilter = useSelector(choosedCatalogFilter);
  const shopCartCards = useSelector(getUpdatedShopCartCards);

  const [searchValue, setSearchValue] = useState("");

  const filtredCards = useFiltredObj<CatalogCardNesting>(
    cards,
    "theme",
    choosedFilter,
  );
  const filtredCardsBySearch = useFiltredCards(filtredCards, searchValue);

  useEffect(() => {
    dispatch(getCatalogCardsFx()).then(({payload}) => {
      if (
        userInfo &&
        userInfo.success &&
        !shopCartCards.length &&
        Array.isArray(payload)
      ) {
        const newCartList = payload
          .map((el: CatalogCardNesting) => {
            if (userInfo.userCart.some(card => card._id === el._id)) {
              return {...el, itemCount: 1};
            }
            return undefined;
          })
          .filter((item: any) => item !== undefined);
        dispatch(updateCardsOfCart(newCartList));
      }
    });
  }, []);

  const catalogFilterItems = [
    {title: "All", link: ""},
    {title: "Neon decor", link: "neon"},
    {title: "Wood cutting ", link: "plywood"},
    {title: "Laser engraving", link: "laserEngr"},
    {title: "Furniture", link: "furniture"},
    {title: "3D-printer", link: "volPrinter"},
    {title: "Relief pictures", link: "reliefPics"},
  ];

  const onSetSearchValue = useCallback(
    (value: string) => {
      if (value && choosedFilter) {
        dispatch(carrentCatalogFilter(""));
      }
      setSearchValue(value);
    },
    [choosedFilter],
  );

  const onGetCardDescrip = useCallback(
    (cardId: string) => {
      navigation(FOR_GH_PAGES + APP_AUTH_ROUTES.catalog.link + "/" + cardId);
    },
    [APP_AUTH_ROUTES.catalog.link],
  );

  const onGetCurrentFilter = (theme: string) =>
    dispatch(carrentCatalogFilter(theme));

  const addCardToShopCart = useCallback(
    (card: CatalogCardNesting) => {
      if (!userInfo || (userInfo && !userInfo.success)) {
        if (!shopCartCards.length) {
          dispatch(updateCardsOfCart([{...card, itemCount: 1}]));
          return;
        }
        if (shopCartCards.some(el => el._id === card._id)) {
          dispatch(
            updateCardsOfCart(
              shopCartCards
                .filter(el => el._id !== card._id)
                .map(item => {
                  return {...item, itemCount: 1};
                }),
            ),
          );
          return;
        }
        dispatch(updateCardsOfCart([...shopCartCards, card]));
        return;
      }
      if (!userInfo.userCart.length) {
        dispatch(
          editUserExtraInfoFx({
            user: {...userInfo, userCart: [card]},
            auth: accS,
          }),
        ).then(({payload}) =>
          dispatch(
            updateCardsOfCart(
              payload.userCart
                ? payload.userCart.map((el: CatalogCardNesting) => {
                    return {...el, itemCount: 1};
                  })
                : shopCartCards,
            ),
          ),
        );
        return;
      }
      if (userInfo.userCart.some(el => el._id === card._id)) {
        dispatch(
          editUserExtraInfoFx({
            user: {
              ...userInfo,
              userCart: userInfo.userCart.filter(el => el._id !== card._id),
            },
            auth: accS,
          }),
        ).then(({payload}) =>
          dispatch(
            updateCardsOfCart(
              payload.userCart
                ? payload.userCart.map((el: CatalogCardNesting) => {
                    return {...el, itemCount: 1};
                  })
                : shopCartCards,
            ),
          ),
        );
        return;
      }
      dispatch(
        editUserExtraInfoFx({
          user: {...userInfo, userCart: [...userInfo.userCart, card]},
          auth: accS,
        }),
      ).then(({payload}) =>
        dispatch(
          updateCardsOfCart(
            payload.userCart
              ? payload.userCart.map((el: CatalogCardNesting) => {
                  return {...el, itemCount: 1};
                })
              : shopCartCards,
          ),
        ),
      );
    },
    [shopCartCards, userInfo, accS],
  );
  const onSendLike = (
    catalogCard: CatalogCardNesting,
    isCardLiked: boolean,
    cardLikes: number,
  ) => {
    catalogCard &&
      dispatch(
        editCatalogCardFx({
          ...catalogCard,
          likes: isCardLiked ? cardLikes - 1 : cardLikes + 1,
        }),
      );
    if (userInfo && userInfo.success && accS && catalogCard) {
      dispatch(
        editUserExtraInfoFx({
          user: {
            ...userInfo,
            userLikes: isCardLiked
              ? userInfo.userLikes.filter(el => el !== catalogCard._id)
              : [...userInfo.userLikes, catalogCard._id],
          },
          auth: accS,
        }),
      );
    }
  };

  return (
    <div className={classes.catalogContainer}>
      <CatalogFilter
        filterItems={catalogFilterItems}
        onChooseFilter={onGetCurrentFilter}
      />
      <div className={classes.catalogContent}>
        <div className={classes.extraFunctional}>
          <AppSearcher onCreateSearchValue={onSetSearchValue} />
          {userInfo && userInfo.success && userInfo.role === "admin" && (
            <Link
              to={APP_AUTH_ROUTES.creatingCard.link}
              className={classes.createBtn}
            >
              &#43;&nbsp;Create new card
            </Link>
          )}
        </div>
        <div className={classes.catalogCards}>
          {!cardsIsLoading ? (
            filtredCardsBySearch && filtredCardsBySearch.length ? (
              filtredCardsBySearch.map(card => (
                <CatalogCard
                  key={card._id}
                  card={card}
                  onClickCard={onGetCardDescrip}
                  isCardAdded={
                    shopCartCards?.length > 0
                      ? shopCartCards.some(el => el._id.includes(card._id))
                      : false
                  }
                  onAddCardToCart={addCardToShopCart}
                  isAuthDone={!!(userInfo && userInfo.success)}
                  isUserLikedCard={Boolean(
                    userInfo &&
                      userInfo.success &&
                      userInfo.userLikes.includes(card._id),
                  )}
                  onLikeCard={onSendLike}
                />
              ))
            ) : (
              <div className={classes.warnText}>
                {cardsError ? "Error with getting data" : "Empty list"}
              </div>
            )
          ) : (
            <PointLoader scale={0.2} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Catalog;
