import React from "react";
import classes from "./appMenu.module.css";
import {Link} from "react-router-dom";
import {VolumMenuProps} from "typings/generalComponents";

const AppMenu = ({menuItems}: {menuItems?: VolumMenuProps[]}) => {
  const itemsCount = menuItems ? menuItems.length : 0;

  const itemZindex = (index: number) => {
    return {
      zIndex: itemsCount - index,
    };
  };
  return (
    <div className={classes.menu3dContainer}>
      <ul className={classes.menuBlock}>
        {menuItems &&
          menuItems.map((item, index) => (
            <Link
              key={item.title + index}
              to={item.link}
              className={classes.menuItem}
              style={itemZindex(index)}
            >
              <span className={classes.itemLink} style={item.style}>
                {item.title}
              </span>
            </Link>
          ))}
      </ul>
    </div>
  );
};
export default AppMenu;
