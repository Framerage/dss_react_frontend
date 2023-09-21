import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  createOrderRequest,
  deleteOrder,
  getAllOrders,
  getUserOrders,
} from "api/order";

export const fetchToCreateOrderRequest = createAsyncThunk(
  "CreateOrderRequest",
  createOrderRequest,
);
export const fetchAllOrders = createAsyncThunk("FetchAllOrders", getAllOrders);
export const fetchUserOrders = createAsyncThunk(
  "FetchUserOrders",
  getUserOrders,
);
export const removeChoosedOrder = createAsyncThunk(
  "RemoveChoosedOrder",
  deleteOrder,
);
