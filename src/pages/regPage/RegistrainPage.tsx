import React from "react";
import classes from "./regPage.module.css";
import { APP_ROUTES } from "../../utils/routes";
const RegistrationPage = () => {
  return (
    <form
      action={APP_ROUTES.registration}
      method="post"
      className={classes.formBlock}
    >
      <h2 className={classes.formHead}>Registration</h2>
      <input
        type="text"
        name="name"
        placeholder="Имя"
        className={classes.inputItem}
        required
      />
      <input
        type="text"
        name="email"
        placeholder="Почта"
        className={classes.inputItem}
        required
      />

      <input
        type="password"
        name="pass"
        placeholder="Пароль"
        className={classes.inputItem}
        required
      />
      <button className={classes.submitBtn}>Submit</button>
    </form>
  );
};
export default RegistrationPage;
