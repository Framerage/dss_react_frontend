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
import {getCatalogCardsFx} from "store/modules/catalog/async-actions";
import CatalogFilter from "components/catalogFilter";
import {carrentCatalogFilter} from "store/modules/catalog/actions";
import {useFiltredObj} from "hooks/useFilteredObj";
import {CatalogCardNesting} from "typings/catalogCards";
import {
  selectAuthData,
  selectEditUserExtraInfoResult,
  selectEditUserExtraInfoResultError,
  selectEditUserExtraInfoResultIsLoading,
} from "store/modules/auth/selectors";

import classes from "./catalog.module.css";
import AppSearcher from "components/appSearcher/AppSearcher";
import {useFiltredCards} from "hooks/catalog/useFiltredCards";
import {getUpdatedShopCartCards} from "store/modules/cart/selectors";
import {updateCardsOfCart} from "store/modules/cart/actions";
import {editUserExtraInfoFx} from "store/modules/auth/async-actions";
const Catalog = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const authRequest = useSelector(selectAuthData);

  const cards = useSelector(catalogCardsData);
  const cardsIsLoading = useSelector(catalogCardsIsLoading);
  const cardsError = useSelector(catalogCardsError);

  const choosedFilter = useSelector(choosedCatalogFilter);
  const shopCartCards = useSelector(getUpdatedShopCartCards);
  const editingCardResult = useSelector(selectEditUserExtraInfoResult);
  const editingCardResultIsLoading = useSelector(
    selectEditUserExtraInfoResultIsLoading,
  );
  const editingCardResultError = useSelector(
    selectEditUserExtraInfoResultError,
  );

  const [searchValue, setSearchValue] = useState("");

  const filtredCards = useFiltredObj<CatalogCardNesting>(
    cards,
    "theme",
    choosedFilter,
  );
  const filtredCardsBySearch = useFiltredCards(filtredCards, searchValue);

  useEffect(() => {
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

  const onSetSearchValue = (value: string) => {
    if (value && choosedFilter) {
      dispatch(carrentCatalogFilter(""));
    }
    setSearchValue(value);
  };

  const onGetCardDescrip = useCallback((cardId: string) => {
    navigation(FOR_GH_PAGES + APP_AUTH_ROUTES.catalog.link + "/" + cardId);
  }, []);

  const onGetCurrentFilter = (theme: string) =>
    dispatch(carrentCatalogFilter(theme));

  const addCardToShopCart = useCallback(
    (card: CatalogCardNesting) => {
      if (!authRequest) {
        if (!shopCartCards.length) {
          dispatch(updateCardsOfCart([card]));
          return;
        }
        if (shopCartCards.some(el => el._id === card._id)) {
          dispatch(
            updateCardsOfCart(shopCartCards.filter(el => el._id !== card._id)),
          );
          return;
        }
        dispatch(updateCardsOfCart([...shopCartCards, card]));
        return;
      }
      if (!authRequest.userCart.length) {
        dispatch(
          editUserExtraInfoFx({
            user: {...authRequest, userCart: [card]},
            auth: authRequest.token,
          }),
        ).then(({payload}) => dispatch(updateCardsOfCart(payload.userCart)));
        return;
      }
      if (authRequest.userCart.some(el => el._id === card._id)) {
        dispatch(
          editUserExtraInfoFx({
            user: {
              ...authRequest,
              userCart: authRequest.userCart.filter(el => el._id !== card._id),
            },
            auth: authRequest.token,
          }),
        ).then(({payload}) => dispatch(updateCardsOfCart(payload.userCart)));
        return;
      }
      dispatch(
        editUserExtraInfoFx({
          user: {...authRequest, userCart: [...authRequest.userCart, card]},
          auth: authRequest.token,
        }),
      ).then(({payload}) => dispatch(updateCardsOfCart(payload.userCart)));
    },
    [shopCartCards, authRequest],
  );
  return (
    <div className={classes.catalogContainer}>
      <CatalogFilter
        filterItems={catalogFilterItems}
        onChooseFilter={onGetCurrentFilter}
      />
      <div className={classes.catalogContent}>
        <div className={classes.extraFunctional}>
          <AppSearcher onCreateSearchValue={onSetSearchValue} />
          {authRequest && authRequest.role === "admin" && (
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
                  isCardAdded={shopCartCards.some(el =>
                    el._id.includes(card._id),
                  )}
                  onAddCardToCart={addCardToShopCart}
                  isAuthDone={!!authRequest}
                />
              ))
            ) : (
              <div className={classes.warnText}>
                {cardsError ? "Error with getting data" : "Empty list"}
              </div>
            )
          ) : (
            <PointLoader scale={0.4} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Catalog;
