import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { addAccountStart } from "../../redux/account/account.actions";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "60ch"
    }
  }
}));

const Form = ({ addAccountStart }) => {
  const classes = useStyles();
  const [account, setAccount] = React.useState({});

  const handleSubmit = e => {
    e.preventDefault();
    addAccountStart(account);
    setAccount({});
  };

  const handleChange = e => {
    setAccount({ ...account, [e.target.name]: e.target.value });
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
          id="firstname"
          label="First Name"
          defaultValue={account.firstname}
          name="firstname"
          onChange={handleChange}
        />
        <TextField
          required
          id="lastname"
          label="Last Name"
          defaultValue={account.lastname}
          name="lastname"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          id="dob"
          label="Date of Birth"
          type="date"
          defaultValue={account.dob}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          name="dob"
          onChange={handleChange}
        />
        <TextField
          id="dod"
          label="Date of Death"
          type="date"
          defaultValue={account.dod}
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
          id="biography"
          label="Biography"
          multiline
          rows="4"
          defaultValue={account.biography}
          variant="outlined"
          name="biography"
          onChange={handleChange}
        />
        <TextField
          id="outlined-multiline-static"
          label="Obituary"
          multiline
          rows="4"
          defaultValue={account.obituary}
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
  addAccountStart: data => dispatch(addAccountStart(data))
});

export default connect(null, mapDispatchToProps)(Form);
