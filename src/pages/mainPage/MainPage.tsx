import React from "react";

import classes from "./mainPage.module.css";

const MainPage = () => {
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
        border: "1px solid red",
      }}
    >
      <div className={classes.mainContent}>content</div>
    </div>
  );
};
export default MainPage;
