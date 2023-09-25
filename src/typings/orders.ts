import {ShopCartCardsForOrder} from "./catalogCards";

export interface OrderCreatingRequest {
  name: string;
  email: string;
  phoneNum: string;
  city: string;
  userCart: ShopCartCardsForOrder[];
  totalPrice: number;
}
export interface OrderRequestResult {
  name: string;
  email: string;
  phoneNum: string;
  city: string;
  userCart: ShopCartCardsForOrder[];
  totalPrice: number;
  success: boolean;
  message: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  orderStatus: string;
  promo: string;
}
export interface Orders {
  orders: OrderRequestResult[];
  success: boolean;
}
export enum OrderStatuses {
  job = "in process",
  complete = "complete",
  canceled = "canceled",
}