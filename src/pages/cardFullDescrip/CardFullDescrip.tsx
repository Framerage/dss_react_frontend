import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {
  catalogCardDescrip,
  catalogCardDescripError,
  catalogCardDescripIsLoading,
  selectCardDeleteRequest,
  selectCardDeleteRequestError,
  selectCardDeleteRequestIsLoading,
} from "store/modules/catalog/selectors";
import {
  editCatalogCardFx,
  getCardFullDescripFx,
  removeCardFromCatalog,
} from "store/modules/catalog/async-actions";
import PointLoader from "components/pointLoader/PointLoader";
import ImageSlider from "components/imageSlider/ImageSlider";
import {useCheckCardTheme} from "hooks/catalog/useCheckCardTheme";
import cn from "classnames";
import Unliked from "assets/icons/heart.svg";
import Liked from "assets/icons/fillHeart.svg";
import classes from "./cardFullDescrip.module.css";
import {selectUserData} from "store/modules/auth/selectors";
import {editUserExtraInfoFx} from "store/modules/auth/async-actions";
import Cookies from "js-cookie";
import DeleteIcon from "assets/icons/btn-remove.svg";
import {resetCardRemovingResult} from "store/modules/catalog/actions";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";

const CardFullDescrip = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathParam = useParams<{id: string}>();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserData);

  const cardDescrip = useSelector(catalogCardDescrip);
  const cardDescripIsLoading = useSelector(catalogCardDescripIsLoading);
  const cardDescripError = useSelector(catalogCardDescripError);

  const removeRequest = useSelector(selectCardDeleteRequest);
  const removeRequestIsLoading = useSelector(selectCardDeleteRequestIsLoading);
  const removeRequestError = useSelector(selectCardDeleteRequestError);

  const accS = Cookies.get("perAcTkn");

  const cardTheme = useCheckCardTheme(cardDescrip);

  const [isCardLiked, setIsCardLiked] = useState(false);
  const [cardLikes, setCardLikes] = useState(
    cardDescrip && cardDescrip.likes ? cardDescrip.likes : 0,
  );

  useEffect(() => {
    if (cardDescrip) {
      setIsCardLiked(
        Boolean(
          userInfo &&
            cardDescrip &&
            userInfo.userLikes.includes(cardDescrip._id),
        ),
      );
      setCardLikes(cardDescrip.likes || 0);
      if (cardDescrip._id === pathParam.id) {
        return;
      }
      pathParam.id && dispatch(getCardFullDescripFx(pathParam.id));
      return;
    }
    pathParam.id && dispatch(getCardFullDescripFx(pathParam.id));
  }, [cardDescrip]);

  useEffect(() => {
    if (removeRequest && removeRequest.success) {
      dispatch(resetCardRemovingResult());
      navigate(
        accS ? APP_AUTH_ROUTES.catalog.link : APP_GENERAL_ROUTES.catalog.link,
      );
    }
  }, [removeRequest]);
  const onSendLike = () => {
    cardDescrip &&
      dispatch(
        editCatalogCardFx({
          ...cardDescrip,
          likes: isCardLiked ? cardLikes - 1 : cardLikes + 1,
        }),
      );
    if (userInfo && accS && cardDescrip) {
      dispatch(
        editUserExtraInfoFx({
          user: {
            ...userInfo,
            userLikes: isCardLiked
              ? userInfo.userLikes.filter(el => el !== cardDescrip._id)
              : [...userInfo.userLikes, cardDescrip._id],
          },
          auth: accS,
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

  const onDeleteCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const check = window.prompt("Are you sure want to delete? Enter pass");
    check === process.env.REACT_APP_ADM_PSS &&
      cardDescrip &&
      accS &&
      dispatch(removeCardFromCatalog({id: cardDescrip._id, auth: accS}));
  };
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
              <button
                onClick={e => onDeleteCard(e)}
                title="Delete card"
                className={classes.deleteBtn}
              >
                <img src={DeleteIcon} alt="delBtn" />
              </button>
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
            <div>
              {removeRequest &&
                !removeRequest.success &&
                removeRequestError &&
                removeRequestError}
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
