import CatalogCard from "components/catalogCard/CatalogCard";
import Catalog from "pages/catalog/Catalog";
import CreateOrder from "pages/createOrder/CreateOrder";
import LoginPage from "pages/loginPage/LoginPage";
import MainPage from "pages/mainPage";
import RegistrationPage from "pages/regPage/RegistrainPage";

interface RoutesType {
  [key: string]: {component: React.FC | null; link: string};
}
export const APP_GENERAL_ROUTES: RoutesType = {
  main: {link: "/", component: MainPage},
  catalog: {link: "/cards", component: Catalog},
  catalogCard: {link: "/cards/:id", component: CatalogCard},
  contacts: {link: "/contacts", component: null},
  login: {link: "/auth/login", component: LoginPage},
  registration: {link: "/auth/registration", component: RegistrationPage},
};
export const APP_AUTH_ROUTES: RoutesType = {
  main: {link: "/", component: MainPage},
  catalog: {link: "/cards", component: Catalog},
  catalogCard: {link: "/cards/:id", component: CatalogCard},
  contacts: {link: "/contacts", component: null},
  order: {link: "/create-order", component: CreateOrder},
  personalPage: {link: "/personal-page", component: null},
};
