import {createReducer} from "@reduxjs/toolkit";
import {
  fetchAllOrders,
  fetchToCreateOrderRequest,
  fetchUserOrders,
} from "./async-actions";
import {AllOrders, OrderRequestResult} from "typings/orders";
import {resetOrderCreatingResult} from "./actions";
interface OrderRequestsState {
  orderCreating: {
    data: OrderRequestResult | null;
    isLoading: boolean;
    error: string | null;
  };
  allOrders: {
    data: AllOrders | null;
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
  allOrders: {
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
      state.orderCreating.error = null;
    },
    [fetchToCreateOrderRequest.rejected.type]: (state, action) => {
      state.orderCreating.data = action.payload;
      state.orderCreating.isLoading = false;
      state.orderCreating.error = action.payload?.message;
    },
    [fetchAllOrders.fulfilled.type]: (state, action) => {
      state.allOrders.data = action.payload;
      state.allOrders.isLoading = false;
      state.allOrders.error =
        action.payload?.status === 500
          ? "Please, try again laiter. Server is not responding"
          : null;
    },
    [fetchAllOrders.pending.type]: state => {
      state.allOrders.isLoading = true;
      state.allOrders.error = null;
    },
    [fetchAllOrders.rejected.type]: (state, action) => {
      state.allOrders.data = action.payload;
      state.allOrders.isLoading = false;
      state.allOrders.error = action.payload?.message;
    },

    [fetchUserOrders.fulfilled.type]: (state, action) => {
      state.allOrders.data = action.payload;
      state.allOrders.isLoading = false;
      state.allOrders.error =
        action.payload?.status === 500
          ? "Please, try again laiter. Server is not responding"
          : null;
    },
    [fetchUserOrders.pending.type]: state => {
      state.allOrders.isLoading = true;
      state.allOrders.error = null;
    },
    [fetchUserOrders.rejected.type]: (state, action) => {
      state.allOrders.data = action.payload;
      state.allOrders.isLoading = false;
      state.allOrders.error = action.payload?.message;
    },
  },
);
