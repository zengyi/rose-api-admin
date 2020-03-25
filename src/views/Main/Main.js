import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Accounts from "../../components/Accounts/Accounts";
import Editor from "../../components/Editor/Editor";
import { createStructuredSelector } from "reselect";

import { selectActiveAccounts } from "../../redux/account/account.selectors";
import { getAccountsStart } from "../../redux/account/account.actions";

const Main = props => {
  const { getAccountsStart } = props;
  useEffect(() => {
    getAccountsStart();
  }, [getAccountsStart]);

  return (
    <Layout>
      <Editor />
      <Accounts />
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  activeAccounts: selectActiveAccounts
});

const mapDispatchToProps = dispatch => ({
  getAccountsStart: () => dispatch(getAccountsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
