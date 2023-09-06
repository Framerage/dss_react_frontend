import React, {useEffect} from "react";
import {createBrowserHistory} from "history";
import {AppDispatch} from "store";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserInfo, getAuthTokenFx} from "store/modules/auth/async-actions";
import {
  selectAuthData,
  selectAuthError,
  selectAuthIsLoading,
} from "store/modules/auth/selectors";
import {getUserAuth} from "store/modules/auth/actions";
import {useForm} from "react-hook-form";
import {APP_AUTH_ROUTES} from "utils/routes";

import classes from "./loginPage.module.css";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
interface LoginFormData {
  email: string;
  pass: string;
}
const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = createBrowserHistory();
  const navigate = useNavigate();
  const authRequest = useSelector(selectAuthData);
  const authRequestIsLoading = useSelector(selectAuthIsLoading);
  const authRequestError = useSelector(selectAuthError);

  const saveCookieTkn = (string: string) => {
    Cookies.set("perAcTkn", string, {expires: 1 / 24 / 12});
  };

  const {handleSubmit, register} = useForm<LoginFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });
  const getAuth = async (data: LoginFormData) => {
    dispatch(getAuthTokenFx({email: data.email, pass: data.pass})).then(
      ({payload}) => {
        console.log(payload, "resp");
        if ("perAcTkn" in payload && payload.perAcTkn) {
          saveCookieTkn(String(payload.perAcTkn));
          dispatch(fetchUserInfo(payload.perAcTkn));
          console.log("done");
        }
      },
    );
  };
  //TODO: check заменить токен в ответе с бека на пустоту или вообще убрать

  // useEffect(() => {
  //   if (!accTknm) {
  //     return;
  //   }
  //   if (accTknm) {
  //     if (history.location.pathname === APP_AUTH_ROUTES.login.link) {
  //       setTimeout(() => {
  //         navigate(APP_AUTH_ROUTES.main.link || "/");
  //       }, 1000);
  //     }
  //     dispatch(getUserAuth(true));
  //     return;
  //   }
  //   dispatch(getUserAuth(false));
  // }, [accTknm]);

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
      <button className={classes.submitBtn}>
        {authRequestIsLoading ? "Loading ..." : "Login"}
      </button>
      {authRequest && authRequest.success && (
        <span
          className={classes.errorReqText}
          style={{color: "yellowgreen", padding: "5px 0"}}
        >
          Success!!!
        </span>
      )}
      {(authRequestError || (authRequest && !authRequest.success)) && (
        <span className={classes.errorReqText}>
          {authRequest && !authRequest.success
            ? authRequest.message
            : authRequestError}
        </span>
      )}
    </form>
  );
};
export default LoginPage;
