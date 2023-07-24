import React, {useMemo} from "react";
import classes from "./appLayout.module.css";
import AppHeader from "../appHeader/AppHeader";
import {Route, Routes} from "react-router-dom";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES, FOR_GH_PAGES} from "utils/routes";
import AppMenu from "components/appMenu";
import {useSelector} from "react-redux";
import {isUserAuth} from "store/modules/auth/selectors";

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
    ];
  }, [isAuth]);
  //TODO: создать ордер и добавить в него меню вертушку для выбора вида заказа
  //TODO: доделать регистрацию
  //TODO: страница для карточки
  //TODO: главная страница
  //TODO: лоадеры добавить везде
  //TODO: страница контактов
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
