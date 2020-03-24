import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.sagas";
import { accountSagas } from "./account/account.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(accountSagas)]);
}
