import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {
  getUserAuth,
  resetAuthRequest,
  resetRegRequest,
} from "store/modules/auth/actions";
import {isUserAuth, selectAuthData} from "store/modules/auth/selectors";
import ShopCart from "assets/icons/cart-shopping-solid.svg";
import classes from "./appHeader.module.css";
import {isShoppingCartUse} from "store/modules/cart/actions";
import Arrow from "assets/icons/backArrow.svg";
import Cookies from "js-cookie";
const AppHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuth = useSelector(isUserAuth);
  const authRequest = useSelector(selectAuthData);

  const userBonuses = authRequest?.bonuses || 0;
  const currentUser = authRequest?.name || "-";

  const onLogOut = () => {
    dispatch(resetAuthRequest());
    dispatch(resetRegRequest());
    Cookies.remove("perAcTkn");
    dispatch(getUserAuth(false));
  };
  const onOpenShopCart = () => dispatch(isShoppingCartUse(true));
  return (
    <header className={classes.headerContainer}>
      <Link to={APP_AUTH_ROUTES.main.link} className={classes.headerLogo}>
        <div className={classes.firstLogo}>Decor</div>
        <div className={classes.secondLogo}>spirit</div>
        <div className={classes.botBorder}></div>
      </Link>
      <div onClick={() => navigate(-1)} className={classes.goBackArrow}>
        <img
          src={Arrow}
          alt="back"
          width={30}
          height={30}
          style={{transform: "rotate(-130deg)", position: "relative"}}
        />
        <span className={classes.arrowText}>Back</span>
      </div>
      {isAuth ? (
        <div className={classes.authedBlock}>
          <div className={classes.cartBlock}>
            <img
              src={ShopCart}
              alt="cart"
              onClick={onOpenShopCart}
              className={classes.userShopCart}
            />
            <div className={classes.imgBorder}></div>
          </div>

          <div className={classes.userBonuses}>
            Bonuses:&nbsp;
            <i className={classes.bonusesValue}>{userBonuses}</i>
          </div>
          <span className={classes.currentUser}>&nbsp;{currentUser}</span>
          <button
            type="button"
            className={classes.exitBtn}
            onClick={onLogOut}
          />
        </div>
      ) : (
        <nav className={classes.headerNav}>
          <Link
            to={APP_GENERAL_ROUTES.login.link}
            className={classes.headerNavItem}
          >
            Sign in
          </Link>
          <Link
            to={APP_GENERAL_ROUTES.registration.link}
            className={classes.headerNavItem}
          >
            Sign up
          </Link>
        </nav>
      )}
    </header>
  );
};
export default AppHeader;
