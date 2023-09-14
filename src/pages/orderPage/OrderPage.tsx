import React, {useCallback} from "react";
import classes from "./orderPage.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getUpdatedShopCartCards} from "store/modules/cart/selectors";
import {selectUserData} from "store/modules/auth/selectors";
import {useForm} from "react-hook-form";
import {EMAIL_PATTERN, PHONE_NUM_PATTERN} from "constants/appConstants";
import {AppDispatch} from "store";
import {fetchToCreateOrderRequest} from "store/modules/order/async-actions";
import Cookies from "js-cookie";
interface OrderFormData {
  email: string;
  name: string;
  phoneNum: string;
  city: string;
}
const OrderPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {handleSubmit, register, formState} = useForm<OrderFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });

  const emailPatternError = formState.errors?.email?.type === "pattern";
  const telNumberPatternError = formState.errors?.phoneNum?.type === "pattern";
  const minLengthPhoneNumberError =
    formState.errors?.phoneNum?.type === "minLength";
  const cartList = useSelector(getUpdatedShopCartCards);
  const curUser = useSelector(selectUserData);
  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.price * item.itemCount,
    0,
  );
  const accS = Cookies.get("perAcTkn");
  const onSendOrder = useCallback(
    (data: OrderFormData) => {
      const resultOrder = {...data, userCart: cartList, totalPrice: totalPrice};
      console.log({...resultOrder}, "data form");
      accS &&
        dispatch(fetchToCreateOrderRequest({order: resultOrder, auth: accS}));
    },
    [accS],
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
              {...register("phoneNum", {
                pattern: PHONE_NUM_PATTERN,
                minLength: 12,
              })}
              name="phoneNum"
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
