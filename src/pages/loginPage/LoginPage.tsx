import React, {useState} from "react";
import classes from "./loginPage.module.css";
import {useDispatch, useSelector} from "react-redux";
import {APP_AUTH_ROUTES, APP_ROUTES} from "utils/routes";
import {getAuthTokenFx} from "store/modules/auth/async-actions";
import {AppDispatch} from "store";
import {useForm} from "react-hook-form";
import {selectAuthData} from "store/modules/auth/selectors";
import {appFetch} from "api/api";
import axios from "axios";
import {getUserAuth} from "store/modules/auth/actions";
import {useNavigate} from "react-router-dom";
interface LoginFormData {
  email: string;
  pass: string;
}
const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const authRequest = useSelector(selectAuthData);
  const {handleSubmit, register, formState, setValue} = useForm<LoginFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });

  const testAuth = () => {
    dispatch(getUserAuth(true));
    navigation(APP_AUTH_ROUTES.main);
  };
  const getAuth = async (data: LoginFormData) => {
    const email = data.email;
    const pass = data.pass;
    const response = await axios.post(
      "http://127.0.0.1:3333/auth/login",
      {
        email,
        pass,
      },
      // params: {
      //   lang: "ru",
      // data: { email: data.email, pass: data.pass },

      //   // headers: {
      //   //   "Content-Type": "application/json",
      //   //   Authorization: "",
      //   // },
      // },
    );
    // const resp = await axios(`${APP_URL}`, {
    //   data: { email: data.email, pass: data.pass },
    // });
    console.log(response, "resp");
    return "done";
    // dispatch(getAuthTokenFx({ email: data.email, pass: data.pass }));
  };
  // console.log(selectAuthData, "selectAuthData");
  return (
    <form
      // action={APP_ROUTES.login}
      action=""
      // method="post"
      className={classes.formBlock}
      onSubmit={handleSubmit(testAuth)}
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
