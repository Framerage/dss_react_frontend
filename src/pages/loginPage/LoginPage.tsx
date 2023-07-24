import React, {useEffect, useState} from "react";
import classes from "./loginPage.module.css";
import {useDispatch, useSelector} from "react-redux";
import {APP_AUTH_ROUTES} from "utils/routes";
import {getAuthTokenFx} from "store/modules/auth/async-actions";
import {AppDispatch} from "store";
import {useForm} from "react-hook-form";
import {selectAuthData} from "store/modules/auth/selectors";
import axios from "axios";
import {getUserAuth} from "store/modules/auth/actions";
interface LoginFormData {
  email: string;
  pass: string;
}
const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authRequest = useSelector(selectAuthData);
  const {handleSubmit, register, formState, setValue} = useForm<LoginFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });

  const testAuth = () => {
    dispatch(getUserAuth(true));
  };
  const getAuth = async (data: LoginFormData) => {
    dispatch(getAuthTokenFx({email: data.email, pass: data.pass}));
  };

  console.log(authRequest, "authRequest");
  useEffect(() => {
    if (!authRequest) {
      return;
    }
    if (authRequest.token) {
      dispatch(getUserAuth(true));
      return;
    }
    dispatch(getUserAuth(false));
  }, [authRequest]);

  return (
    <form
      // action={APP_ROUTES.login}
      action=""
      method="post"
      className={classes.formBlock}
      onSubmit={handleSubmit(getAuth)}
    >
      <h2 className={classes.formHead}>Login</h2>
      <input
        type="text"
        {...register("email")}
        // registerKey="email"
        name="email"
        placeholder="Почта"
        className={classes.inputItem}
        required
      />
      <input
        type="password"
        {...register("pass")}
        // registerKey="pass"
        placeholder="Пароль"
        className={classes.inputItem}
        required
      />
      <button className={classes.submitBtn}>Login</button>
    </form>
  );
};
export default LoginPage;
