import React, {useRef, useState} from "react";
import classes from "./appPopup.module.css";
import cn from "classnames";
import {useOnClickOutside} from "hooks/useClickOutside";
const AppPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const onClosePopup = () => setIsPopupOpen(false);
  useOnClickOutside(popupRef, onClosePopup);
  return (
    <div
      className={cn(classes.popupContainer, {
        [classes.vissiblePopup]: isPopupOpen,
      })}
    >
      <div className={classes.popupWindow}>popup</div>
    </div>
  );
};
export default AppPopup;
