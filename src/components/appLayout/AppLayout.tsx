import React, {useMemo} from "react";
import classes from "./appLayout.module.css";
import AppHeader from "../appHeader/AppHeader";
import {Route, Routes} from "react-router-dom";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";
import AppMenu from "components/appMenu";
import {useSelector} from "react-redux";
import {isUserAuth} from "store/modules/auth/selectors";
import ModalCart from "components/modalCart/ModalCart";
import {isShopCartUse} from "store/modules/cart/selectors";
import AppPopup from "components/AppPopup/AppPopup";
import {selectPopupImage} from "store/modules/popup/selectors";

const AppLayout = () => {
  const isAuth = useSelector(isUserAuth);
  const appNavigation = useMemo(() => {
    return [
      {
        title: "Catalog",
        link: isAuth
          ? APP_AUTH_ROUTES.catalog.link
          : APP_GENERAL_ROUTES.catalog.link,
      },
      {
        title: "Order",
        link: APP_AUTH_ROUTES.order.link,
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
  //TODO: главная страница, продолжить идею карточек, каждая карточка с якорем на тематический блок на главной, почистить картинки
  //TODO:  сохранять токен в куки
  //TODO:  убрать комменты в корзине приложения
  //TODO: создать лк+ сделать запрос на auth/me для отображения текущего юзера
  //TODO: footer+share+animation idia
  //TODO: about заменить на акции ???
  //TODO: подумать об использовании промокода при регистрации для акций и бонусов(проверку делать на бэке и возвращать текущее/расчитанное кол-во бонусов)
  //TODO: сохранять корзину в локалсторейдж или на бд?
  //TODO: адаптив для всех страниц
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
            </Routes>
            <AppMenu menuItems={appNavigation} />
          </>
        )}
      </main>
      <footer className={classes.footerContainer}>footer</footer>
    </div>
  );
};
export default AppLayout;
