import React from "react";
import CardDecorFrame from "assets/images/pic-frame.png";
import CardMirrowFrame from "assets/images/mirrow-frame.png";
import PreviewCard from "components/previewCard/PreviewCard";
import PreviewMainBlock from "components/previewMainBlock/PreviewMainBlock";

import PrintHisImg1 from "assets/images/printerHistory/print1.jpg";
import PrintHisImg3 from "assets/images/printerHistory/print3.jpg";

import NeonHisImg1 from "assets/images/neonHistory/neon1.jpeg";
import NeonHisImg2 from "assets/images/neonHistory/neon2.jpg";
import NeonHisImg3 from "assets/images/neonHistory/neon3.jpg";

import classes from "./mainPage.module.css";
import {
  FURNITURE_HISTORY,
  NEON_HISTORY,
  VOL_PRINTERS_HISTORY,
} from "components/previewMainBlock/constants";
const previewCards = [
  {
    img: CardDecorFrame,
    text: "Home comfort, simple, usefull and interesting furniture ",
    link: "art-furniture",
  },
  {
    img: CardMirrowFrame,
    text: "Creative neon decors, DIY, neon lamps",
    link: "art-neon",
    isCircle: true,
  },
  {
    img: CardDecorFrame,
    text: "Creative 3D models",
    link: "art-printers",
  },
];
const previewContent = [
  {text: FURNITURE_HISTORY, id: "art-furniture", images: []},
  {
    text: NEON_HISTORY,
    id: "art-neon",
    images: [NeonHisImg1, NeonHisImg2, NeonHisImg3],
    reverse: true,
  },
  {
    text: VOL_PRINTERS_HISTORY,
    id: "art-printers",
    images: [PrintHisImg1, PrintHisImg3],
  },
];
const MainPage: React.FC = () => {
  return (
    <div className={classes.mainContainer}>
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
        {previewContent.map(block => (
          <PreviewMainBlock
            text={block.text}
            id={block.id}
            key={block.id}
            images={block.images}
            reverse={block.reverse}
          />
        ))}
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
