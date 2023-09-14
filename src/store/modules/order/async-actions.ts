import {createAsyncThunk} from "@reduxjs/toolkit";
import {createOrderRequest} from "api/order";

export const fetchToCreateOrderRequest = createAsyncThunk(
  "CreateOrderRequest",
  createOrderRequest,
);
