import React, {useState} from "react";
import {CatalogCardNesting} from "typings/catalogCards";
import ImageSlider from "components/imageSlider/ImageSlider";
import PlusIcon from "assets/icons/btn-plus.svg";
import AddedIcon from "assets/icons/btn-checked.svg";
import Unliked from "assets/icons/heart.svg";
import Liked from "assets/icons/fillHeart.svg";
import classes from "./catalogCard.module.css";
import {useCheckCardTheme} from "hooks/catalog/useCheckCardTheme";
interface CardProps {
  card?: CatalogCardNesting;
  onClickCard?: (id: string) => void;
  isCardAdded: boolean;
  isAuthDone: boolean;
  onAddCardToCart: (card: CatalogCardNesting) => void;
  isUserLikedCard: Boolean;
  onLikeCard: (
    card: CatalogCardNesting,
    isCardLiked: boolean,
    cardLikes: number,
  ) => void;
}
const CatalogCard: React.FC<CardProps> = ({
  card,
  onClickCard,
  isCardAdded,
  onAddCardToCart,
  isAuthDone,
  isUserLikedCard,
  onLikeCard,
}) => {
  const [isCardLiked, setIsCardLiked] = useState(isUserLikedCard);
  const cardTheme = useCheckCardTheme(card || null);
  const [cardLikes, setCardlikes] = useState(
    card && card.likes ? card.likes : 0,
  );
  const cardImages = card && card.imgUrl.length > 0 ? card.imgUrl : [];

  const onAddToPackage = (
    e: React.MouseEvent<HTMLElement>,
    card: CatalogCardNesting,
  ) => {
    e.stopPropagation();
    onAddCardToCart(card);
  };
  const onClickLike = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (isCardLiked) {
      if (cardLikes === 0) {
        return;
      }
      setIsCardLiked(!isCardLiked);
      setCardlikes(cardLikes - 1);
      card && onLikeCard(card, true, card.likes || 0);
      return;
    }
    setIsCardLiked(!isCardLiked);
    setCardlikes(cardLikes + 1);
    card && onLikeCard(card, false, card.likes || 0);
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
            Likes:&nbsp;{cardLikes}
            <img
              src={isCardLiked ? Liked : Unliked}
              alt="like"
              width={25}
              height={25}
              onClick={onClickLike}
              className={classes.cardLike}
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
          <span className={classes.descripText}>{card?.descrip || ""}</span>
        </div>
        <div>Price:&nbsp;{card?.price || 0}&nbsp;rub</div>
        {isAuthDone && (
          <div className={classes.addBtnContainer}>
            <img
              src={isCardAdded ? AddedIcon : PlusIcon}
              alt="addBtn"
              className={classes.addBtn}
              onClick={e => card && onAddToPackage(e, card)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default CatalogCard;
