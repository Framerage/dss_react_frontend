import React, {useEffect} from "react";
import classes from "./cardFullDescrip.module.css";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {
  catalogCardDescrip,
  catalogCardDescripError,
  catalogCardDescripIsLoading,
} from "store/modules/catalog/selectors";
import {getCardFullDescripFx} from "store/modules/catalog/async-actions";
import PointLoader from "components/pointLoader/PointLoader";
const CardFullDescrip = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathParam = useParams<{id: string}>();

  const cardDescrip = useSelector(catalogCardDescrip);
  const cardDescripIsLoading = useSelector(catalogCardDescripIsLoading);
  const cardDescripError = useSelector(catalogCardDescripError);
  console.log(pathParam.id, "pathParam");

  useEffect(() => {
    if (cardDescrip) {
      if (cardDescrip._id === pathParam.id) {
        return;
      }
      pathParam.id && dispatch(getCardFullDescripFx(pathParam.id));
      return;
    }
    pathParam.id && dispatch(getCardFullDescripFx(pathParam.id));
  }, []);
  return (
    <>
      {!cardDescripIsLoading ? (
        <div className={classes.fullDescripContainer}>
          <div className={classes.descripPreview}></div>
          <div className={classes.descripExtraContent}></div>
        </div>
      ) : (
        <PointLoader />
      )}
    </>
  );
};
export default CardFullDescrip;
