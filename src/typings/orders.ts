import {ShopCartCardsForOrder} from "./catalogCards";

export interface OrderCreatingRequest {
  name: string;
  email: string;
  phoneNum: string;
  city: string;
  userCart: ShopCartCardsForOrder[];
  totalPrice: number;
}
