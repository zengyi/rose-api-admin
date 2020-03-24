import { createSelector } from "reselect";

const selectAccounts = state => state.accounts;

export const selectActiveAccounts = createSelector(
  [selectAccounts],
  accounts => accounts.activeAccounts
);
