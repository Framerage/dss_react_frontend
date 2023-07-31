import React, {useMemo} from "react";
import {CatalogCardNesting, cardThemes} from "typings/catalogCards";
import ImageSlider from "components/imageSlider/ImageSlider";

import classes from "./catalogCard.module.css";
interface CardProps {
  card?: CatalogCardNesting;
  onClickCard?: (id: string) => void;
}
const CatalogCard: React.FC<CardProps> = ({card, onClickCard}) => {
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

  return (
    <div
      className={classes.cardContainer}
      onClick={() => {
        onClickCard && card && onClickCard(card._id);
      }}
    >
      <div className={classes.cardPreview}>
        <ImageSlider images={cardImages} />
        <div className={classes.extraCardInfo}>styles</div>
        <div className={classes.extraCardInfo}>
          <div className={classes.extraInfoText}>
            Views:&nbsp;{card && card.viewsCount ? card.viewsCount : 0}
          </div>
          <div className={classes.extraInfoText}>
            Likes:&nbsp;{card && card.likes ? card.viewsCount : 0}
          </div>
        </div>
      </div>
      <div className={classes.cardInfo}>
        <div className={classes.infoCardTitle}>{card?.title}</div>
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
        <div>addBtn</div>
      </div>
    </div>
  );
};
export default CatalogCard;
