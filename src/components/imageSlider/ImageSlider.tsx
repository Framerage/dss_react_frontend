import React, {useState} from "react";
import cn from "classnames";
import defaultImg from "assets/images/defaultCardImg.png";

import classes from "./imageSlider.module.css";
import {setBase64Image} from "helpers/appHelpers";
import {setPopupImage} from "store/modules/popup/actions";
import {useDispatch} from "react-redux";
import {AppDispatch} from "store";
interface ImageSliderProps {
  images: string[];
  componentScale?: number;
  isImgFile?: boolean;
  isScaled?: boolean;
}
const ImageSlider: React.FC<ImageSliderProps> = ({
  images = [],
  componentScale,
  isImgFile = false,
  isScaled = true,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [choosedImg, setChoosedImg] = useState(0);
  const [isImgScaled, setIsImageScaled] = useState(false);
  const onScaleImg = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsImageScaled(!isImgScaled);
    dispatch(setPopupImage(setBase64Image("", images[choosedImg])));
  };
  const onChooseImg = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.stopPropagation();
    setChoosedImg(index);
  };
  return (
    <div
      className={classes.imageSlider}
      onClick={e => isScaled && onScaleImg(e)}
      style={{
        transform: componentScale ? `scale(${componentScale})` : "scale(1)",
      }}
    >
      <img
        src={
          images && images.length > 0
            ? isImgFile
              ? images[choosedImg]
              : setBase64Image("", images[choosedImg])
            : defaultImg
        }
        alt="cardImg"
        className={cn(classes.cardImg, {[classes.cardHover]: isImgScaled})}
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
