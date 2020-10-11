import React, { useEffect, useState, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CitiesContext from "../context/cities-context";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { checkCity } from "../processapi";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "70%",
  },
}));

const CityAdd = () => {
  const [cityName, setCityName] = useState("");
  const [cityNotFound, setCityNotFound] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [cityCounter, setCityCounter] = useState(0);
  const classes = useStyles();

  const { dispatch } = useContext(CitiesContext);

  async function addCity() {
    let isValidCity = await checkCity(cityName);
    isValidCity.id = cityCounter;
    // let updatedCounter = cityCounter++;
    setCityCounter(cityCounter + 1);
    if (isValidCity.cod == 404) {
      setCityNotFound(true);
    } else {
      dispatch({ type: "ADD_CITY", isValidCity });
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
    <div>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Enter City"
          className={classes.textField}
          onChange={(e) => {
            e.target.value === "" ? setIsEmpty(true) : setIsEmpty(false);
            setCityName(e.target.value);
          }}
        />
        <IconButton
          edge="end"
          aria-label="refresh"
          disabled={isEmpty}
          size="medium"
          onClick={() => {
            addCity();
          }}
          color="primary"
        >
          <AddCircleIcon></AddCircleIcon>
        </IconButton>
      </form>
      <Snackbar
        open={cityNotFound}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Please enter a valid city!
        </Alert>
      </Snackbar>
    </div>
  );
};
export default CityAdd;
