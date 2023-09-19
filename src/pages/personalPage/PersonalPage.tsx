import React, {useCallback, useState} from "react";
import classes from "./personalPage.module.css";
import {useSelector} from "react-redux";
import {selectUserData} from "store/modules/auth/selectors";
import upFirstLetter from "helpers/upFirstLetter";
import cn from "classnames";
import AllOrders from "components/personalPageComponents/allOrders/AllOrders";

const menuItems = [
  {
    name: "persData",
    title: "Мои данные",
    component: null,
    role: ["user", "admin"],
  },
  {
    name: "persOrders",
    title: "Мои заказы",
    component: null,
    role: ["user", "admin"],
  },
  {
    name: "persTests",
    title: "Мои тесты",
    component: null,
    role: ["user", "admin"],
  },
  {
    name: "adminOrders",
    title: "Все заказы",
    component: AllOrders,
    role: "admin",
  },
  {name: "statistic", title: "Статистика", component: null, role: "admin"},
];
const PersonalPage: React.FC = () => {
  const userInfo = useSelector(selectUserData);

  console.log(userInfo && Object.keys(userInfo), "onfp");

  const [choosedMenuItem, setChoosedMenuItem] = useState(menuItems[0].name);
  const onChooseMenuItem = (itemName: string) => setChoosedMenuItem(itemName);
  const renderChoosedInfo = useCallback(
    (choosedInfo: string) => {
      let element: React.FC<{}> | null = null;
      menuItems.map(el => {
        if (el.name === choosedInfo) {
          element = el.component;
        }
      });

      return element;
      // return menuItems.map(el => {
      //   if (el.name === choosedInfo) {
      //     return el.component;
      //   }
      //   return <p>Error</p>;
      // });
    },
    [choosedMenuItem],
  );
  return (
    <div className={classes.personalPageContainer}>
      <div className={classes.persPageMenu}>
        {menuItems.map(
          item =>
            userInfo &&
            item.role.includes(userInfo.role) && (
              <div
                className={cn(classes.menuItem, {
                  [classes.activeItem]: choosedMenuItem === item.name,
                })}
                onClick={() => onChooseMenuItem(item.name)}
              >
                {item.title}
              </div>
            ),
        )}
      </div>
      {renderChoosedInfo(choosedMenuItem)}
      {userInfo && (
        <div className={classes.previewContainer}>
          <div className={classes.personalItem}>
            <h3>{upFirstLetter("name")}</h3>
            <span>{userInfo.name}</span>
            <button>Edit</button>
          </div>
          <div className={classes.personalItem}>
            <h3>{upFirstLetter("email")}</h3>
            <span>{userInfo.email}</span>
            <button>Edit</button>
          </div>
          <div className={classes.personalItem}>
            <h3>{upFirstLetter("role")}</h3>
            <span>{userInfo.role}</span>
            <button>Edit</button>
          </div>
          <div className={classes.personalItem}>
            <h3>{upFirstLetter("createdAt")}</h3>
            <span>{userInfo.createdAt}</span>
            <button>Edit</button>
          </div>
          <div className={classes.personalItem}>
            <h3>{upFirstLetter("persPromo")}</h3>
            <span>{userInfo.persPromo}</span>
            <button>Edit</button>
          </div>
          <div className={classes.personalItem}>
            <h3>{upFirstLetter("Followers")}</h3>
            <span>{"test now"}</span>
            <button>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PersonalPage;
