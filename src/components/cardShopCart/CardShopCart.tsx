import React, {useState} from "react";
import RemoveIcon from "assets/icons/btn-remove.svg";

import classes from "./cardShopCart.module.css";
import ImageSlider from "components/imageSlider/ImageSlider";
import {ShopCartCardsForOrder} from "typings/catalogCards";
interface ShopCartCardProps {
  card: ShopCartCardsForOrder;
  onRemove: (id: string) => void;
  onChangeCount: (id: string, count: number) => void;
}
const CardShopCart: React.FC<ShopCartCardProps> = ({
  card,
  onRemove,
  onChangeCount,
}) => {
  const [counter, setCounter] = useState(card.itemCount);
  const handlerOnChangeCount = (count: number) => {
    setCounter(count);
    onChangeCount(card._id, count);
  };
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardPreview}>
        <ImageSlider images={card.imgUrl} />
        <span className={classes.descripItem}>
          Price:&nbsp;{card.price * counter}&nbsp;rub
        </span>
      </div>
      <div className={classes.cardDescrip}>
        <span className={classes.descripItem}>{card.title}</span>
        <span className={classes.descripItem}>Theme: {card.theme}</span>
        <div className={classes.extraItem}>
          <div className={classes.orderCounter}>
            <input
              type="number"
              min={1}
              max={20}
              value={counter}
              onChange={e => handlerOnChangeCount(Number(e.target.value))}
            />
          </div>
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
    </div>
  );
};
export default CardShopCart;