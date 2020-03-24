import React from "react";
import Layout from "../../components/Layout/Layout";

const Editor = ({ match }) => {
  return <Layout>EDITOR {match.params.accountId}</Layout>;
};

export default Editor;
