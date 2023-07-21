import React from "react";
import classes from "./appLayout.module.css";
import AppHeader from "../appHeader/AppHeader";
import { Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "../../utils/routes";
import MainPage from "../../pages/mainPage/MainPage";
import LoginPage from "../../pages/loginPage/LoginPage";
import RegistrationPage from "../../pages/regPage/RegistrainPage";
const AppLayout = () => {
  return (
    <div className={classes.appWrapper}>
      <AppHeader />
      <Routes>
        <Route index path={APP_ROUTES.main} element={<MainPage />} />
        <Route path={APP_ROUTES.login} element={<LoginPage />} />
        <Route path={APP_ROUTES.registration} element={<RegistrationPage />} />
        {/* <Route path="/react-testshop/orders/" element={<Orders />} /> */}
      </Routes>
    </div>
  );
};
export default AppLayout;
