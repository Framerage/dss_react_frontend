import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {
  selectRegistrData,
  selectRegistrError,
  selectRegistrIsLoading,
} from "store/modules/auth/selectors";
import {UserRegistrationFx} from "store/modules/auth/async-actions";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {createBrowserHistory} from "history";
import {APP_GENERAL_ROUTES} from "utils/routes";

import classes from "./regPage.module.css";
interface RegFormData {
  email: string;
  pass: string;
  name: string;
  regPromo: string;
}
const RegistrationPage = () => {
  const navigate = useNavigate();
  const history = createBrowserHistory();
  const dispatch = useDispatch<AppDispatch>();
  const regResult = useSelector(selectRegistrData);
  const regIsLoading = useSelector(selectRegistrIsLoading);
  const regError = useSelector(selectRegistrError);

  const {handleSubmit, register} = useForm<RegFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });

  const [regPromoCode, setRegPromoCode] = useState("");
  const onRegistrationUser = (data: RegFormData) => {
    dispatch(UserRegistrationFx(data));
  };
  useEffect(() => {
    const promo =
      history.location.search &&
      history.location.search.split("=")[1].split("+");
    if (!promo[0]) {
      return;
    }
    setRegPromoCode(promo[0]);
  }, [history]);

  useEffect(() => {
    if (!regResult) {
      return;
    }
    if (regResult && !regResult.success) {
      return;
    }
    navigate(APP_GENERAL_ROUTES.login.link);
  }, [regResult]);
  return (
    <div className={classes.regContainer}>
      <form
        className={classes.formBlock}
        onSubmit={handleSubmit(onRegistrationUser)}
      >
        <h2 className={classes.formHead}>Registration</h2>
        <input
          type="text"
          {...register("name")}
          name="name"
          placeholder="Имя"
          className={classes.inputItem}
          required
        />
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
          name="pass"
          placeholder="Пароль"
          className={classes.inputItem}
          required
        />
        <input
          type="text"
          {...register("regPromo")}
          name="regPromo"
          placeholder="Промокод"
          className={classes.inputPromo}
          onChange={e => setRegPromoCode(e.target.value)}
          value={regPromoCode}
        />
        <button className={classes.submitBtn}>
          {regIsLoading ? "Loading..." : "Registration"}
        </button>
      </form>
      {(regError || (regResult && !regResult.success)) && (
        <div className={classes.errorText}>
          Регистрация не удалась
          <br />
          {regResult && !regResult.success ? regResult.message : regError}
        </div>
      )}
    </div>
  );
};
export default RegistrationPage;
