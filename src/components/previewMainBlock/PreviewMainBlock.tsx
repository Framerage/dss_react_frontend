import React from "react";
import classes from "./previewMainBlock.module.css";
import {NEON_HISTORY} from "./constants";
import ImageSlider from "components/imageSlider/ImageSlider";
import cn from "classnames";
interface PreaviewBlockProps {
  text: string;
  id: string;
  reverse?: boolean;
}
const PreviewMainBlock: React.FC<PreaviewBlockProps> = ({
  text,
  id,
  reverse = false,
}) => {
  return (
    <div id={id} className={classes.previewBlockContainer}>
      <div
        className={cn(classes.descripPoint, {[classes.activeLeftPoint]: true})}
      >
        {reverse ? <ImageSlider images={[]} /> : NEON_HISTORY}
      </div>
      <div className={classes.examplePoint}>
        {reverse ? NEON_HISTORY : <ImageSlider images={[]} />}
      </div>
    </div>
  );
};
export default PreviewMainBlock;
