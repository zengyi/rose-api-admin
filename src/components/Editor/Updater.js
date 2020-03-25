import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { updateAccountStart } from "../../redux/account/account.actions";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "60ch"
    }
  }
}));

const Form = ({ account, updateAccountStart }) => {
  const classes = useStyles();
  const [newAccount, setNewAccount] = React.useState(account);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("newAccount", newAccount);
    updateAccountStart(newAccount);
    setNewAccount({});
  };

  const handleChange = e => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          required
          id={`firstname-${newAccount.id}`}
          label="First Name"
          defaultValue={newAccount.firstname}
          name="firstname"
          onChange={handleChange}
        />
        <TextField
          required
          id={`lastname-${newAccount.id}`}
          label="Last Name"
          defaultValue={newAccount.lastname}
          name="lastname"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          id={`dob-${newAccount.id}`}
          label="Date of Birth"
          type="date"
          defaultValue={newAccount.dob}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          name="dob"
          onChange={handleChange}
        />
        <TextField
          id={`dod-${newAccount.id}`}
          label="Date of Death"
          type="date"
          defaultValue={newAccount.dod}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          name="dod"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          id={`biography-${newAccount.id}`}
          label="Biography"
          multiline
          rows="4"
          defaultValue={newAccount.biography}
          variant="outlined"
          name="biography"
          onChange={handleChange}
        />
        <TextField
          id={`obituary-${newAccount.id}`}
          label="Obituary"
          multiline
          rows="4"
          defaultValue={newAccount.obituary}
          variant="outlined"
          name="obituary"
          onChange={handleChange}
        />
      </div>
      <div>
        <Button variant="contained" type="submit" color="primary">
          Save Changes
        </Button>
      </div>
    </form>
  );
};
const mapDispatchToProps = dispatch => ({
  updateAccountStart: data => dispatch(updateAccountStart(data))
});

export default connect(null, mapDispatchToProps)(Form);
