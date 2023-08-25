import React from "react";
import classes from "./mainPage.module.css";

import CardArtFrame from "assets/images/art-frame.png";
import CardDecorFrame from "assets/images/pic-frame.png";
import CardMirrowFrame from "assets/images/mirrow-frame.png";
import PreviewCard from "components/previewCard/PreviewCard";
const previewCards = [
  {img: CardArtFrame, text: "Creative Art Decor Design"},
  {img: CardDecorFrame, text: "Creative 3D creating Neon DIY"},
  {
    img: CardMirrowFrame,
    text: "Home comfort simple usefull interesting news",
    isCircle: true,
  },
];
const MainPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        color: "black",
        fontSize: "20px",
      }}
    >
      <div className={classes.mainContent}>
        <div className={classes.appPreview}>
          {previewCards.map(card => (
            <PreviewCard
              key={card.text}
              imgUrl={card.img}
              contentText={card.text}
              isCircle={card.isCircle}
            />
          ))}
        </div>
        <div className={classes.appPreview}>
          {previewCards.map(card => (
            <PreviewCard
              key={card.text}
              imgUrl={card.img}
              contentText={card.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MainPage;
