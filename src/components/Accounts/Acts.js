import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectActiveAccounts } from "../../redux/account/account.selectors";
import { addAccountStart } from "../../redux/account/account.actions";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function Accounts({ activeAccounts, addAccountStart }) {
  const [state, setState] = React.useState({
    columns: [
      {
        field: "url",
        Title: "Avatar",
        render: () => (
          <Button component="span">
            <PhotoCameraIcon style={{ width: 50 }} />
          </Button>
        ),
        editable: "never"
      },
      { title: "Name", field: "firstname" },
      { title: "Surname", field: "lastname" },
      {
        title: "DOB",
        field: "dob",
        editComponent: props => (
          <TextField
            id="dob"
            type="date"
            defaultValue={props.value}
            onChange={e => props.onChange(e.target.value)}
          />
        )
      },
      {
        title: "DOD",
        field: "dod",
        editComponent: props => (
          <TextField
            id="dod"
            type="date"
            defaultValue={props.value}
            onChange={e => props.onChange(e.target.value)}
          />
        )
      }
    ],
    data: []
  });

  return (
    <MaterialTable
      title="Active Accounts"
      columns={state.columns}
      data={activeAccounts || []}
      icons={tableIcons}
      editable={{
        // onRowAdd: newData =>
        //   new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve();
        //       setState(prevState => {
        //         const data = [...prevState.data];
        //         data.push(newData);
        //         return { ...prevState, data };
        //       });
        //     }, 600);
        //   }),
        onRowAdd: newData => {
          new Promise(resolve => {
            addAccountStart(newData);
            setTimeout(() => {
              resolve();
            }, 600);
          });
        },
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  activeAccounts: selectActiveAccounts
});

const mapDispatchToProps = dispatch => ({
  addAccountStart: data => dispatch(addAccountStart(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
