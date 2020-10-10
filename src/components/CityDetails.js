import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { mdiCloud } from "@mdi/js";
import Icon from "@mdi/react";
import { getCityForecast } from "../processapi";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const CityDetails = (props) => {
  const classes = useStyles();
  const [weatherList, setWeatherList] = useState([]);

  const formatTemp = (list) => {
    list.forEach((element) => {
      element.dt = new Date(element.dt * 1000).getDate();
    });
    return list;
  };

  async function getWeatherData() {
    let weatherData = await getCityForecast(props.cityName);
    console.log(weatherData.list);
    
    setWeatherList(formatTemp(weatherData.list));
  }

  useEffect(() => {
    if (props.cityName !== "") {
      getWeatherData(props.cityName);
    }
  }, [props]);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}>
            <Icon path={mdiCloud} title="Clouds" size={3} />
          </Grid>
          <Grid item xs={8}></Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default CityDetails;
