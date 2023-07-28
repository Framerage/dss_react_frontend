import {createAsyncThunk} from "@reduxjs/toolkit";
import {createNewCatalogCard, getCatalogCards} from "api/catalog";

export const getCatalogCardsFx = createAsyncThunk(
  "getCatalogCards",
  getCatalogCards,
);
export const createNewCatalogCardFx = createAsyncThunk(
  "createCatalogCard",
  createNewCatalogCard,
);
