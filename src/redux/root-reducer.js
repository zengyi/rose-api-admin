import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import accountReducer from "./account/account.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: []
};

const rootReducer = combineReducers({
  user: userReducer,
  accounts: accountReducer
});

export default persistReducer(persistConfig, rootReducer);
