import React, {useLayoutEffect, useMemo} from "react";
import classes from "./appLayout.module.css";
import AppHeader from "../appHeader/AppHeader";
// import {createBrowserHistory} from "history";
import {Route, Routes, useNavigate} from "react-router-dom";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES, GH_PAGES_URL} from "utils/routes";
import MainPage from "pages/mainPage/MainPage";
import LoginPage from "pages/loginPage/LoginPage";
import RegistrationPage from "pages/regPage/RegistrainPage";
import Catalog from "pages/catalog/Catalog";
import AppMenu from "components/appMenu";
import {useSelector} from "react-redux";
import {isUserAuth} from "store/modules/auth/selectors";
import CatalogCard from "components/catalogCard/CatalogCard";

const AppLayout = () => {
  const navigation = useNavigate();
  //TODO: подумать о надобности history
  // const history = createBrowserHistory();

  const isAuth = useSelector(isUserAuth);
  const appNavigation = useMemo(() => {
    return [
      {title: "Catalog", link: GH_PAGES_URL + "/cards"},
      {
        title: "Order",
        link: isAuth
          ? GH_PAGES_URL + APP_AUTH_ROUTES.order.link
          : GH_PAGES_URL + APP_GENERAL_ROUTES.login.link,
      },
      {title: "About", link: GH_PAGES_URL + "/about"},
      {title: "Contacts", link: GH_PAGES_URL + "/contacts"},
    ];
  }, [isAuth]);
  // useLayoutEffect(() => {
  //   if (!isAuth) {
  //     navigation(APP_GENERAL_ROUTES.login.link);
  //   }
  // }, [isAuth]);
  //TODO: создать ордер и добавить в него меню вертушку для выбора вида заказа
  //TODO: страница для карточки
  //TODO: главная страница
  //TODO: лоадеры добавить везде
  //TODO: страница контактов
  //TODO:  разобраться с бэком
  //TODO:  сохранять токен в куки
  //TODO: повесить useParams для карточки по айди
  //TODO: создать лк+ сделать запрос на auth/me для отображения текущего юзера
  //TODO: about заменить на акции ???
  //TODO: подумать об использовании промокода при регистрации для акций и бонусов(проверку делать на бэке и возвращать текущее/расчитанное кол-во бонусов)
  //TODO: адаптив для всех страниц
  return (
    <div className={classes.appWrapper}>
      <AppHeader />
      <main className={classes.mainContainer}>
        {isAuth ? (
          <>
            <Routes>
              {Object.values(APP_AUTH_ROUTES).map(appRoute => (
                <Route
                  index={appRoute.index}
                  path={GH_PAGES_URL + appRoute.link}
                  Component={appRoute.component}
                />
              ))}
            </Routes>
            <AppMenu menuItems={appNavigation} />
          </>
        ) : (
          <>
            <Routes>
              {Object.values(APP_GENERAL_ROUTES).map(appRoute => (
                <Route
                  index={appRoute.index}
                  path={GH_PAGES_URL + appRoute.link}
                  Component={appRoute.component}
                />
              ))}
            </Routes>
            <AppMenu menuItems={appNavigation} />
          </>
        )}
      </main>
    </div>
  );
};
export default AppLayout;
