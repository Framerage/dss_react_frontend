import React from "react";
import classes from "./catalogCard.module.css";
import {useParams} from "react-router-dom";
interface CardProps {
  card?: {
    _id: string;
    title: string;
    text: string;
    styles: string[];
    imgUrl: string;
    viewsCount: number;
  };
  onClickCard?: (id: string) => void;
}
const CatalogCard: React.FC<CardProps> = ({card, onClickCard}) => {
  const reqParams = useParams();
  console.log(reqParams.id, "req");
  return (
    <div
      className={classes.cardContainer}
      onClick={() => {
        onClickCard && card && onClickCard(card._id);
      }}
    >
      card
    </div>
  );
};
export default CatalogCard;
