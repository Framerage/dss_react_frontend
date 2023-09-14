import {OrderCreatingRequest} from "typings/orders";
import instance from "./api";

export const createOrderRequest = async ({
  order,
  auth,
}: {
  order: OrderCreatingRequest;
  auth: string;
}) => {
  const response = await instance.post(
    "order",
    {...order},
    {headers: {Authorization: auth}},
  );
  if (response.status !== 200) {
    console.error(response, "resp");
    return response.data;
  }
  return response.data;
};
