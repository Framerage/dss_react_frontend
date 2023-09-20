import React, {useState} from "react";
import classes from "./personalPage.module.css";
import {useSelector} from "react-redux";
import {selectUserData} from "store/modules/auth/selectors";
import cn from "classnames";
import AllOrders from "components/personalPageComponents/allOrders/AllOrders";
import PersonalDatas from "components/personalPageComponents/personalDatas/PersonalDatas";

const menuItems = [
  {
    name: "persData",
    title: "Мои данные",
    component: <PersonalDatas />,
    role: ["user", "admin"],
  },
  {
    name: "persOrders",
    title: "Мои заказы",
    component: <AllOrders markRole="user" />,
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
    component: <AllOrders markRole="admin" />,
    role: "admin",
  },
  {name: "statistic", title: "Статистика", component: null, role: "admin"},
];
const PersonalPage: React.FC = () => {
  const userInfo = useSelector(selectUserData);

  // console.log(userInfo && Object.keys(userInfo), "onfp");

  const [choosedMenuItem, setChoosedMenuItem] = useState(menuItems[0].name);
  const onChooseMenuItem = (itemName: string) => setChoosedMenuItem(itemName);
  const renderChoosedInfo = (choosedInfo: string) => {
    return menuItems.filter(el => el.name === choosedInfo)[0].component;
  };
  return (
    <div className={classes.personalPageContainer}>
      <div className={classes.persPageMenu}>
        {menuItems.map(
          item =>
            userInfo &&
            item.role.includes(userInfo.role) && (
              <div
                key={item.name}
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

      {userInfo && userInfo.success && (
        <div className={classes.previewContainer}>
          {renderChoosedInfo(choosedMenuItem)}
        </div>
      )}
    </div>
  );
};
export default PersonalPage;
