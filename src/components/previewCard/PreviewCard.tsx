import React, {useState} from "react";
import classes from "./previewCard.module.css";
import cn from "classnames";
interface PreviewCardProps {
  imgUrl: string;
  contentText: string;
  link: string;
  isCircle?: boolean;
}
const PreviewCard: React.FC<PreviewCardProps> = ({
  imgUrl,
  contentText,
  isCircle = false,
  link,
}) => {
  const [geometricStyle, setGeometricStyle] = useState({});
  const onMoveGeoMetric = (e: React.MouseEvent) => {
    setGeometricStyle({
      transform: `rotateX(${
        (e.clientX - window.innerWidth / 2) * -0.01
      }deg) rotateY(${(e.clientY - window.innerHeight / 2) * -0.1}deg)`,
    });
  };
  return (
    <a href={`#${link}`}>
      <div className={classes.previewCardContainer} style={{...geometricStyle}}>
        <img
          src={imgUrl}
          alt="frame"
          onMouseMove={onMoveGeoMetric}
          className={classes.previewFrame}
        />
        <div
          className={cn(classes.previewCardContent, {
            [classes.previewCircleCard]: isCircle,
          })}
        >
          {contentText}
        </div>
      </div>
    </a>
  );
};
export default PreviewCard;
