import React from "react";
import classes from "./personalPage.module.css";
import {useSelector} from "react-redux";
import {selectAuthData} from "store/modules/auth/selectors";
import upFirstLetter from "helpers/upFirstLetter";
const PersonalPage: React.FC = () => {
  const authRequest = useSelector(selectAuthData);

  console.log(authRequest && Object.keys(authRequest), "onfp");
  return (
    <div className={classes.personalPageContainer}>
      {authRequest && (
        <div className={classes.previewContainer}>
          <div className={classes.personalItem}>
            <h3>{upFirstLetter("name")}</h3>
            <span>{authRequest.name}</span>
            <button>Edit</button>
          </div>
          <div className={classes.personalItem}>
            <h3>{upFirstLetter("email")}</h3>
            <span>{authRequest.email}</span>
            <button>Edit</button>
          </div>
          <div className={classes.personalItem}>
            <h3>{upFirstLetter("role")}</h3>
            <span>{authRequest.role}</span>
            <button>Edit</button>
          </div>
          <div className={classes.personalItem}>
            <h3>{upFirstLetter("createdAt")}</h3>
            <span>{authRequest.createdAt}</span>
            <button>Edit</button>
          </div>
          <div className={classes.personalItem}>
            <h3>{upFirstLetter("persPromo")}</h3>
            <span>{authRequest.persPromo}</span>
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
