import React from "react";
import classes from "./personalPage.module.css";
import {useSelector} from "react-redux";
import {selectUserData} from "store/modules/auth/selectors";
import upFirstLetter from "helpers/upFirstLetter";
const PersonalPage: React.FC = () => {
  const userInfo = useSelector(selectUserData);

  console.log(userInfo && Object.keys(userInfo), "onfp");
  return (
    <div className={classes.personalPageContainer}>
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
