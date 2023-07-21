import React from "react";
import FlowerMenu from "../../components/flowerMenu/FlowerMenu";

const MainPage = () => {
  //TODO: сделать ромашку
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
      <h1>Main Page</h1>
      <FlowerMenu />
    </div>
  );
};
export default MainPage;
