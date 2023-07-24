import CatalogCard from "components/catalogCard/CatalogCard";
import Catalog from "pages/catalog/Catalog";
import CreateOrder from "pages/createOrder/CreateOrder";
import LoginPage from "pages/loginPage/LoginPage";
import MainPage from "pages/mainPage";
import RegistrationPage from "pages/regPage/RegistrainPage";

interface RoutesType {
  [key: string]: {component: React.FC | null; link: string; index?: boolean};
}
export const FOR_GH_PAGES = "";
// export const FOR_GH_PAGES = "/dss_react_frontend";

export const APP_GENERAL_ROUTES: RoutesType = {
  main: {link: FOR_GH_PAGES + "/", component: MainPage, index: true},
  catalog: {link: FOR_GH_PAGES + "/cards", component: Catalog},
  catalogCard: {link: FOR_GH_PAGES + "/cards/:id", component: CatalogCard},
  contacts: {link: FOR_GH_PAGES + "/contacts", component: null},
  login: {link: FOR_GH_PAGES + "/auth/login", component: LoginPage},
  registration: {
    link: FOR_GH_PAGES + "/auth/registration",
    component: RegistrationPage,
  },
  error: {link: "*", component: LoginPage},
};
export const APP_AUTH_ROUTES: RoutesType = {
  main: {link: FOR_GH_PAGES + "/", component: MainPage, index: true},
  catalog: {link: FOR_GH_PAGES + "/cards", component: Catalog},
  catalogCard: {link: FOR_GH_PAGES + "/cards/:id", component: CatalogCard},
  contacts: {link: FOR_GH_PAGES + "/contacts", component: null},
  order: {link: FOR_GH_PAGES + "/create-order", component: CreateOrder},
  personalPage: {link: FOR_GH_PAGES + "/personal-page", component: null},
  error: {link: "*", component: MainPage},
};
