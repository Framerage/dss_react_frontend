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
import {selectAuthData} from "store/modules/auth/selectors";

import classes from "./catalog.module.css";
import AppSearcher from "components/appSearcher/AppSearcher";
import {useFiltredCards} from "hooks/catalog/useFiltredCards";
const Catalog = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const authRequest = useSelector(selectAuthData);

  const cards = useSelector(catalogCardsData);
  const cardsIsLoading = useSelector(catalogCardsIsLoading);
  const cardsError = useSelector(catalogCardsError);

  const choosedFilter = useSelector(choosedCatalogFilter);

  const filtredCards = useFiltredObj<CatalogCardNesting>(
    cards,
    "theme",
    choosedFilter,
  );
  const onGetCardDescrip = useCallback((cardId: string) => {
    navigation(FOR_GH_PAGES + APP_AUTH_ROUTES.catalog.link + "/" + cardId);
  }, []);

  const onGetCurrentFilter = (theme: string) =>
    dispatch(carrentCatalogFilter(theme));

  useEffect(() => {
    dispatch(getCatalogCardsFx());
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

  const [searchValue, setSearchValue] = useState("");
  const onSetSearchValue = (value: string) => {
    if (value) {
      dispatch(carrentCatalogFilter(""));
    }
    setSearchValue(value);
  };
  const filtredCardsBySearch = useFiltredCards(filtredCards, searchValue);
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
