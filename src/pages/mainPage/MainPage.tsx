import React from "react";
import CardArtFrame from "assets/images/art-frame.png";
import CardDecorFrame from "assets/images/pic-frame.png";
import CardMirrowFrame from "assets/images/mirrow-frame.png";
import PreviewCard from "components/previewCard/PreviewCard";
import PreviewMainBlock from "components/previewMainBlock/PreviewMainBlock";

import classes from "./mainPage.module.css";
const previewCards = [
  {img: CardArtFrame, text: "Creative Art Decor Design", link: "art-decor"},
  {
    img: CardDecorFrame,
    text: "Creative 3D creating Neon DIY",
    link: "art-neon",
  },
  {
    img: CardMirrowFrame,
    text: "Home comfort simple usefull interesting news",
    isCircle: true,
    link: "art-furniture",
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
              link={card.link}
            />
          ))}
        </div>
        <PreviewMainBlock text="some text" id="art-decor" />
        <PreviewMainBlock text="some text" id="art-neon" />
        <PreviewMainBlock text="some text" id="art-furniture" />
        <div
          onClick={() => window.scrollTo(0, 0)}
          className={classes.scrollBtn}
        >
          Up&nbsp;&#8593;
        </div>
      </div>
    </div>
  );
};
export default MainPage;
