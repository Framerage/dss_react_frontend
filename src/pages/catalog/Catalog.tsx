import React, {useCallback, useEffect, useState} from "react";
import classes from "./catalog.module.css";
import CatalogCard from "components/catalogCard/CatalogCard";
import {useNavigate} from "react-router-dom";
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
const cardsTest = [
  {
    _id: "34534",
    title: "Relax point",
    descrip: "Excellent decision for your ad",
    styles: ["red", "green", "blue"],
    imgUrl: [
      [
        "https://static.tildacdn.com/tild6161-3935-4461-b131-386439663465/reklama-top.jpg",
      ],
    ],
    viewsCount: 0,
    likes: 0,
    theme: "neon",
  },
  {
    _id: "356",
    title: "Relax point",
    descrip: "Nice decision for your ad",
    styles: ["red", "green", "blue"],
    imgUrl: [
      ["https://acrylic-pro.ru/wp-content/uploads/2009/07/uslugi4-300x300.jpg"],
    ],
    viewsCount: 0,
    likes: 0,
    theme: "laserEngr",
  },
  {
    _id: "3234",
    title: "Relax point",
    descrip: "Notbad decision for your ad",
    styles: ["red", "green", "blue"],
    imgUrl: [
      [
        "https://static.tildacdn.com/tild6161-3935-4461-b131-386439663465/reklama-top.jpg",
      ],
    ],
    viewsCount: 0,
    likes: 0,
    theme: "neon",
  },
];
const Catalog = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const cards = useSelector(catalogCardsData);
  const cardsIsLoading = useSelector(catalogCardsIsLoading);
  const cardsError = useSelector(catalogCardsError);

  const choosedFilter = useSelector(choosedCatalogFilter);

  const filtredCards = useFiltredObj<CatalogCardNesting>(
    cardsTest,
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

  return (
    <div className={classes.catalogContainer}>
      <CatalogFilter
        filterItems={catalogFilterItems}
        onChooseFilter={onGetCurrentFilter}
      />
      <div className={classes.catalogContent}>
        {!cardsIsLoading ? (
          filtredCards && filtredCards.length ? (
            filtredCards.map(card => (
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
  );
};
export default Catalog;
