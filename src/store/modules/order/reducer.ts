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
    [fetchToCreateOrderRequest.fulfilled.type]: (state, action) => {
      state.orderCreating.data = action.payload;
      state.orderCreating.isLoading = false;
      state.orderCreating.error =
        action.payload?.status === 500
          ? "Please, try again laiter. Server is not responding"
          : null;
    },
    [fetchToCreateOrderRequest.pending.type]: state => {
      state.orderCreating.isLoading = true;
    },
    [fetchToCreateOrderRequest.rejected.type]: (state, action) => {
      state.orderCreating.data = action.payload;
      state.orderCreating.isLoading = false;
      state.orderCreating.error = action.payload?.message;
    },
  },
);
