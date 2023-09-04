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
    dispatch(
      setPopupImage(
        isImgFile ? images[choosedImg] : setBase64Image("", images[choosedImg]),
      ),
    );
  };
  const onChooseImg = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.stopPropagation();
    setChoosedImg(index);
  };
  return (
    <div
      className={classes.imageSlider}
      style={{
        transform: componentScale ? `scale(${componentScale})` : "scale(1)",
      }}
    >
      <div className={classes.imageContainer}>
        <div
          className={classes.imgArrow}
          onClick={() => choosedImg !== 0 && setChoosedImg(choosedImg - 1)}
        >
          &#8249;
        </div>
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
          loading="lazy"
          onClick={e =>
            images && images.length > 0 && isScaled && onScaleImg(e)
          }
        />
        <div
          className={classes.imgArrow}
          onClick={() =>
            choosedImg !== images.length - 1 &&
            choosedImg < images.length &&
            setChoosedImg(choosedImg + 1)
          }
        >
          &#8250;
        </div>
      </div>

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
