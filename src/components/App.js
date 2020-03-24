import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import SignIn from "../views/SignIn/SignIn";
import Main from "../views/Main/Main";

import { selectCurrentUser } from "../redux/user/user.selectors";
import { checkUserSession } from "../redux/user/user.actions";

function App(props) {
  const { checkUserSession } = props;
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (props.currentUser ? <Main /> : <SignIn />)}
      />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
