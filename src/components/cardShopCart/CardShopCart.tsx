import React from "react";
import RemoveIcon from "assets/icons/btn-remove.svg";

import classes from "./cardShopCart.module.css";
import ImageSlider from "components/imageSlider/ImageSlider";
const CardShopCart = () => {
  const test = {
    createdAt: "2023-07-28T21:32:26.136Z",
    descrip: "Simple and nice decise for your home",
    fullDescrip:
      "Its does not afraid water and and sun, except for high temperature",
    imgUrl: [],
    likes: 0,
    price: 1599,
    theme: "volPrinter",
    title: "Decor vases",
    updatedAt: "2023-07-28T21:32:26.136Z",
    user: {
      bonuses: 0,
      _id: "64c21f5a3dc3aa01c651e175",
      name: "ArtemAdm",
      email: "officialigonin@mail.ru",
    },
    viewsCount: 0,
    __v: 0,
    _id: "64c433ea4ffff67da2b905be",
  };
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardPreview}>
        <ImageSlider images={test.imgUrl} scaled={false} />
        <span className={classes.descripItem}>Price: {test.price}</span>
      </div>
      <div className={classes.cardDescrip}>
        <span className={classes.descripItem}>{test.title}</span>
        <span className={classes.descripItem}>Theme: {test.theme}</span>
        <img
          // onClick={() => onRemove(obj.id)}
          className={classes.descripRemoveBtn}
          width={32}
          height={32}
          src={RemoveIcon}
          alt="Remove"
        />
      </div>
    </div>
  );
};
export default CardShopCart;
