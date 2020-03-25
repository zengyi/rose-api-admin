import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import AddBox from "@material-ui/icons/AddBox";

import Form from "./Form";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const Editor = () => {
  const classes = useStyles();

  return (
    <Paper elevation={3} style={{ marginBottom: 30 }}>
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <AddBox></AddBox>
            <Typography className={classes.heading}></Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Form />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </Paper>
  );
};
export default Editor;
