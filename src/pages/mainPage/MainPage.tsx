import React from "react";
import FlowerMenu from "../../components/flowerMenu/FlowerMenu";
import AppMenu from "components/appMenu/AppMenu";
import classes from "./mainPage.module.css";
import {APP_ROUTES} from "utils/routes";
const MainPage = () => {
  const appNavigation = [
    {title: "Home", link: APP_ROUTES.main},
    {title: "Catalog", link: "/cards"},
    {title: "About", link: "/about"},
    {title: "Contacts", link: "/contacts"},
    {title: "Contacts", link: "/contacts"},
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        color: "black",
        fontSize: "20px",
      }}
    >
      <div className={classes.mainContent}>
        <FlowerMenu />
        <AppMenu menuItems={appNavigation} />
      </div>
    </div>
  );
};
export default MainPage;
