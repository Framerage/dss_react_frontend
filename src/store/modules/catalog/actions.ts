import {createAction} from "@reduxjs/toolkit";

export const carrentCatalogFilter = createAction<string>(
  "CurrentCatalogFilter",
);
