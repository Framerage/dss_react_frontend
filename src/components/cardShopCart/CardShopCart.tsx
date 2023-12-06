import React, {useEffect, useState} from "react";
import RemoveIcon from "assets/icons/btn-remove.svg";
import {ShopCartCardsForOrder} from "typings/catalogCards";
import ImageSlider from "components/imageSlider/ImageSlider";

import {useDebounce} from "hooks/useDebounce";
import classes from "./cardShopCart.module.css";
import {useDispatch} from "react-redux";
import {AppDispatch} from "store";
import {updateCardCountOfCart} from "store/modules/cart/actions";

interface ShopCartCardProps {
  card: ShopCartCardsForOrder;
  onRemove: (id: string) => void;
}
const CardShopCart: React.FC<ShopCartCardProps> = React.memo(
  ({card, onRemove}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [counter, setCounter] = useState(card.itemCount || 1);
    const {debouncedValue, isValueLoading} = useDebounce<typeof counter>(
      counter,
      2000,
    );
    const handlerOnChangeCount = (count: number) => {
      setCounter(count);
    };

    // const onChangeOrdersCount = useCallback(
    //   (id: string, count: number) => {
    //     dispatch(
    //       updateCardsOfCart(
    //         shopCartCards.map(el => {
    //           if (el._id === id) {
    //             return {...el, itemCount: count};
    //           }
    //           return el;
    //         }),
    //       ),
    //     );
    //   },
    //   [shopCartCards],
    // );
    useEffect(() => {
      dispatch(
        updateCardCountOfCart({cardId: card._id, count: debouncedValue}),
      );
    }, [debouncedValue]);

    return (
      <div className={classes.cardContainer}>
        <div className={classes.cardPreview}>
          <ImageSlider images={card.imgUrl} />
          <span className={classes.descripItem}>
            Price:&nbsp;{card.price * counter}&nbsp;rub
            {isValueLoading && " ..."}
          </span>
        </div>
        <div className={classes.cardDescrip}>
          <span className={classes.descripItem}>{card.title}</span>
          <span className={classes.descripItem}>Theme: {card.theme}</span>
          <div className={classes.extraItem}>
            <div className={classes.orderCounter}>
              <input
                type="number"
                id="cardCounter"
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
  },
);
export default CardShopCart;
