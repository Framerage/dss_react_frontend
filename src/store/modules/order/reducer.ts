import {createReducer} from "@reduxjs/toolkit";
import {fetchToCreateOrderRequest} from "./async-actions";
import {OrderRequestResult} from "typings/orders";
import {resetOrderCreatingResult} from "./actions";
interface OrderRequestsState {
  orderCreating: {
    data: OrderRequestResult | null;
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
    [resetOrderCreatingResult.type]: state => {
      state.orderCreating.data = null;
      state.orderCreating.error = null;
    },
    [fetchToCreateOrderRequest.fulfilled.type]: (state, {payload}) => {
      state.orderCreating.data = payload;
      state.orderCreating.isLoading = false;
    },
  },
);
