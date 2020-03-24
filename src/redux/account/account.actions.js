import AccountActionTypes from "./account.types";

export const getAccountsStart = () => ({
  type: AccountActionTypes.GET_ACCOUNTS_START
});

export const getAccountsSuccess = accounts => ({
  type: AccountActionTypes.GET_ACCOUNTS_SUCCESS,
  payload: accounts
});

export const getAccountsFailure = error => ({
  type: AccountActionTypes.GET_ACCOUNTS_FAILURE,
  payload: error
});

export const addAccountStart = account => ({
  type: AccountActionTypes.ADD_ACCOUNT_START,
  payload: account
});

export const addAccountSuccess = account => ({
  type: AccountActionTypes.ADD_ACCOUNT_SUCCESS,
  payload: account
});

export const addAccountFailure = error => ({
  type: AccountActionTypes.ADD_ACCOUNT_FAILURE,
  payload: error
});
