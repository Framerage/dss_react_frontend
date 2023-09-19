import {OrderCreatingRequest} from "typings/orders";
import instance from "./api";

export const createOrderRequest = async ({
  order,
  auth,
}: {
  order: OrderCreatingRequest;
  auth: string;
}) => {
  return instance
    .post("order", {...order}, {headers: {Authorization: auth}})
    .then(res => res.data)
    .catch(err => {
      return {...err.response.data, status: err.response.status};
    });
};
