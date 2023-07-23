import React from "react";
import classes from "./appHeader.module.css";
import {Link} from "react-router-dom";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {getUserAuth} from "store/modules/auth/actions";
import {isUserAuth} from "store/modules/auth/selectors";
const AppHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(isUserAuth);
  const userBonuses = 10101;
  const currentUser = "Arti";
  const onLogOut = () => dispatch(getUserAuth(false));
  return (
    <header className={classes.headerContainer}>
      <Link to={APP_AUTH_ROUTES.main.link} className={classes.headerLogo}>
        <div className={classes.firstLogo}>Decor</div>
        <div className={classes.secondLogo}>spirit</div>
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
