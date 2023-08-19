import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {
  catalogCardDescrip,
  catalogCardDescripError,
  catalogCardDescripIsLoading,
} from "store/modules/catalog/selectors";
import {
  editCatalogCardFx,
  getCardFullDescripFx,
} from "store/modules/catalog/async-actions";
import PointLoader from "components/pointLoader/PointLoader";
import ImageSlider from "components/imageSlider/ImageSlider";
import {useCheckCardTheme} from "hooks/catalog/useCheckCardTheme";
import cn from "classnames";
import Unliked from "assets/icons/heart.svg";
import Liked from "assets/icons/fillHeart.svg";
import classes from "./cardFullDescrip.module.css";
import {selectAuthData} from "store/modules/auth/selectors";
import {editUserExtraInfoFx} from "store/modules/auth/async-actions";

const CardFullDescrip = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathParam = useParams<{id: string}>();

  const authRequest = useSelector(selectAuthData);

  const cardDescrip = useSelector(catalogCardDescrip);
  const cardDescripIsLoading = useSelector(catalogCardDescripIsLoading);
  const cardDescripError = useSelector(catalogCardDescripError);

  const cardTheme = useCheckCardTheme(cardDescrip);

  const [isCardLiked, setIsCardLiked] = useState(false);
  const [cardLikes, setCardLikes] = useState(
    cardDescrip && cardDescrip.likes ? cardDescrip.likes : 0,
  );
  useEffect(() => {
    setIsCardLiked(
      Boolean(
        authRequest &&
          cardDescrip &&
          authRequest.userLikes.includes(cardDescrip._id),
      ),
    );
  }, []);

  const onSendLike = () => {
    cardDescrip &&
      dispatch(
        editCatalogCardFx({
          ...cardDescrip,
          likes: isCardLiked ? cardLikes - 1 : cardLikes + 1,
        }),
      );
    if (authRequest && authRequest.token && cardDescrip) {
      dispatch(
        editUserExtraInfoFx({
          user: {
            ...authRequest,
            userLikes: isCardLiked
              ? authRequest.userLikes.filter(el => el !== cardDescrip._id)
              : [...authRequest.userLikes, cardDescrip._id],
          },
          auth: authRequest.token,
        }),
      );
    }
  };
  const onLikeCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsCardLiked(!isCardLiked);
    if (isCardLiked) {
      if (cardLikes === 0) {
        return;
      }
      setCardLikes(cardLikes - 1);
      onSendLike();
      return;
    }
    setCardLikes(cardLikes + 1);
    onSendLike();
  };
  useEffect(() => {
    if (cardDescrip) {
      if (cardDescrip._id === pathParam.id) {
        return;
      }
      pathParam.id && dispatch(getCardFullDescripFx(pathParam.id));
      return;
    }
    pathParam.id && dispatch(getCardFullDescripFx(pathParam.id));
  }, []);

  return (
    <>
      {!cardDescripIsLoading ? (
        cardDescrip ? (
          <div className={classes.fullDescripContainer}>
            <div className={classes.cardContent}>
              <div className={classes.contentSlider}>
                <ImageSlider
                  images={cardDescrip.imgUrl ? cardDescrip.imgUrl : []}
                />
              </div>
              <div className={classes.contentItems}>
                <div className={classes.contentItem}>
                  {cardDescrip.title || "-"}
                </div>
                <div className={cn(classes.contentItem, classes.lowerSize)}>
                  Theme:&nbsp;{cardTheme}
                </div>
                <div className={cn(classes.contentItem, classes.lowerSize)}>
                  Descrip:&nbsp;{cardDescrip.descrip || "-"}
                </div>
              </div>
            </div>
            <div className={classes.cardExtraContent}>
              <div className={classes.extraContItem}>
                Views:&nbsp;{cardDescrip.viewsCount || 0}
              </div>
              <div className={classes.extraContItem}>
                Likes:&nbsp;{cardLikes}
                <img
                  src={isCardLiked ? Liked : Unliked}
                  alt="like"
                  width={25}
                  height={25}
                  onClick={onLikeCard}
                  className={classes.cardLike}
                />
              </div>
              <div className={classes.extraContItem}>
                Price:&nbsp;{cardDescrip.price || 0}&nbsp;rub
              </div>
            </div>
            <div className={classes.cardFullDescrip}>
              {cardDescrip.fullDescrip || "-"}
            </div>
          </div>
        ) : (
          <div className={classes.errorInfo}>{cardDescripError || "Error"}</div>
        )
      ) : (
        <PointLoader scale={0.5} />
      )}
    </>
  );
};
export default CardFullDescrip;
