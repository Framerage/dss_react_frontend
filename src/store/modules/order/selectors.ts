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

export const selectAllOrders = createSelector(
  selectOrder,
  state => state.allOrders.data,
);
export const selectAllOrdersIsLoading = createSelector(
  selectOrder,
  state => state.allOrders.isLoading,
);
export const selectAllOrdersError = createSelector(
  selectOrder,
  state => state.allOrders.error,
);

export const selectRemovingOrderResult = createSelector(
  selectOrder,
  state => state.removingOrder.data,
);
export const selectRemovingOrderResultIsLoading = createSelector(
  selectOrder,
  state => state.removingOrder.isLoading,
);
export const selectRemovingOrderResultError = createSelector(
  selectOrder,
  state => state.removingOrder.error,
);
