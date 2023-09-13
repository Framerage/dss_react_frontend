import React from "react";
import classes from "./orderPage.module.css";
import {useSelector} from "react-redux";
import {getUpdatedShopCartCards} from "store/modules/cart/selectors";
import {selectUserData} from "store/modules/auth/selectors";
import {useForm} from "react-hook-form";
import {EMAIL_PATTERN, PHONE_NUM_PATTERN} from "constants/appConstants";
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

  const emailPatternError = formState.errors?.email?.type === "pattern";
  const telNumberPatternError = formState.errors?.telNum?.type === "pattern";
  const minLengthPhoneNumberError =
    formState.errors?.telNum?.type === "minLength";
  const cartList = useSelector(getUpdatedShopCartCards);
  const curUser = useSelector(selectUserData);

  const onSendOrder = (data: OrderFormData) => {
    console.log({...data, order: cartList}, "data form");
  };

  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.price * item.itemCount,
    0,
  );

  return (
    <form className={classes.orderForm} onSubmit={handleSubmit(onSendOrder)}>
      <div className={classes.itemsContainer}>
        <div className={classes.formItems}>
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
              {...register("email", {pattern: EMAIL_PATTERN})}
              defaultValue={curUser?.email}
              name="email"
              placeholder="Ваша почта"
              required
            />
            {emailPatternError && <span>Неверный формат</span>}
          </div>
        </div>

        <div className={classes.formItems}>
          <div className={classes.formItem}>
            <input
              type="tel"
              {...register("telNum", {
                pattern: PHONE_NUM_PATTERN,
                minLength: 12,
              })}
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
          </div>
        </div>
      </div>

      <div className={classes.productList}>
        {cartList.map(item => (
          <div key={item._id} className={classes.listItem}>
            <span className={classes.textName}>{item.title}</span>
            <span>{item.itemCount}&nbsp;шт.</span>
            <span>{item.price * item.itemCount}&nbsp;rub</span>
          </div>
        ))}
      </div>

      <div className={classes.completeItems}>
        <div className={classes.completePrice}>
          Total:&nbsp;{totalPrice}&nbsp;rub
        </div>
        <button className={classes.completeBtn}>Complete</button>
      </div>
    </form>
  );
};
export default OrderPage;
