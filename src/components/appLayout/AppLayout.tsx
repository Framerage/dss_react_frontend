import React, {useEffect, useMemo} from "react";
import {Route, Routes} from "react-router-dom";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";

import AppHeader from "components/appHeader";
import AppMenu from "components/appMenu";
import ModalCart from "components/modalCart";
import AppPopup from "components/AppPopup";
import AppFooter from "components/appFooter";
import LoginPage from "pages/loginPage";
import ErrorPage from "pages/errorPage";

import {AppDispatch} from "store";
import {useDispatch, useSelector} from "react-redux";
import {isUserAuth, selectUserData} from "store/modules/auth/selectors";
import {isShopCartUse} from "store/modules/cart/selectors";
import {selectPopupImage} from "store/modules/popup/selectors";
import {getUserAuth, resetUserRequest} from "store/modules/auth/actions";
import {fetchUserInfo} from "store/modules/auth/async-actions";

import Cookies from "js-cookie";

import classes from "./appLayout.module.css";
const AppLayout: React.FC = () => {
  const userData = useSelector(selectUserData);
  const isAuth = useSelector(isUserAuth);
  const dispatch = useDispatch<AppDispatch>();
  const accTkn = Cookies.get("perAcTkn");

  const appNavigation = useMemo(() => {
    return [
      {
        title: "Catalog",
        link: isAuth
          ? APP_AUTH_ROUTES.catalog.link
          : APP_GENERAL_ROUTES.catalog.link,
      },
      {
        title: "Create own decor",
        link: APP_AUTH_ROUTES.customOrder.link,
      },
      {
        title: "About",
        link: isAuth
          ? APP_AUTH_ROUTES.about.link
          : APP_GENERAL_ROUTES.about.link,
      },
      {
        title: "Contacts",
        link: isAuth
          ? APP_AUTH_ROUTES.contacts.link
          : APP_GENERAL_ROUTES.contacts.link,
      },
    ];
  }, [isAuth]);

  const isCartOpened = useSelector(isShopCartUse);
  const isPopupOpen = useSelector(selectPopupImage);

  //TODO: переделать считываение промокода из URL
  //TODO: popup открывать на текущем скроле
  //TODO: оптимизация главной
  //TODO: настроить счетчик заказов
  //TODO: добавить сохранение БД в файлы на серве (резервн сохранение данных)
  //TODO: админская секция/страница со статистикой просмотров/лайков
  //TODO: хелпер для русского оформления названия темы
  //TODO: страница заказа, добавить оплату
  //TODO: страница создания собственного заказа
  //TODO: подумать об использовании промокода при регистрации для акций и бонусов(проверку делать на бэке и возвращать текущее/расчитанное кол-во бонусов)
  //TODO: дополнить футер навигацией?
  //TODO: адаптив для всех страниц
  //TODO:  добавить ли рефреш токен?
  //TODO:  придумать текст about

  useEffect(() => {
    if (!isAuth) {
      if (userData && userData.success && !accTkn) {
        dispatch(resetUserRequest());
        dispatch(getUserAuth(false));
        return;
      }
      if (!userData && !accTkn) {
        dispatch(getUserAuth(false));
        return;
      }
      if (!userData && accTkn) {
        dispatch(fetchUserInfo(accTkn));
        return;
      }
      if (userData && !userData.success && accTkn) {
        dispatch(fetchUserInfo(accTkn));
        return;
      }
      if (userData && userData.success && accTkn) {
        dispatch(getUserAuth(true));
        return;
      }
    }
    if (!accTkn) {
      dispatch(resetUserRequest());
      dispatch(getUserAuth(false));
    }
  }, [userData, accTkn, isAuth]);
  return (
    <div
      className={classes.appWrapper}
      style={{
        height: isCartOpened || !!isPopupOpen ? "100vh" : "auto",
        overflow: isCartOpened || !!isPopupOpen ? "hidden" : "inherit",
      }}
    >
      <AppPopup />
      <ModalCart />
      <AppHeader />
      <main className={classes.mainContainer}>
        {isAuth ? (
          <>
            <Routes>
              {Object.values(APP_AUTH_ROUTES).map(appRoute => (
                <Route
                  key={appRoute.link}
                  index={appRoute.index}
                  path={appRoute.link}
                  Component={appRoute.component}
                />
              ))}
              <Route path="*" Component={isAuth ? ErrorPage : LoginPage} />
            </Routes>
            <AppMenu menuItems={appNavigation} />
          </>
        ) : (
          <>
            <Routes>
              {Object.values(APP_GENERAL_ROUTES).map(appRoute => (
                <Route
                  key={appRoute.link}
                  index={appRoute.index}
                  path={appRoute.link}
                  Component={appRoute.component}
                />
              ))}
              <Route path="*" Component={isAuth ? ErrorPage : LoginPage} />
            </Routes>
            <AppMenu menuItems={appNavigation} />
          </>
        )}
      </main>
      <AppFooter />
    </div>
  );
};
export default AppLayout;
