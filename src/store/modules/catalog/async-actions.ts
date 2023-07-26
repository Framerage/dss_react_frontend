import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCatalogCards} from "api/catalog";

export const getCatalogCardsFx = createAsyncThunk(
  "getCatalogCards",
  getCatalogCards,
);
