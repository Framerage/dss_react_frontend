import React, {useEffect} from "react";
import {createBrowserHistory} from "history";
import {useNavigate} from "react-router-dom";
import {AppDispatch} from "store";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserInfo, getAuthTokenFx} from "store/modules/auth/async-actions";
import {
  selectAuthError,
  selectAuthIsLoading,
  selectUserData,
  selectUserError,
  selectUserIsLoading,
} from "store/modules/auth/selectors";
import {getUserAuth} from "store/modules/auth/actions";
import {useForm} from "react-hook-form";
import {APP_AUTH_ROUTES} from "utils/routes";

import classes from "./loginPage.module.css";
import Cookies from "js-cookie";
interface LoginFormData {
  email: string;
  pass: string;
}
const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = createBrowserHistory();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserData);
  const userInfoIsLoading = useSelector(selectUserIsLoading);
  const userInfoError = useSelector(selectUserError);

  const authIsLoading = useSelector(selectAuthIsLoading);
  const authError = useSelector(selectAuthError);

  const saveCookieTkn = (string: string) => {
    Cookies.set("perAcTkn", string, {expires: 1 / 24 / 2});
  };

  const {handleSubmit, register} = useForm<LoginFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });
  const getAuth = (data: LoginFormData) => {
    dispatch(getAuthTokenFx({email: data.email, pass: data.pass})).then(res => {
      const result = res.payload;
      if (
        result &&
        "perAcTkn" in result &&
        typeof result["perAcTkn"] !== "undefined"
      ) {
        saveCookieTkn(String(result.perAcTkn));
        dispatch(fetchUserInfo(result.perAcTkn));
      }
    });
  };

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    if (!userInfo.success) {
      dispatch(getUserAuth(false));
    }
    if (history.location.pathname === APP_AUTH_ROUTES.login.link) {
      setTimeout(() => {
        navigate(APP_AUTH_ROUTES.main.link || "/");
      }, 1000);
    }
    dispatch(getUserAuth(true));
  }, [userInfo]);

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
        {userInfoIsLoading || authIsLoading ? "Loading ..." : "Login"}
      </button>
      {userInfo && userInfo.success && (
        <span
          className={classes.errorReqText}
          style={{color: "yellowgreen", padding: "5px 0"}}
        >
          Success!!!
        </span>
      )}
      {(authError || userInfoError || (userInfo && !userInfo.success)) && (
        <span className={classes.errorReqText}>
          {userInfo && !userInfo.success
            ? userInfo.message
            : authError || userInfoError}
        </span>
      )}
    </form>
  );
};
export default LoginPage;
