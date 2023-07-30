import React, {useMemo} from "react";
import defaultImg from "assets/images/defaultCardImg.png";
import {CatalogCardNesting, cardThemes} from "typings/catalogCards";
import classes from "./catalogCard.module.css";
import {setBase64Image} from "helpers/appHelpers";
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
  const cardImage =
    card && card.imgUrl.length > 0
      ? setBase64Image("", card.imgUrl[0])
      : defaultImg;
  return (
    <div
      className={classes.cardContainer}
      onClick={() => {
        onClickCard && card && onClickCard(card._id);
      }}
    >
      <div className={classes.cardPreview}>
        <img src={cardImage} alt="cardImg" className={classes.cardImg} />
        <div className={classes.extraCardInfo}>slider</div>
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
        <div>addBtn</div>
      </div>
    </div>
  );
};
export default CatalogCard;