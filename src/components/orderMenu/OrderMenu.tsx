import React, {useState} from "react";
import {Link} from "react-router-dom";
import menuLogo from "assets/images/decor-logo.png";
import cn from "classnames";
import classes from "./orderMenu.module.css";
interface OrderMenuProps {
  menuItems?: {name: string; image: string; link: string}[];
}
const OrderMenu: React.FC<OrderMenuProps> = ({menuItems}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onUseMenu = () => setIsMenuOpen(!isMenuOpen);
  const defaultMenuItems = [
    {name: "1", image: "/assets/images/defaultImg.png", link: ""},
    {name: "2", image: "/assets/images/defaultImg.png", link: ""},
    {name: "3", image: "/assets/images/defaultImg.png", link: ""},
    {name: "4", image: "/assets/images/defaultImg.png", link: ""},
    {name: "5", image: "/assets/images/defaultImg.png", link: ""},
    {name: "6", image: "/assets/images/defaultImg.png", link: ""},
    // {name: "7", image: "/assets/images/defaultImg.png", link: ""},
    // {name: "8", image: "/assets/images/defaultImg.png", link: ""},
  ];
  const itemsAmount = menuItems ? menuItems.length : defaultMenuItems.length;
  const itemsContant = menuItems ? menuItems : defaultMenuItems;

  const iconStyle = (elem: number) => {
    return {
      transitionDelay: `calc(0.1s*${elem}`,
      transform: isMenuOpen
        ? `rotate(calc(360deg / ${itemsAmount} * ${elem + 2}))`
        : "rotate(0deg) translateX(150px)",
    };
  };
  const imageStyle = (elem: number) => {
    return {
      transform: `rotate(calc(360deg / ${-itemsAmount} * ${elem + 2}))`,
    };
  };
  return (
    // <div className={classes.menuContainer}>
    <nav className={classes.navContainer}>
      <div
        className={cn(classes.menuToggle, {
          [classes.activeToggle]: isMenuOpen,
        })}
        onClick={onUseMenu}
        content={"order"}
      >
        <span className={classes.menuToggleText}>
          {!isMenuOpen ? "Choose order" : ""}
        </span>
        <img
          src={menuLogo}
          alt="menuLogo"
          width={150}
          height={150}
          className={classes.toggleImage}
        />
      </div>
      {itemsContant.map((item, index) => (
        <Link
          to={item.link}
          key={item.name + ":" + index}
          className={cn(classes.menuItem, {
            [classes.activeMenu]: isMenuOpen,
          })}
          style={iconStyle(index)}
        >
          <span style={imageStyle(index)}>text</span>
          <img
            src={item.image}
            alt="menuItem"
            width={50}
            height={50}
            style={imageStyle(index)}
          />
        </Link>
      ))}
    </nav>
    // </div>
  );
};
export default OrderMenu;
