import React from "react";
import RemoveIcon from "assets/icons/btn-remove.svg";

import classes from "./cardShopCart.module.css";
import ImageSlider from "components/imageSlider/ImageSlider";
import {CatalogCardNesting} from "typings/catalogCards";
interface ShopCartCardProps {
  card: CatalogCardNesting;
  onRemove: (id: string) => void;
}
const CardShopCart: React.FC<ShopCartCardProps> = ({card, onRemove}) => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardPreview}>
        <ImageSlider images={card.imgUrl} />
        <span className={classes.descripItem}>
          Price:&nbsp;{card.price}&nbsp;rub
        </span>
      </div>
      <div className={classes.cardDescrip}>
        <span className={classes.descripItem}>{card.title}</span>
        <span className={classes.descripItem}>Theme: {card.theme}</span>
        <img
          onClick={() => onRemove(card._id)}
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
