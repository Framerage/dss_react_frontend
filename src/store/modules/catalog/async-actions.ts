import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  createNewCatalogCard,
  getCardFullDescrip,
  getCatalogCards,
} from "api/catalog";

export const getCatalogCardsFx = createAsyncThunk(
  "getCatalogCards",
  getCatalogCards,
);

export const getCardFullDescripFx = createAsyncThunk(
  "getCardFullDescrip",
  getCardFullDescrip,
);
export const createNewCatalogCardFx = createAsyncThunk(
  "createCatalogCard",
  createNewCatalogCard,
);
