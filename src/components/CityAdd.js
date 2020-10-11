// Absolute Imports
import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
// Relative Imports
import CitiesContext from "../context/cities-context";
import { checkCity } from "../processapi";

/**
 * This component adds the cities to the list of cities.
 * checkDuplicates function checks for duplicates and makes sure no duplicates are added.
 * This component also renders a snackbar for error if an invalid city name is entered in the text field.
 * Also added the functionality to not allow users to add special characters for city names
 * @param none
 */

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

  const { cities, dispatch } = useContext(CitiesContext);

  // Do not add city if duplicate
  const checkDuplicates = (cityName) => {
    let isDuplicate = false;
    cities.forEach((city) => {
      if (city.name.toLowerCase() === cityName.toLowerCase()) {
        isDuplicate = true;
      }
    });
    isDuplicate ? setCityNotFound(true) : addCity();
    setCityName("");
  };

  // Function to hit the api end point or give an error if not valid city
  async function addCity() {
    let isValidCity = await checkCity(cityName);
    isValidCity.id = cityCounter;
    setCityCounter(cityCounter + 1);

    if (isValidCity.cod === 404) {
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
          value={cityName}
          onChange={(e) => {
            e.target.value === "" ? setIsEmpty(true) : setIsEmpty(false);
            // Make sure no special characters are allowed
            setCityName(e.target.value.replace(/[^a-zA-Z ]/g, ""));
          }}
        />
        <IconButton
          edge="end"
          aria-label="refresh"
          disabled={isEmpty}
          size="medium"
          onClick={() => {
            checkDuplicates(cityName);
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
