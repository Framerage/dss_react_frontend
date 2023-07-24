import React, {useCallback, useEffect, useState} from "react";
import classes from "./catalog.module.css";
import CatalogCard from "components/catalogCard/CatalogCard";
import {useNavigate} from "react-router-dom";
import {APP_AUTH_ROUTES, FOR_GH_PAGES} from "utils/routes";
import axios from "axios";
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
  const onGetCardDescrip = useCallback((cardId: string) => {
    navigation(FOR_GH_PAGES + APP_AUTH_ROUTES.catalog.link + "/" + cardId);
  }, []);

  const [test, setTest] = useState<
    | {
        _id: string;
        title: string;
        text: string;
        styles: string[];
        imgUrl: string;
        viewsCount: number;
      }[]
    | null
  >(null);
  // useEffect(() => {
  //   const fetchCards = async () => {
  //     try {
  //       const response = await axios("http://127.0.0.1:3333/cards");
  //       if (response.status != 200) {
  //         console.log("err");
  //         return;
  //       }
  //       setTest(response.data);
  //       return;
  //     } catch (err) {
  //       console.log(err + " catch err");
  //       return;
  //     }
  //   };
  //   fetchCards();
  // }, []);
  return (
    <div className={classes.catalogContainer}>
      {test &&
        test.map(card => (
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
