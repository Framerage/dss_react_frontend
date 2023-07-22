import React, {useLayoutEffect} from "react";
import classes from "./appLayout.module.css";
import AppHeader from "../appHeader/AppHeader";
// import {createBrowserHistory} from "history";
import {Route, Routes, useNavigate} from "react-router-dom";
import {APP_AUTH_ROUTES, APP_ROUTES} from "utils/routes";
import MainPage from "pages/mainPage/MainPage";
import LoginPage from "pages/loginPage/LoginPage";
import RegistrationPage from "pages/regPage/RegistrainPage";
import Catalog from "pages/catalog/Catalog";
import AppMenu from "components/appMenu";
import {useSelector} from "react-redux";
import {isUserAuth} from "store/modules/auth/selectors";
import CatalogCard from "components/catalogCard/CatalogCard";
const appNavigation = [
  {title: "Catalog", link: APP_AUTH_ROUTES.catalog},
  {title: "Order", link: "/create-order"},
  {title: "About", link: "/about"},
  {title: "Contacts", link: APP_AUTH_ROUTES.contacts},
];

const AppLayout = () => {
  const navigation = useNavigate();
  //TODO: подумать о надобности history
  // const history = createBrowserHistory();

  const isAuth = useSelector(isUserAuth);

  useLayoutEffect(() => {
    if (!isAuth) {
      navigation(APP_ROUTES.login);
    }
  }, [isAuth]);
  //TODO: переделать роуты на общие без логина и добавить те, которые будут требовать логирования
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
              <Route index path={APP_AUTH_ROUTES.main} element={<MainPage />} />
              <Route path={APP_AUTH_ROUTES.catalog} element={<Catalog />} />
              <Route
                path={`${APP_AUTH_ROUTES.catalog}/:id`}
                element={<CatalogCard />}
              />
            </Routes>
            <AppMenu menuItems={appNavigation} />
          </>
        ) : (
          <Routes>
            <Route index path={APP_ROUTES.login} element={<LoginPage />} />
            <Route
              path={APP_ROUTES.registration}
              element={<RegistrationPage />}
            />
          </Routes>
        )}
      </main>
    </div>
  );
};
export default AppLayout;
