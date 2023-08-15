import React, {useMemo} from "react";
import classes from "./appLayout.module.css";
import AppHeader from "../appHeader/AppHeader";
import {Route, Routes} from "react-router-dom";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES, FOR_GH_PAGES} from "utils/routes";
import AppMenu from "components/appMenu";
import {useSelector} from "react-redux";
import {isUserAuth} from "store/modules/auth/selectors";
import ModalCart from "components/modalCart/ModalCart";
import {isShopCartUse} from "store/modules/cart/selectors";

const AppLayout = () => {
  const isAuth = useSelector(isUserAuth);
  const appNavigation = useMemo(() => {
    return [
      {title: "Catalog", link: FOR_GH_PAGES + "/cards"},
      {
        title: "Order",
        link: APP_AUTH_ROUTES.order.link,
      },
      {title: "About", link: FOR_GH_PAGES + "/about"},
      {title: "Contacts", link: FOR_GH_PAGES + "/contacts"},
      //TODO: сделать страницы, довить в роуты, исправить роуты(убрать gh pages)
    ];
  }, [isAuth]);
  const isCartOpened = useSelector(isShopCartUse);
  //TODO: масштабирование картинок
  //TODO: карточка,страница для карточки,лайк, просмотры, корзина
  //TODO: главная страница
  //TODO:  сохранять токен в куки
  //TODO: повесить useParams для карточки по айди
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
        height: isCartOpened ? "100vh" : "auto",
        overflow: isCartOpened ? "hidden" : "inherit",
      }}
    >
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
