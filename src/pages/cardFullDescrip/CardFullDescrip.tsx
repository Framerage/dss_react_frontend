import React from "react";
import classes from "./cardFullDescrip.module.css";
const CardFullDescrip = () => {
  return (
    <div className={classes.fullDescripContainer}>
      <div className={classes.descripPreview}>text</div>
      <div className={classes.descripExtraContent}></div>
    </div>
  );
};
export default CardFullDescrip;
