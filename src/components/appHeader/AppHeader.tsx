import React from "react";
import classes from "./appHeader.module.css";
import {Link} from "react-router-dom";
import {APP_ROUTES} from "../../utils/routes";
const AppHeader = () => {
  const isAuth = false;
  return (
    <header className={classes.headerContainer}>
      <Link to={APP_ROUTES.main} className={classes.headerLogo}>
        <div className={classes.firstLogo}>Decor</div>
        <div className={classes.secondLogo}>spirit</div>
      </Link>
      <nav className={classes.headerNav}>
        <Link to={APP_ROUTES.login} className={classes.navItem}>
          Sign in
        </Link>
        <Link to={APP_ROUTES.registration} className={classes.navItem}>
          Sign up
        </Link>
      </nav>
    </header>
  );
};
export default AppHeader;
