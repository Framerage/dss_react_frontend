import React from "react";
import classes from "./appMenu.module.css";
import {Link} from "react-router-dom";
const defaultMenuItems = [
  {title: "link", link: "", style: {pointerEvents: "none"}},
  {title: "link", link: "", style: {pointerEvents: "none"}},
  {title: "link", link: "", style: {pointerEvents: "none"}},
  {title: "link", link: "", style: {pointerEvents: "none"}},
];
const AppMenu = ({
  menuItems = defaultMenuItems,
}: {
  menuItems?: {title: string; link: string; style?: any}[];
}) => {
  const itemsCount = menuItems.length;

  const itemZindex = (index: number) => {
    return {
      zIndex: itemsCount - index,
    };
  };
  return (
    <div className={classes.menu3dContainer}>
      <ul className={classes.menuBlock}>
        {menuItems.map((item, index) => (
          <li
            key={item.title + index}
            className={classes.menuItem}
            style={itemZindex(index)}
          >
            <Link
              to={item.link}
              className={classes.itemLink}
              style={item.style}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AppMenu;
