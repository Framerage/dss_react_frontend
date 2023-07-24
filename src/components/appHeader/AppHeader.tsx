import React from "react";
import classes from "./appHeader.module.css";
import {Link} from "react-router-dom";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES, FOR_GH_PAGES} from "utils/routes";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {getUserAuth, resetAuthRequest} from "store/modules/auth/actions";
import {isUserAuth, selectAuthData} from "store/modules/auth/selectors";
const AppHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(isUserAuth);
  const authRequest = useSelector(selectAuthData);

  const userBonuses = 10101;
  const currentUser = authRequest?.name || "-";
  const onLogOut = () => {
    dispatch(resetAuthRequest());
    dispatch(getUserAuth(false));
  };
  return (
    <header className={classes.headerContainer}>
      <Link
        to={FOR_GH_PAGES + APP_AUTH_ROUTES.main.link}
        className={classes.headerLogo}
      >
        <div className={classes.firstLogo}>Decor</div>
        <div className={classes.secondLogo}>spirit</div>
        <div className={classes.botBorder}></div>
      </Link>
      {isAuth ? (
        <div className={classes.authedBlock}>
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
            to={FOR_GH_PAGES + APP_GENERAL_ROUTES.login.link}
            className={classes.headerNavItem}
          >
            Sign in
          </Link>
          <Link
            to={FOR_GH_PAGES + APP_GENERAL_ROUTES.registration.link}
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
