import AccountActionTypes from "./account.types";

const INITIAL_STATE = {
  activeAccounts: null,
  error: null
};

const AccountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AccountActionTypes.GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        activeAccounts: action.payload,
        error: null
      };
    case AccountActionTypes.ADD_ACCOUNT_SUCCESS:
      return {
        ...state,
        activeAccounts: [...state.activeAccounts, action.payload],
        error: null
      };
    case AccountActionTypes.GET_ACCOUNTS_FAILURE:
    case AccountActionTypes.ADD_ACCOUNT_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default AccountReducer;
