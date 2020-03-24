import { takeLatest, put, all, call } from "redux-saga/effects";
import AccountActionTypes from "./account.types";

import axios from "axios";

import {
  getAccountsSuccess,
  getAccountsFailure,
  addAccountSuccess,
  addAccountFailure
} from "./account.actions";

export function* getAccounts() {
  try {
    const accountData = yield axios.get(
      "http://us-central1-rose-api.cloudfunctions.net/app/account"
    );
    yield put(getAccountsSuccess(accountData.data));
  } catch (error) {
    yield put(getAccountsFailure(error));
  }
}

export function* addAccount({ payload: { firstname, lastname, dob, dod } }) {
  try {
    //fixme
    let postData = {
      firstname,
      lastname,
      dob,
      dod,
      bizId: "HPxJZRUE37RO5NSRVMt3GiAB9i02"
    };
    const res = yield axios.post(
      "http://us-central1-rose-api.cloudfunctions.net/app/account",
      postData
    );
    yield put(addAccountSuccess(res.data.data));
  } catch (error) {
    yield put(addAccountFailure(error));
  }
}

export function* onGetAccountsStart() {
  yield takeLatest(AccountActionTypes.GET_ACCOUNTS_START, getAccounts);
}

export function* onAddAccountStart() {
  yield takeLatest(AccountActionTypes.ADD_ACCOUNT_START, addAccount);
}

export function* accountSagas() {
  yield all([call(onGetAccountsStart), call(onAddAccountStart)]);
}
