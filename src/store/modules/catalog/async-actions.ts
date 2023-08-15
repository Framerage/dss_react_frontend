import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  createNewCatalogCard,
  editCatalogCard,
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
export const editCatalogCardFx = createAsyncThunk(
  "editCatalogCard",
  editCatalogCard,
);
