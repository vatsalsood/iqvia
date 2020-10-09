import React, { useEffect, useState, useReducer } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import citiesReducer from "./reducers/cities";
import { makeStyles } from "@material-ui/core/styles";
import CityList from "./components/CityList";

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

const App = () => {
  const classes = useStyles();
  const [cityNotFound, setCityNotFound] = useState(false);
  const [cities, dispatch] = useReducer(citiesReducer, []);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={4} justify="center">
        <CityList></CityList>
      </Grid>
      <Grid item xs={8}>
        <Paper className={classes.paper}> this is an app</Paper>
      </Grid>
    </Grid>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
