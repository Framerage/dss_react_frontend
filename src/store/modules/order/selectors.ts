import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelectors";

const selectOrder = createSelector(selectRoot, root => root.orderReducer);

export const selectOrderCreating = createSelector(
  selectOrder,
  state => state.orderCreating.data,
);
export const selectOrderCreatingIsLoading = createSelector(
  selectOrder,
  state => state.orderCreating.isLoading,
);
export const selectOrderCreatingError = createSelector(
  selectOrder,
  state => state.orderCreating.error,
);
