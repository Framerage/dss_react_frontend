import {createReducer} from "@reduxjs/toolkit";
import {fetchToCreateOrderRequest} from "./async-actions";
import {OrderCreatingRequest} from "typings/orders";
interface OrderRequestsState {
  orderCreating: {
    data: OrderCreatingRequest | null;
    isLoading: boolean;
    error: string | null;
  };
}
const initialOrderState = {
  orderCreating: {
    data: null,
    isLoading: false,
    error: null,
  },
};
export const orderReducer = createReducer<OrderRequestsState>(
  initialOrderState,
  {
    [fetchToCreateOrderRequest.fulfilled.type]: (state, {payload}) => {
      state.orderCreating.data = payload;
      state.orderCreating.isLoading = false;
    },
  },
);
