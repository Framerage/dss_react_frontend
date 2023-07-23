import React, {useCallback} from "react";
import classes from "./catalog.module.css";
import CatalogCard from "components/catalogCard/CatalogCard";
import {useNavigate} from "react-router-dom";
import {APP_AUTH_ROUTES} from "utils/routes";
const cards = [
  {
    _id: "34534",
    title: "Relax point",
    text: "Excellent decision for your ad",
    styles: ["red", "green", "blue"],
    imgUrl:
      "https://static.tildacdn.com/tild6161-3935-4461-b131-386439663465/reklama-top.jpg",
    viewsCount: 0,
  },
  {
    _id: "356",
    title: "Relax point",
    text: "Nice decision for your ad",
    styles: ["red", "green", "blue"],
    imgUrl:
      "https://acrylic-pro.ru/wp-content/uploads/2009/07/uslugi4-300x300.jpg",
    viewsCount: 0,
  },
  {
    _id: "3234",
    title: "Relax point",
    text: "Notbad decision for your ad",
    styles: ["red", "green", "blue"],
    imgUrl:
      "https://static.tildacdn.com/tild6161-3935-4461-b131-386439663465/reklama-top.jpg",
    viewsCount: 0,
  },
];
const Catalog = () => {
  const navigation = useNavigate();
  const onGetCardDescrip = useCallback((id: string) => {
    navigation(APP_AUTH_ROUTES.catalog.link + "/" + id);
  }, []);
  return (
    <div className={classes.catalogContainer}>
      {cards.map(card => (
        <CatalogCard
          key={card._id}
          card={card}
          onClickCard={onGetCardDescrip}
        />
      ))}
    </div>
  );
};
export default Catalog;
