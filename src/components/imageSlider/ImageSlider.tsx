import React, {useState} from "react";
import cn from "classnames";
import defaultImg from "assets/images/defaultCardImg.png";

import classes from "./imageSlider.module.css";
import {setBase64Image} from "helpers/appHelpers";
interface ImageSliderProps {
  images: string[];
}
const ImageSlider: React.FC<ImageSliderProps> = ({images = []}) => {
  const [choosedImg, setChoosedImg] = useState(0);
  const [isImgScaled, setIsImageScaled] = useState(false);
  const onScaleImg = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsImageScaled(!isImgScaled);
  };
  const onChooseImg = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.stopPropagation();
    setChoosedImg(index);
  };
  return (
    <div className={classes.imageSlider} onClick={e => onScaleImg(e)}>
      <img
        src={
          images && images.length > 0
            ? setBase64Image("", images[choosedImg])
            : defaultImg
        }
        alt="cardImg"
        className={cn(classes.cardImg, {[classes.scaledImg]: isImgScaled})}
      />
      <div className={classes.sliderPoints}>
        {images.map((_, index) => (
          <div
            key={index}
            className={cn(classes.pointItem, {
              [classes.activePoint]: choosedImg === index,
            })}
            onClick={e => onChooseImg(e, index)}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default ImageSlider;
