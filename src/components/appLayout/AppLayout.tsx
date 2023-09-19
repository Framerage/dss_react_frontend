import React, {useEffect, useMemo} from "react";
import classes from "./appLayout.module.css";
import AppHeader from "../appHeader/AppHeader";
import {Route, Routes} from "react-router-dom";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";
import AppMenu from "components/appMenu";
import {useDispatch, useSelector} from "react-redux";
import {isUserAuth, selectUserData} from "store/modules/auth/selectors";
import ModalCart from "components/modalCart/ModalCart";
import {isShopCartUse} from "store/modules/cart/selectors";
import AppPopup from "components/AppPopup/AppPopup";
import {selectPopupImage} from "store/modules/popup/selectors";
import AppFooter from "components/appFooter/AppFooter";
import LoginPage from "pages/loginPage/LoginPage";
import ErrorPage from "pages/errorPage";
import {AppDispatch} from "store";
import Cookies from "js-cookie";
import {getUserAuth, resetUserRequest} from "store/modules/auth/actions";
import {fetchUserInfo} from "store/modules/auth/async-actions";

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

  //TODO: дополнить страницу заказа, при успешном оформлении заказа очищать корзину юзера, добавить оповещение что смс ушло на почту, перенос юзера в каталог, добавить оплату
  //TODO: хелпер для русского оформления названия темы
  //TODO: личный кабинет с отображение сделанных заказов
  //TODO: админская секция/страница со статистикой просмотров/лайков, список заказов+история заказов выполненные/ в процессе/ на этапе обсуждения
  //TODO: страница создания собственного заказа
  //TODO: подумать об использовании промокода при регистрации для акций и бонусов(проверку делать на бэке и возвращать текущее/расчитанное кол-во бонусов)
  //TODO: сохранять корзину в локалсторейдж или на бд?
  //TODO: создать лк, добавить иконку юзера в хедер
  //TODO: дополнить футер навигацией?
  //TODO: разоабраться с размерами контента в карточках на главной, подумать о снижении веса картинок в проекте, либо об их замене на свг или более дешевые
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
