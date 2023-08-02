import React, {useEffect, useMemo, useState} from "react";
import {CatalogCardNesting, cardThemes} from "typings/catalogCards";
import ImageSlider from "components/imageSlider/ImageSlider";
import PlusIcon from "assets/icons/btn-plus.svg";
import AddedIcon from "assets/icons/btn-checked.svg";
import Unliked from "assets/icons/heart.svg";
import Liked from "assets/icons/liked.svg";
import classes from "./catalogCard.module.css";
interface CardProps {
  card?: CatalogCardNesting;
  onClickCard?: (id: string) => void;
}
const CatalogCard: React.FC<CardProps> = ({card, onClickCard}) => {
  const [isCardAdded, setIsCardAdded] = useState(false);
  const [isCardLiked, setIsCardLiked] = useState(false);
  const cardTheme = useMemo(() => {
    if (!card) {
      return cardThemes.some;
    }
    if (!card.theme) {
      return cardThemes.some;
    }
    const themes = Object.entries(cardThemes).map(key => {
      if (key[0] === card.theme) {
        return key[1];
      }
      return "";
    });
    return themes.filter(el => el && el)[0];
  }, [card, card?.theme]);

  const cardImages = card && card.imgUrl.length > 0 ? card.imgUrl : [];

  const onAddToPackage = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsCardAdded(!isCardAdded);
  };
  const onLikeCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsCardLiked(!isCardLiked);
  };
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardPreview}>
        <ImageSlider images={cardImages} />
        <div className={classes.extraCardInfo}>
          <div className={classes.extraInfoText}>
            Views:&nbsp;{card && card.viewsCount ? card.viewsCount : 0}
          </div>
          <div className={classes.extraInfoText}>
            Likes:&nbsp;{card && card.likes ? card.viewsCount : 0}
            <img
              src={isCardLiked ? Liked : Unliked}
              alt="like"
              width={25}
              height={25}
              onClick={onLikeCard}
            />
          </div>
        </div>
      </div>
      <div className={classes.cardInfo}>
        <div
          className={classes.infoCardTitle}
          onClick={() => {
            onClickCard && card && onClickCard(card._id);
          }}
        >
          {card?.title}
        </div>
        <div className={classes.infoCardTheme}>
          Theme:&nbsp;
          <br />
          {cardTheme}
        </div>
        <div className={classes.infoCardDescrip}>
          Description:&nbsp;
          <br />
          {card?.descrip || ""}
        </div>
        <div>{card?.price || 0}rub</div>
        <div className={classes.addBtnContainer}>
          <img
            src={isCardAdded ? AddedIcon : PlusIcon}
            alt="addBtn"
            className={classes.addBtn}
            onClick={onAddToPackage}
          />
        </div>
      </div>
    </div>
  );
};
export default CatalogCard;
