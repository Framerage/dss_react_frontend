import React from "react";
import classes from "./orderPage.module.css";
import {useSelector} from "react-redux";
import {getUpdatedShopCartCards} from "store/modules/cart/selectors";
import {selectUserData} from "store/modules/auth/selectors";
import {useForm} from "react-hook-form";
interface OrderFormData {
  email: string;
  name: string;
  telNum: string;
  city: string;
}
const OrderPage: React.FC = () => {
  const {handleSubmit, register, formState} = useForm<OrderFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });
  const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  const telNumberPattern =
    /^\+7(\s+)?[0-9]{3}?(\s+)?[0-9]{3}?[0-9]{2}?[0-9]{2}$/;
  const emailPatternError = formState.errors?.email?.type === "pattern";
  const telNumberPatternError = formState.errors?.telNum?.type === "pattern";
  const minLengthPhoneNumberError =
    formState.errors?.telNum?.type === "minLength";
  const cartList = useSelector(getUpdatedShopCartCards);
  const curUser = useSelector(selectUserData);
  const onSendOrder = (data: OrderFormData) => {
    console.log(data, "data form");
  };
  return (
    <form className={classes.orderForm} onSubmit={handleSubmit(onSendOrder)}>
      <div className={classes.formItem}>
        <input
          type="text"
          {...register("name")}
          defaultValue={curUser?.name}
          name="name"
          placeholder="Ваше имя/ник на сайте"
          required
        />
      </div>
      <div className={classes.formItem}>
        <input
          type="text"
          {...register("email", {pattern: emailPattern})}
          defaultValue={curUser?.email}
          name="email"
          placeholder="Ваша почта"
          required
        />
        {emailPatternError && <span>Неверный формат</span>}
      </div>
      <div className={classes.formItem}>
        <input
          type="tel"
          {...register("telNum", {pattern: telNumberPattern, minLength: 12})}
          name="telNum"
          placeholder="+71234567890"
          required
        />
        {(telNumberPatternError || minLengthPhoneNumberError) && (
          <span>
            {minLengthPhoneNumberError
              ? "Минимальное количество символов 12"
              : "Неверный формат"}
          </span>
        )}
      </div>
      <div className={classes.formItem}>
        <input
          type="text"
          {...register("city")}
          name="city"
          placeholder="Ваш город"
        />
        {emailPatternError && <span>Неверный формат</span>}
      </div>
      <button
      // onClick={e => {
      //   e.stopPropagation();
      //   window.alert("Заказ оформлен");
      // }}
      >
        Complete
      </button>
    </form>
  );
};
export default OrderPage;
