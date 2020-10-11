import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CitiesContext from "../context/cities-context";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { checkCity } from "../processapi";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "85%",
  },
}));

const CityAdd = () => {
  const [cityName, setCityName] = useState("");
  const [cityNotFound, setCityNotFound] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [cityCounter, setCityCounter] = useState(0);
  const classes = useStyles();

  const { dispatch } = useContext(CitiesContext);

  // Function to hit the api end point or give an error if not valid city
  async function addCity() {
    let isValidCity = await checkCity(cityName);
    isValidCity.id = cityCounter;
    setCityCounter(cityCounter + 1);
    if (isValidCity.cod == 404) {
      setCityNotFound(true);
    } else {
      dispatch({ type: "ADD_CITY", isValidCity });
    }
    setCityName("");
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
          value={cityName}
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
