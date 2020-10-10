import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CityAdd from "./CityAdd";
import CityList from "./CityList";
import CityDetails from "./CityDetails";

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

  const displayCityDetails = (cityName) => {
    console.log(cityName);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={4} justify="center">
        <Paper className={classes.paper}>
          <CityAdd></CityAdd>
          <CityList displayCityDetails={displayCityDetails}></CityList>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <CityDetails></CityDetails>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default CitiesForecast;
