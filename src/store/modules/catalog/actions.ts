import {createAction} from "@reduxjs/toolkit";

export const carrentCatalogFilter = createAction<string>(
  "CurrentCatalogFilter",
);
export const resetCreatingCardResult = createAction("ResetCreatingCardResult");
export const resetCardRemovingResult = createAction("ResetCardRemovingResult");
