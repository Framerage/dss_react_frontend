import React, {useEffect} from "react";
import classes from "./loginPage.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getAuthTokenFx} from "store/modules/auth/async-actions";
import {AppDispatch} from "store";
import {useForm} from "react-hook-form";
import {selectAuthData} from "store/modules/auth/selectors";
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

  const getAuth = async (data: LoginFormData) => {
    dispatch(getAuthTokenFx({email: data.email, pass: data.pass}));
  };

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
    <form className={classes.formBlock} onSubmit={handleSubmit(getAuth)}>
      <h2 className={classes.formHead}>Login</h2>
      <input
        type="text"
        {...register("email")}
        name="email"
        placeholder="Почта"
        className={classes.inputItem}
        required
      />
      <input
        type="password"
        {...register("pass")}
        placeholder="Пароль"
        className={classes.inputItem}
        required
      />
      <button className={classes.submitBtn}>Login</button>
    </form>
  );
};
export default LoginPage;
