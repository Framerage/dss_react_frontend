import React, { useState } from "react";
import classes from "./flowerMenu.module.css";
const FlowerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onUseMenu = () => setIsMenuOpen(!isMenuOpen);
  const defaultMenuItems = [
    { name: "1", image: "/assets/images/defaultImg.png", link: "" },
    { name: "2", image: "/assets/images/defaultImg.png", link: "" },
    { name: "3", image: "/assets/images/defaultImg.png", link: "" },
    { name: "4", image: "/assets/images/defaultImg.png", link: "" },
    { name: "5", image: "/assets/images/defaultImg.png", link: "" },
    { name: "6", image: "/assets/images/defaultImg.png", link: "" },
    { name: "7", image: "/assets/images/defaultImg.png", link: "" },
    { name: "8", image: "/assets/images/defaultImg.png", link: "" },
    { name: "9", image: "/assets/images/defaultImg.png", link: "" },
    { name: "10", image: "/assets/images/defaultImg.png", link: "" },
    { name: "11", image: "/assets/images/defaultImg.png", link: "" },
  ];
  const iconStyle = (elem: number) => {
    return {
      transitionDelay: `calc(0.1s*${elem}`,
      transform: `rotate(calc(360deg / ${defaultMenuItems.length} * ${elem})) translateY(-120px) `,
    };
  };
  return (
    <div className={classes.flowerContainer}>
      <div
        className={`${classes.flowerCenter} ${
          isMenuOpen ? classes.activeMenu : ""
        }`}
        onClick={onUseMenu}
      >
        O
      </div>
      {defaultMenuItems.map((petal, index) => (
        <div
          key={petal.name}
          className={`${classes.flowerPetal} ${
            isMenuOpen ? classes.activeMenu : ""
          }`}
          style={iconStyle(index)}
        ></div>
      ))}
    </div>
  );
};
export default FlowerMenu;
