import React, {useRef, useState, useEffect} from "react";
import classes from "./appPopup.module.css";
import cn from "classnames";
import {useOnClickOutside} from "hooks/useClickOutside";
import {useDispatch, useSelector} from "react-redux";
import {selectPopupImage} from "store/modules/popup/selectors";
import {setBase64Image} from "helpers/appHelpers";
import {resetPopupImage} from "store/modules/popup/actions";
import {AppDispatch} from "store";
const AppPopup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const scaledImage = useSelector(selectPopupImage);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const onClosePopup = () => {
    dispatch(resetPopupImage());
    setIsPopupOpen(false);
  };
  useOnClickOutside(popupRef, onClosePopup);

  useEffect(() => {
    !!scaledImage && setIsPopupOpen(true);
  }, [scaledImage]);
  return (
    <div
      className={cn(classes.popupContainer, {
        [classes.vissiblePopup]: isPopupOpen,
      })}
    >
      <div className={classes.popupWindow} ref={popupRef}>
        <img
          src={setBase64Image("", scaledImage)}
          alt="scaledImg"
          className={classes.popupImg}
        />
        <div className={classes.closeBtn} onClick={onClosePopup}>
          Close
        </div>
      </div>
    </div>
  );
};
export default AppPopup;
