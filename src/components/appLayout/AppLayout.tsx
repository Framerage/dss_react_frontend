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
import AppFooter from "components/appFooter/AppFooter";

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
        title: "Create own decor",
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
  //TODO: создать лк+ сделать запрос на auth/me для отображения текущего юзера
  //TODO:  сохранять токен в куки
  //TODO:  разработать логику оформления заказа
  //TODO: подумать об использовании промокода при регистрации для акций и бонусов(проверку делать на бэке и возвращать текущее/расчитанное кол-во бонусов)
  //TODO: сохранять корзину в локалсторейдж или на бд?
  //TODO: разоабраться с размерами контента в карточках на главной
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
      <AppFooter />
    </div>
  );
};
export default AppLayout;
