import React, { useEffect, useState, useReducer } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import citiesReducer from "../reducers/cities";
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

const CityList = () => {
  const [cityName, setCityName] = useState("");
  const [cityNotFound, setCityNotFound] = useState(false);
  const [cities, dispatch] = useReducer(citiesReducer, []);
  const classes = useStyles();

  async function addCity() {
    let isValidCity = await checkCity(cityName);
    let city = "";
    if (isValidCity === "error") {
      setCityNotFound(true);
    } else {
      city = isValidCity;
      dispatch({ type: "ADD_CITY", city });
    }
    console.log("city", city);
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
    </Paper>
  );
};
export default CityList;
