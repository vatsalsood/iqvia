// Absolute Imports
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
// Relative Imports
import CityAdd from "./CityAdd";
import CityList from "./CityList";
import CityDetails from "./CityDetails";

/**
 * This compoment renders the left and the right panels of the app via the CityAdd, CityList and CityDetails components
 * @param none
 */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const CitiesForecast = () => {
  const classes = useStyles();
  const [cityName, setCityName] = useState("");

  const displayCityDetails = (cityName) => {
    setCityName(cityName);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <CityAdd></CityAdd>
          <CityList displayCityDetails={displayCityDetails}></CityList>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <CityDetails cityName={cityName}></CityDetails>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default CitiesForecast;
