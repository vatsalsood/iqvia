import React, { useEffect, useState, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import CitiesContext from "../context/cities-context";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { checkCity } from "../processapi";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    textAlign: "center",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const CityAdd = () => {
  const [cityName, setCityName] = useState("");
  const [cityNotFound, setCityNotFound] = useState(false);
  const { dispatch } = useContext(CitiesContext);

  const classes = useStyles();

  async function addCity() {
    let isValidCity = await checkCity(cityName);
    let city = "";
    if (isValidCity.cod == 404) {
      setCityNotFound(true);
    } else {
      city = isValidCity.name;
      dispatch({ type: "ADD_CITY", city });
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCityNotFound(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Paper className={classes.paper}>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Standard"
          onChange={(e) => {
            setCityName(e.target.value);
          }}
        />
        <AddIcon onClick={addCity}></AddIcon>
      </form>
      <Snackbar
        open={cityNotFound}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          This is a error message!
        </Alert>
      </Snackbar>
    </Paper>
  );
};
export default CityAdd;
